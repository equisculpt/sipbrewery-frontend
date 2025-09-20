# 🚀 SIP Brewery Deployment Scripts

Complete deployment automation for Hetzner Cloud + Vast.ai GPU architecture.

## 📋 Quick Start

### Prerequisites
```bash
# Install required tools
pip install vastai
curl -L https://github.com/hetznercloud/cli/releases/latest/download/hcloud-linux-amd64.tar.gz | tar xz
sudo mv hcloud /usr/local/bin/

# Set up API keys
export HETZNER_API_TOKEN=your-hetzner-token
export VAST_API_KEY=your-vast-api-key
```

### Complete Deployment (5 minutes)
```bash
# 1. Setup Hetzner infrastructure
chmod +x *.sh
./setup-hetzner.sh

# 2. Configure all servers
./configure-servers.sh

# 3. Deploy applications
./deploy-apps.sh

# 4. Setup GPU compute (optional)
./setup-vast-gpu.sh
```

## 📁 Script Overview

| Script | Purpose | Duration |
|--------|---------|----------|
| `setup-hetzner.sh` | Create Hetzner infrastructure | ~2 min |
| `configure-servers.sh` | Configure all servers | ~3 min |
| `deploy-apps.sh` | Deploy applications | ~2 min |
| `setup-vast-gpu.sh` | Setup GPU compute | ~1 min |

## 🏗️ Infrastructure Created

### Hetzner Cloud Resources
- **Frontend Server** (CX21): Next.js + Nginx
- **Backend Server** (CX31): Node.js API + PM2
- **Database Server** (CX21): MongoDB + Redis
- **Load Balancer** (LB11): Traffic distribution
- **Private Network**: Secure internal communication
- **Storage Volume**: 100GB for database

### Vast.ai GPU Resources (Optional)
- **GPU Instances**: RTX 3090/4090 for AI processing
- **Auto-scaling**: Start/stop based on demand
- **Failover**: CPU fallback when GPU unavailable

## 💰 Cost Breakdown

```
Monthly Costs:
├── Hetzner Cloud: ~€33/month
│   ├── Frontend (CX21): €5.83
│   ├── Backend (CX31): €11.90
│   ├── Database (CX21): €5.83
│   ├── Load Balancer: €5.39
│   └── Storage (100GB): €4.00
│
└── Vast.ai GPU: $50-200/month (usage-based)
    ├── RTX 3090: $0.20-0.40/hour
    └── RTX 4090: $0.30-0.60/hour

Total: $83-233/month
```

## 🔧 Configuration Details

### Environment Variables
```bash
# Backend (.env)
NODE_ENV=production
MONGODB_URI=mongodb://sipbrewery_user:password@database-ip:27017/sipbrewery
REDIS_URL=redis://database-ip:6379
JWT_SECRET=auto-generated-secure-secret
VAST_API_KEY=your-vast-api-key
GPU_FALLBACK_ENABLED=true

# Frontend (.env.local)
NEXT_PUBLIC_API_URL=https://your-domain.com
NEXT_PUBLIC_APP_ENV=production
```

### Security Features
- **Private Network**: All servers communicate internally
- **JWT Authentication**: Secure API access
- **Rate Limiting**: DDoS protection
- **Input Validation**: SQL injection prevention
- **HTTPS Redirect**: SSL/TLS encryption
- **Security Headers**: XSS, CSRF protection

## 📊 Monitoring & Maintenance

### Automated Monitoring
- **Health Checks**: Every 5 minutes
- **Log Rotation**: Automatic cleanup
- **Database Backups**: Daily at 2 AM
- **PM2 Process Management**: Auto-restart on failure

### Manual Commands
```bash
# Check application status
ssh -i ~/.ssh/sipbrewery_rsa root@BACKEND_IP 'pm2 status'

# View logs
ssh -i ~/.ssh/sipbrewery_rsa root@BACKEND_IP 'pm2 logs sipbrewery-backend'

# Restart services
ssh -i ~/.ssh/sipbrewery_rsa root@BACKEND_IP 'pm2 restart sipbrewery-backend'

# Database backup
ssh -i ~/.ssh/sipbrewery_rsa root@DATABASE_IP '/opt/backup.sh'
```

