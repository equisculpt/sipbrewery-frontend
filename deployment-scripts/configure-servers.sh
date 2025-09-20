#!/bin/bash
# SIP Brewery - Server Configuration Script

set -e

# Load server IPs
if [ ! -f server-ips.env ]; then
    echo "❌ server-ips.env not found. Run setup-hetzner.sh first."
    exit 1
fi

source server-ips.env

echo "🔧 Configuring servers for SIP Brewery..."

# Function to run commands on remote server
run_remote() {
    local server_ip=$1
    local command=$2
    ssh -i $SSH_KEY_PATH -o StrictHostKeyChecking=no root@$server_ip "$command"
}

# Function to copy file to remote server
copy_to_remote() {
    local server_ip=$1
    local local_file=$2
    local remote_path=$3
    scp -i $SSH_KEY_PATH -o StrictHostKeyChecking=no "$local_file" root@$server_ip:"$remote_path"
}

echo "📦 Configuring Database Server ($DATABASE_IP)..."

# Database server configuration
run_remote $DATABASE_IP "
    apt update && apt upgrade -y
    
    # Mount additional storage
    if [ -b /dev/sdb ]; then
        mkfs.ext4 /dev/sdb
        mkdir -p /data
        mount /dev/sdb /data
        echo '/dev/sdb /data ext4 defaults 0 0' >> /etc/fstab
    fi
    
    # Install MongoDB
    wget -qO - https://www.mongodb.org/static/pgp/server-6.0.asc | apt-key add -
    echo 'deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu jammy/mongodb-org/6.0 multiverse' | tee /etc/apt/sources.list.d/mongodb-org-6.0.list
    apt update
    apt install -y mongodb-org redis-server
    
    # Create MongoDB directories
    mkdir -p /data/mongodb /data/backups
    chown mongodb:mongodb /data/mongodb
    
    # Configure Redis
    sed -i 's/bind 127.0.0.1/bind 0.0.0.0/' /etc/redis/redis.conf
    systemctl restart redis-server
    systemctl enable redis-server
"

# Create MongoDB configuration
cat > mongod.conf << 'EOF'
storage:
  dbPath: /data/mongodb
  journal:
    enabled: true
systemLog:
  destination: file
  logAppend: true
  path: /var/log/mongodb/mongod.log
net:
  port: 27017
  bindIp: 0.0.0.0
processManagement:
  fork: true
  pidFilePath: /var/run/mongodb/mongod.pid
security:
  authorization: enabled
EOF

copy_to_remote $DATABASE_IP mongod.conf /etc/mongod.conf
rm mongod.conf

run_remote $DATABASE_IP "
    systemctl enable mongod
    systemctl start mongod
    sleep 5
    
    # Create database and user
    mongosh --eval \"
        use sipbrewery
        db.createUser({
            user: 'sipbrewery_user',
            pwd: 'SecurePassword123!',
            roles: ['readWrite', 'dbAdmin']
        })
    \"
"

echo "✅ Database server configured"

echo "🖥️  Configuring Backend Server ($BACKEND_IP)..."

# Backend server configuration
run_remote $BACKEND_IP "
    apt update && apt upgrade -y
    
    # Install Node.js 18
    curl -fsSL https://deb.nodesource.com/setup_18.x | bash -
    apt install -y nodejs nginx git
    
    # Install PM2
    npm install -g pm2
    
    # Create application directory
    mkdir -p /opt/sipbrewery-backend /var/log/sipbrewery
    
    # Create systemd service for PM2
    pm2 startup systemd -u root --hp /root
"

# Create backend environment file
cat > backend.env << EOF
NODE_ENV=production
PORT=3001
HOST=0.0.0.0

# Database Configuration
MONGODB_URI=mongodb://sipbrewery_user:SecurePassword123!@${DATABASE_IP}:27017/sipbrewery
REDIS_URL=redis://${DATABASE_IP}:6379

# JWT Configuration
JWT_SECRET=$(openssl rand -base64 32)
JWT_EXPIRES_IN=24h
REFRESH_TOKEN_EXPIRES_IN=7d

# CORS Configuration
CORS_ORIGIN=https://your-domain.com
ALLOWED_ORIGINS=https://your-domain.com,https://www.your-domain.com

