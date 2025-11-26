# Portfolink - Quick Start Guide

## ⚠️ MongoDB Required

The application needs MongoDB to run. You have two options:

### Option 1: Install MongoDB Locally (Recommended for Development)

**Windows:**
1. Download MongoDB Community Server: https://www.mongodb.com/try/download/community
2. Run the installer (choose "Complete" installation)
3. MongoDB will start automatically as a Windows service
4. Verify installation:
   ```bash
   mongod --version
   ```

**Alternative - Using MongoDB Compass:**
1. Download MongoDB Compass (includes MongoDB): https://www.mongodb.com/try/download/compass
2. Install and it will set up MongoDB for you

### Option 2: Use MongoDB Atlas (Cloud - Free Tier)

1. Go to https://www.mongodb.com/cloud/atlas/register
2. Create a free account
3. Create a free cluster (M0 tier)
4. Get your connection string
5. Update `server/.env`:
   ```env
   MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/portfolink
   ```

## 🚀 Starting the Application

Once MongoDB is set up:

```bash
# From the root directory
npm start
```

This will start:
- **Backend**: http://localhost:5000
- **Frontend**: http://localhost:5173

## 🔍 Troubleshooting

### "ERR_CONNECTION_REFUSED"
- **Cause**: Server not running
- **Fix**: Make sure you ran `npm start` from the root directory

### "MongooseServerSelectionError"
- **Cause**: MongoDB not running or wrong connection string
- **Fix**: 
  - Local: Start MongoDB service
  - Atlas: Check connection string in `.env`

### "Cannot find module 'puppeteer'"
- **Cause**: Dependencies not installed
- **Fix**: 
  ```bash
  cd server
  npm install
  ```

## 📝 Current Setup Status

✅ Code is complete
✅ Dependencies installed (puppeteer, slugify)
❌ MongoDB not installed/running

## 🎯 Next Steps

1. **Install MongoDB** (choose Option 1 or 2 above)
2. **Verify `.env` file** in `server/` directory:
   ```env
   PORT=5000
   MONGO_URI=mongodb://localhost:27017/portfolink
   JWT_SECRET=your_secret_key_here
   ```
3. **Start the app**:
   ```bash
   npm start
   ```
4. **Open browser**: http://localhost:5173

## 💡 Quick Test (Without MongoDB)

If you want to test the frontend only:
```bash
cd client
npm run dev
```

This will show the UI, but auth and data features won't work without the backend.
