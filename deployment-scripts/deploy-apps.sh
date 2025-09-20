#!/bin/bash
# SIP Brewery - Application Deployment Script

set -e

# Load server IPs
if [ ! -f server-ips.env ]; then
    echo "❌ server-ips.env not found. Run setup-hetzner.sh first."
    exit 1
fi

source server-ips.env

echo "🚀 Deploying SIP Brewery applications..."

# Configuration
REPO_FRONTEND="https://github.com/your-username/sipbrewery-frontend.git"
REPO_BACKEND="https://github.com/your-username/sip-brewery-backend.git"
BRANCH="main"

# Function to run commands on remote server
run_remote() {
    local server_ip=$1
    local command=$2
    ssh -i $SSH_KEY_PATH -o StrictHostKeyChecking=no root@$server_ip "$command"
}

echo "📦 Deploying Backend Application..."

# Deploy backend
run_remote $BACKEND_IP "
    cd /opt/sipbrewery-backend
    
    # Clone or update repository
    if [ ! -d .git ]; then
        git clone $REPO_BACKEND .
    else
        git fetch origin
        git reset --hard origin/$BRANCH
    fi
    
    # Install dependencies
    npm ci --production
    
    # Run database migrations if needed
    if [ -f scripts/migrate.js ]; then
        node scripts/migrate.js
    fi
    
    # Start application with PM2
    pm2 delete sipbrewery-backend 2>/dev/null || true
    pm2 start ecosystem.config.js
    pm2 save
    
    echo '✅ Backend deployed and started'
"

echo "✅ Backend application deployed"

echo "🌐 Deploying Frontend Application..."

# Deploy frontend
run_remote $FRONTEND_IP "
    cd /opt/sipbrewery-frontend
    
    # Clone or update repository
    if [ ! -d .git ]; then
        git clone $REPO_FRONTEND .
    else
        git fetch origin
        git reset --hard origin/$BRANCH
    fi
    
    # Install dependencies
    npm ci
    
    # Build application
    npm run build
    
    # Start application with PM2
    pm2 delete sipbrewery-frontend 2>/dev/null || true
    pm2 start ecosystem.config.js
    pm2 save
    
    echo '✅ Frontend deployed and started'
"

echo "✅ Frontend application deployed"

echo "🔍 Verifying deployment..."

# Wait for services to start
sleep 10

# Check backend health
echo "Checking backend health..."
BACKEND_HEALTH=$(run_remote $BACKEND_IP "curl -s http://localhost:3001/health" || echo "failed")
if [[ $BACKEND_HEALTH == *"healthy"* ]] || [[ $BACKEND_HEALTH == *"ok"* ]]; then
    echo "✅ Backend is healthy"
else
    echo "⚠️  Backend health check failed: $BACKEND_HEALTH"
fi

# Check frontend health
echo "Checking frontend health..."
FRONTEND_HEALTH=$(run_remote $FRONTEND_IP "curl -s http://localhost:3000" || echo "failed")
if [[ $FRONTEND_HEALTH == *"html"* ]] || [[ $FRONTEND_HEALTH != "failed" ]]; then
    echo "✅ Frontend is responding"
else
    echo "⚠️  Frontend health check failed"
fi

# Check PM2 status
echo "📊 PM2 Status:"
echo "Backend PM2 processes:"
run_remote $BACKEND_IP "pm2 list"
echo ""
echo "Frontend PM2 processes:"
run_remote $FRONTEND_IP "pm2 list"

echo ""
echo "🎉 Application deployment completed!"
echo ""
echo "📋 Deployment Summary:"
echo "   Backend: http://$BACKEND_IP:3001"
echo "   Frontend: http://$FRONTEND_IP:3000"
echo "   Load Balancer: http://$LB_IP"
echo ""
echo "🔧 Next steps:"
echo "1. Update your domain DNS to point to: $LB_IP"
echo "2. Configure SSL certificates (Cloudflare recommended)"
echo "3. Test the application: https://your-domain.com"
echo "4. Setup monitoring and alerts"
echo ""
echo "📝 Useful commands:"
echo "   Check logs: ssh -i $SSH_KEY_PATH root@$BACKEND_IP 'pm2 logs'"
echo "   Restart backend: ssh -i $SSH_KEY_PATH root@$BACKEND_IP 'pm2 restart sipbrewery-backend'"
echo "   Restart frontend: ssh -i $SSH_KEY_PATH root@$FRONTEND_IP 'pm2 restart sipbrewery-frontend'"