# Vast.ai GPU Configuration
VAST_API_KEY=your-vast-api-key-here
GPU_FALLBACK_ENABLED=true
GPU_TIMEOUT=30000

# Security
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
BCRYPT_ROUNDS=12

# Logging
LOG_LEVEL=info
LOG_FILE=/var/log/sipbrewery/backend.log
EOF

copy_to_remote $BACKEND_IP backend.env /opt/sipbrewery-backend/.env
rm backend.env

# Create PM2 ecosystem file
cat > ecosystem.config.js << 'EOF'
module.exports = {
  apps: [{
    name: 'sipbrewery-backend',
    script: 'app.js',
    cwd: '/opt/sipbrewery-backend',
    instances: 'max',
    exec_mode: 'cluster',
    env: {
      NODE_ENV: 'production',
      PORT: 3001
    },
    error_file: '/var/log/sipbrewery/backend-error.log',
    out_file: '/var/log/sipbrewery/backend-out.log',
    log_file: '/var/log/sipbrewery/backend.log',
    time: true
  }]
}
EOF

copy_to_remote $BACKEND_IP ecosystem.config.js /opt/sipbrewery-backend/ecosystem.config.js
rm ecosystem.config.js

echo "✅ Backend server configured"

echo "🌐 Configuring Frontend Server ($FRONTEND_IP)..."

# Frontend server configuration
run_remote $FRONTEND_IP "
    apt update && apt upgrade -y
    
    # Install Node.js 18
    curl -fsSL https://deb.nodesource.com/setup_18.x | bash -
    apt install -y nodejs nginx git
    
    # Install PM2
    npm install -g pm2
    
    # Create application directory
    mkdir -p /opt/sipbrewery-frontend /var/log/sipbrewery
    
    # Create systemd service for PM2
    pm2 startup systemd -u root --hp /root
"

# Create Nginx configuration for frontend
cat > nginx-frontend.conf << EOF
server {
    listen 80;
    server_name your-domain.com www.your-domain.com;
    
    # Security headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header Referrer-Policy "no-referrer-when-downgrade" always;
    
    # Gzip compression
    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_types text/plain text/css text/xml text/javascript application/javascript application/xml+rss application/json;
    
    # Frontend application
    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
        proxy_cache_bypass \$http_upgrade;
        proxy_read_timeout 86400;
    }
    
    # API routes proxy to backend
    location /api/ {
        proxy_pass http://${BACKEND_IP}:3001;
        proxy_http_version 1.1;
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
        proxy_cache_bypass \$http_upgrade;
        proxy_read_timeout 86400;
    }
    
    # Static assets caching
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
        proxy_pass http://localhost:3000;
    }
}
EOF

copy_to_remote $FRONTEND_IP nginx-frontend.conf /etc/nginx/sites-available/sipbrewery
rm nginx-frontend.conf

run_remote $FRONTEND_IP "
    # Enable site
    ln -sf /etc/nginx/sites-available/sipbrewery /etc/nginx/sites-enabled/
    rm -f /etc/nginx/sites-enabled/default
    nginx -t
    systemctl reload nginx
    systemctl enable nginx
"

# Create frontend environment file
cat > frontend.env << EOF
NEXT_PUBLIC_API_URL=https://your-domain.com
NEXT_PUBLIC_APP_ENV=production
EOF

copy_to_remote $FRONTEND_IP frontend.env /opt/sipbrewery-frontend/.env.local
rm frontend.env

# Create PM2 ecosystem file for frontend
cat > frontend-ecosystem.config.js << 'EOF'
module.exports = {
  apps: [{
    name: 'sipbrewery-frontend',
    script: 'npm',
    args: 'start',
    cwd: '/opt/sipbrewery-frontend',
    env: {
      NODE_ENV: 'production',
      PORT: 3000
    },
    error_file: '/var/log/sipbrewery/frontend-error.log',
    out_file: '/var/log/sipbrewery/frontend-out.log',
    log_file: '/var/log/sipbrewery/frontend.log',
    time: true
  }]
}
EOF

copy_to_remote $FRONTEND_IP frontend-ecosystem.config.js /opt/sipbrewery-frontend/ecosystem.config.js
rm frontend-ecosystem.config.js

