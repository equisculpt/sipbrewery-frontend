#!/bin/bash
# SIP Brewery - Hetzner Infrastructure Setup Script

set -e

echo "🚀 Setting up Hetzner Cloud infrastructure for SIP Brewery..."

# Configuration
PROJECT_NAME="sipbrewery"
NETWORK_NAME="${PROJECT_NAME}-net"
SSH_KEY_NAME="${PROJECT_NAME}-key"

# Check if hcloud CLI is installed
if ! command -v hcloud &> /dev/null; then
    echo "❌ Hetzner CLI not found. Installing..."
    curl -L https://github.com/hetznercloud/cli/releases/latest/download/hcloud-linux-amd64.tar.gz | tar xz
    sudo mv hcloud /usr/local/bin/
    echo "✅ Hetzner CLI installed"
fi

# Check if context exists
if ! hcloud context list | grep -q "$PROJECT_NAME"; then
    echo "⚠️  Please create Hetzner context first:"
    echo "   hcloud context create $PROJECT_NAME"
    echo "   Then enter your API token"
    exit 1
fi

# Use the context
hcloud context use $PROJECT_NAME

# Generate SSH key if it doesn't exist
if [ ! -f ~/.ssh/${PROJECT_NAME}_rsa ]; then
    echo "🔑 Generating SSH key..."
    ssh-keygen -t rsa -b 4096 -C "$PROJECT_NAME-deployment" -f ~/.ssh/${PROJECT_NAME}_rsa -N ""
    echo "✅ SSH key generated"
fi

# Add SSH key to Hetzner
if ! hcloud ssh-key list | grep -q "$SSH_KEY_NAME"; then
    echo "📤 Adding SSH key to Hetzner..."
    hcloud ssh-key create --name $SSH_KEY_NAME --public-key-from-file ~/.ssh/${PROJECT_NAME}_rsa.pub
    echo "✅ SSH key added to Hetzner"
fi

# Create network
if ! hcloud network list | grep -q "$NETWORK_NAME"; then
    echo "🌐 Creating private network..."
    hcloud network create --name $NETWORK_NAME --ip-range 10.0.0.0/16
    hcloud network add-subnet $NETWORK_NAME --network-zone eu-central --type cloud --ip-range 10.0.1.0/24
    echo "✅ Private network created"
fi

# Create servers
echo "🖥️  Creating servers..."

# Frontend server
if ! hcloud server list | grep -q "${PROJECT_NAME}-frontend"; then
    echo "   Creating frontend server..."
    hcloud server create \
        --name ${PROJECT_NAME}-frontend \
        --type cx21 \
        --image ubuntu-22.04 \
        --ssh-key $SSH_KEY_NAME \
        --network $NETWORK_NAME \
        --location nbg1
    echo "   ✅ Frontend server created"
fi

# Backend server
if ! hcloud server list | grep -q "${PROJECT_NAME}-backend"; then
    echo "   Creating backend server..."
    hcloud server create \
        --name ${PROJECT_NAME}-backend \
        --type cx31 \
        --image ubuntu-22.04 \
        --ssh-key $SSH_KEY_NAME \
        --network $NETWORK_NAME \
        --location nbg1
    echo "   ✅ Backend server created"
fi

# Database server
if ! hcloud server list | grep -q "${PROJECT_NAME}-database"; then
    echo "   Creating database server..."
    hcloud server create \
        --name ${PROJECT_NAME}-database \
        --type cx21 \
        --image ubuntu-22.04 \
        --ssh-key $SSH_KEY_NAME \
        --network $NETWORK_NAME \
        --location nbg1
    
    # Create and attach storage volume
    if ! hcloud volume list | grep -q "db-storage"; then
        hcloud volume create --name db-storage --size 100 --location nbg1
        sleep 10
        hcloud server attach-volume ${PROJECT_NAME}-database db-storage
    fi
    echo "   ✅ Database server created with storage"
fi

# Create load balancer
if ! hcloud load-balancer list | grep -q "${PROJECT_NAME}-lb"; then
    echo "⚖️  Creating load balancer..."
    hcloud load-balancer create \
        --name ${PROJECT_NAME}-lb \
        --type lb11 \
        --location nbg1 \
        --network $NETWORK_NAME
    
    # Wait for load balancer to be ready
    sleep 30
    
    # Add targets
    hcloud load-balancer add-target ${PROJECT_NAME}-lb --type server --name ${PROJECT_NAME}-frontend
    hcloud load-balancer add-target ${PROJECT_NAME}-lb --type server --name ${PROJECT_NAME}-backend
    echo "   ✅ Load balancer created and configured"
fi

# Get server IPs
echo "📋 Server Information:"
FRONTEND_IP=$(hcloud server ip ${PROJECT_NAME}-frontend)
BACKEND_IP=$(hcloud server ip ${PROJECT_NAME}-backend)
DATABASE_IP=$(hcloud server ip ${PROJECT_NAME}-database)
LB_IP=$(hcloud load-balancer ip ${PROJECT_NAME}-lb)

echo "   Frontend Server: $FRONTEND_IP"
echo "   Backend Server: $BACKEND_IP"
echo "   Database Server: $DATABASE_IP"
echo "   Load Balancer: $LB_IP"

# Save IPs to file for other scripts
cat > server-ips.env << EOF
FRONTEND_IP=$FRONTEND_IP
BACKEND_IP=$BACKEND_IP
DATABASE_IP=$DATABASE_IP
LB_IP=$LB_IP
SSH_KEY_PATH=~/.ssh/${PROJECT_NAME}_rsa
EOF

echo ""
echo "🎉 Hetzner infrastructure setup completed!"
echo "📝 Server IPs saved to server-ips.env"
echo "🔑 SSH key: ~/.ssh/${PROJECT_NAME}_rsa"
echo ""
echo "Next steps:"
echo "1. Update your DNS to point to Load Balancer IP: $LB_IP"
echo "2. Run ./configure-servers.sh to configure the servers"
echo "3. Run ./deploy-apps.sh to deploy applications"