## 🎯 GPU Integration

### Architecture
```
User Request → Hetzner Backend → Vast.ai GPU → Hetzner Response
```

### GPU Service Features
- **Portfolio Optimization**: GPU-accelerated calculations
- **Market Analysis**: AI-powered insights
- **Auto-Registration**: Heartbeat system with backend
- **Failover**: CPU fallback when GPU unavailable
- **Cost Optimization**: Pay only when GPU active

### GPU Management
```bash
# Launch GPU instance
vastai create instance INSTANCE_ID --image pytorch/pytorch:latest --disk 20

# Monitor instances
vastai show instances

# Stop instance (save costs)
vastai destroy instance INSTANCE_ID
```

## 🌐 Domain & SSL Setup

### DNS Configuration
```
# Point your domain to Load Balancer IP
A     your-domain.com        → LB_IP
A     api.your-domain.com    → LB_IP
CNAME www.your-domain.com    → your-domain.com
```

### SSL Options
1. **Cloudflare (Recommended)**
   - Free SSL certificates
   - Global CDN
   - DDoS protection
   - Easy setup

2. **Let's Encrypt**
   - Free SSL certificates
   - Auto-renewal
   - Manual setup required

## 🚨 Troubleshooting

### Common Issues

#### Services Not Starting
```bash
# Check PM2 status
pm2 status

# Check logs
pm2 logs

# Restart services
pm2 restart all
```

#### Database Connection Issues
```bash
# Check MongoDB status
systemctl status mongod

# Check Redis status
systemctl status redis-server

# Test connection
mongosh --host DATABASE_IP:27017
```

#### GPU Service Issues
```bash
# Check GPU availability
nvidia-smi

# Test GPU service
curl http://localhost:8000/health

# Check heartbeat
curl -X POST http://localhost:8000/heartbeat
```

### Performance Optimization

#### Frontend Optimization
- **Static Asset Caching**: 1 year cache headers
- **Gzip Compression**: Enabled for all text assets
- **Image Optimization**: Next.js automatic optimization
- **Code Splitting**: Lazy loading of components

#### Backend Optimization
- **PM2 Cluster Mode**: Multi-process scaling
- **Redis Caching**: Session and data caching
- **Database Indexing**: Optimized queries
- **Connection Pooling**: Efficient database connections

## 📈 Scaling Strategy

### Horizontal Scaling
```bash
# Add more backend servers
hcloud server create --name sipbrewery-backend-2 --type cx31

# Add to load balancer
hcloud load-balancer add-target sipbrewery-lb --type server --name sipbrewery-backend-2
```

### GPU Scaling
```bash
# Launch multiple GPU instances
for i in {1..3}; do
  vastai create instance INSTANCE_ID --image pytorch/pytorch:latest
done
```

### Database Scaling
- **MongoDB Replica Set**: High availability
- **Read Replicas**: Distribute read load
- **Sharding**: Horizontal data distribution

## 🎉 Success Metrics

After deployment, you should see:
- ✅ Frontend accessible at https://your-domain.com
- ✅ API responding at https://api.your-domain.com/health
- ✅ Database accepting connections
- ✅ GPU service registering with backend
- ✅ Health checks passing
- ✅ Backups running daily
- ✅ SSL certificates active

## 📞 Support

### Log Locations
```
Frontend Logs: /var/log/sipbrewery/frontend.log
Backend Logs:  /var/log/sipbrewery/backend.log
Health Checks: /var/log/sipbrewery/health-check.log
Database:      /var/log/mongodb/mongod.log
Nginx:         /var/log/nginx/access.log
```

### Key Files
```
Server IPs:     server-ips.env
SSH Key:        ~/.ssh/sipbrewery_rsa
Backend Config: /opt/sipbrewery-backend/.env
Frontend Config: /opt/sipbrewery-frontend/.env.local
Database Config: /etc/mongod.conf
```

This deployment guide provides enterprise-grade infrastructure with GPU acceleration, automatic failover, comprehensive monitoring, and cost optimization for the SIP Brewery platform.