echo "✅ Frontend server configured"

echo "📊 Setting up monitoring and backup scripts..."

# Create health check script
cat > health-check.sh << 'EOF'
#!/bin/bash
# Health monitoring script

LOG_FILE="/var/log/sipbrewery/health-check.log"
DATE=$(date '+%Y-%m-%d %H:%M:%S')

# Check services
FRONTEND_STATUS=$(curl -s -o /dev/null -w "%{http_code}" http://localhost:3000/health 2>/dev/null || echo "000")
BACKEND_STATUS=$(curl -s -o /dev/null -w "%{http_code}" http://localhost:3001/health 2>/dev/null || echo "000")

echo "[$DATE] Frontend: $FRONTEND_STATUS, Backend: $BACKEND_STATUS" >> $LOG_FILE

# Alert if services are down
if [ "$FRONTEND_STATUS" != "200" ] && [ "$FRONTEND_STATUS" != "000" ]; then
    echo "[$DATE] ALERT: Frontend service down (Status: $FRONTEND_STATUS)" >> $LOG_FILE
fi

if [ "$BACKEND_STATUS" != "200" ] && [ "$BACKEND_STATUS" != "000" ]; then
    echo "[$DATE] ALERT: Backend service down (Status: $BACKEND_STATUS)" >> $LOG_FILE
fi
EOF

# Deploy health check to all servers
for server_ip in $FRONTEND_IP $BACKEND_IP; do
    copy_to_remote $server_ip health-check.sh /opt/health-check.sh
    run_remote $server_ip "
        chmod +x /opt/health-check.sh
        (crontab -l 2>/dev/null; echo '*/5 * * * * /opt/health-check.sh') | crontab -
    "
done

rm health-check.sh

# Create backup script for database server
cat > backup.sh << 'EOF'
#!/bin/bash
# Database backup script

BACKUP_DIR="/data/backups"
DATE=$(date +%Y%m%d_%H%M%S)
BACKUP_NAME="sipbrewery_backup_$DATE"

# Create backup directory
mkdir -p $BACKUP_DIR

# MongoDB backup
mongodump --host localhost:27017 --db sipbrewery --out $BACKUP_DIR/$BACKUP_NAME

# Compress backup
tar -czf $BACKUP_DIR/$BACKUP_NAME.tar.gz -C $BACKUP_DIR $BACKUP_NAME
rm -rf $BACKUP_DIR/$BACKUP_NAME

# Keep only last 7 days of backups
find $BACKUP_DIR -name "*.tar.gz" -mtime +7 -delete

echo "$(date): Backup completed: $BACKUP_NAME.tar.gz" >> /var/log/sipbrewery/backup.log
EOF

copy_to_remote $DATABASE_IP backup.sh /opt/backup.sh
rm backup.sh

run_remote $DATABASE_IP "
    chmod +x /opt/backup.sh
    mkdir -p /var/log/sipbrewery
    (crontab -l 2>/dev/null; echo '0 2 * * * /opt/backup.sh') | crontab -
"

echo "✅ Monitoring and backup configured"

echo ""
echo "🎉 Server configuration completed!"
echo ""
echo "📋 Summary:"
echo "   Database Server: $DATABASE_IP (MongoDB + Redis)"
echo "   Backend Server: $BACKEND_IP (Node.js API)"
echo "   Frontend Server: $FRONTEND_IP (Next.js + Nginx)"
echo "   Load Balancer: $LB_IP"
echo ""
echo "🔧 Configuration details:"
echo "   - MongoDB: sipbrewery database with sipbrewery_user"
echo "   - Redis: Available on port 6379"
echo "   - Backend: PM2 cluster mode on port 3001"
echo "   - Frontend: Next.js on port 3000 with Nginx proxy"
echo "   - Health checks: Every 5 minutes"
echo "   - Backups: Daily at 2 AM"
echo ""
echo "Next steps:"
echo "1. Update DNS to point to Load Balancer: $LB_IP"
echo "2. Run ./deploy-apps.sh to deploy applications"
echo "3. Configure SSL certificates (Cloudflare or Let's Encrypt)"
