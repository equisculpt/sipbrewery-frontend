# 🎯 SIP Brewery Demo Account System - Complete Guide

## 🚀 **DEMO ACCOUNT FEATURES**

### **💰 Virtual Money System**
- **₹1,00,000 Demo Balance**: Every new user gets virtual money to invest
- **Real Market Simulation**: Portfolio values change with simulated market movements
- **No Real Money Risk**: Practice investing without financial consequences

### **📊 Portfolio Management**
- **Live Portfolio Tracking**: Real-time portfolio value updates
- **Holdings Management**: Track all your fund investments
- **Performance Analytics**: Returns, percentages, and growth tracking
- **Transaction History**: Complete record of all investments

### **🎯 Investment Options**
- **Lump Sum Investments**: One-time investments in mutual funds
- **SIP (Systematic Investment Plan)**: Monthly recurring investments
- **Fund Selection**: 5 demo funds across different categories
- **Risk Profiling**: Low, Moderate, and High-risk fund options

## 🛠️ **HOW TO USE DEMO ACCOUNT**

### **Step 1: Create Demo Account**
1. Visit the Demo Account section on the main page
2. Fill in your details:
   - **Name**: Your full name
   - **Email**: Valid email address (used for login)
   - **Phone**: Optional contact number
3. Click "Create Demo Account"
4. You'll receive ₹1,00,000 virtual balance instantly

### **Step 2: Login to Existing Account**
1. Click "Already have a demo account? Login here"
2. Enter your registered email
3. Access your existing portfolio and balance

### **Step 3: Invest in Funds**
1. **Select Fund**: Choose from 5 available demo funds
2. **Enter Amount**: Minimum ₹500 investment
3. **Invest**: Funds are added to your portfolio instantly
4. **Track Performance**: Watch your investments grow/decline in real-time

### **Step 4: Start SIP**
1. **Choose Fund**: Select fund for monthly investment
2. **Monthly Amount**: Set recurring investment amount (min ₹500)
3. **Duration**: Choose 12, 24, 36, or 60 months
4. **Activate**: SIP will be created and tracked

### **Step 5: Monitor Portfolio**
1. **Dashboard**: View total invested, current value, returns
2. **Holdings Table**: Detailed view of each fund investment
3. **Live Updates**: Portfolio refreshes every 30 seconds
4. **Manual Refresh**: Click refresh button for instant updates

## 📈 **AVAILABLE DEMO FUNDS**

### **1. HDFC Top 100 Fund (HDFC0001)**
- **Category**: Large Cap
- **NAV**: ₹756.23
- **1Y Return**: 12.5%
- **3Y Return**: 15.2%
- **Risk**: Moderate
- **Expense Ratio**: 1.05%

### **2. SBI Blue Chip Fund (SBI0002)**
- **Category**: Large Cap
- **NAV**: ₹432.18
- **1Y Return**: 11.8%
- **3Y Return**: 14.7%
- **Risk**: Moderate
- **Expense Ratio**: 0.98%

### **3. ICICI Prudential Technology Fund (ICICI0003)**
- **Category**: Sector
- **NAV**: ₹234.56
- **1Y Return**: 18.3%
- **3Y Return**: 22.1%
- **Risk**: High
- **Expense Ratio**: 1.25%

### **4. Axis Small Cap Fund (AXIS0004)**
- **Category**: Small Cap
- **NAV**: ₹89.45
- **1Y Return**: 25.6%
- **3Y Return**: 28.9%
- **Risk**: High
- **Expense Ratio**: 1.45%

### **5. Kotak Hybrid Equity Fund (KOTAK0005)**
- **Category**: Hybrid
- **NAV**: ₹345.67
- **1Y Return**: 9.8%
- **3Y Return**: 11.5%
- **Risk**: Low
- **Expense Ratio**: 0.85%

## 🔧 **TECHNICAL FEATURES**

### **Backend API Endpoints**
- `POST /api/demo/signup` - Create new demo account
- `POST /api/demo/login` - Login to existing account
- `GET /api/demo/portfolio/:userId` - Get portfolio with live updates
- `POST /api/demo/invest` - Make lump sum investment
- `POST /api/demo/sip/create` - Create SIP investment
- `GET /api/demo/transactions/:userId` - Get transaction history
- `GET /api/demo/funds` - Get available demo funds

### **Real-time Features**
- **Live Portfolio Updates**: Values change every 30 seconds
- **Market Simulation**: ±1% random market movements
- **Instant Transactions**: Immediate investment processing
- **Balance Tracking**: Real-time demo balance updates

### **Data Persistence**
- **In-Memory Storage**: Demo data stored in server memory
- **Session Management**: Login tokens for user sessions
- **Portfolio Tracking**: Complete investment history
- **Transaction Logs**: All investment activities recorded

## 🎯 **DEMO SCENARIOS TO TRY**

### **Scenario 1: Conservative Investor**
1. Invest ₹30,000 in HDFC Top 100 Fund
2. Invest ₹20,000 in SBI Blue Chip Fund
3. Start ₹5,000 monthly SIP in Kotak Hybrid Equity Fund
4. Monitor stable, moderate returns

### **Scenario 2: Aggressive Investor**
1. Invest ₹25,000 in ICICI Technology Fund
2. Invest ₹25,000 in Axis Small Cap Fund
3. Start ₹10,000 monthly SIP in Technology Fund
4. Experience higher volatility and potential returns

### **Scenario 3: Balanced Portfolio**
1. Invest ₹20,000 each in all 5 funds
2. Start multiple SIPs of ₹2,000 each
3. Create a well-diversified portfolio
4. Track balanced risk-return profile

## 📊 **PORTFOLIO ANALYTICS**

### **Key Metrics Tracked**
- **Total Invested**: Sum of all investments made
- **Current Value**: Real-time portfolio value
- **Total Returns**: Absolute gain/loss amount
- **Return Percentage**: Percentage gain/loss
- **Individual Fund Performance**: Fund-wise returns

### **Live Market Simulation**
- **Random Market Movements**: ±1% changes every refresh
- **Realistic Volatility**: Simulates actual market behavior
- **Compound Growth**: Returns compound over time
- **Risk-Return Correlation**: Higher risk funds show more volatility

## 🔐 **SECURITY & LIMITATIONS**

### **Demo Account Security**
- **No Real Money**: All transactions are virtual
- **Email-based Login**: Simple email authentication
- **Session Tokens**: Secure demo session management
- **Data Privacy**: Demo data not shared or stored permanently

### **Current Limitations**
- **In-Memory Storage**: Data resets when server restarts
- **No Real Market Data**: Simulated market movements
- **Limited Funds**: Only 5 demo funds available
- **No Real KYC**: Simplified signup process

## 🚀 **GETTING STARTED**

1. **Visit**: http://localhost:3000
2. **Navigate**: Scroll to "Try Demo Account" section
3. **Signup**: Create your demo account
4. **Invest**: Start with ₹1,00,000 virtual money
5. **Track**: Monitor your portfolio performance
6. **Learn**: Understand mutual fund investing risk-free

## 📞 **SUPPORT**

For demo account issues or questions:
- Check browser console for error messages
- Ensure backend server is running on port 3001
- Verify frontend server is running on port 3000
- Refresh page if portfolio doesn't update

---

**🎉 Start your investment journey with zero risk using our comprehensive demo account system!**
