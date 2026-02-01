# 🚀 Quick Start Guide - Mini Social App

Follow these steps to run the application on your local machine.

---

## 📋 What You Need

Before starting, make sure you have:
- ✅ **Node.js** installed (version 14 or higher)
  - Check by running: `node --version` in terminal
  - Download from: https://nodejs.org/
- ✅ **MongoDB Atlas** account (free)
  - Sign up at: https://www.mongodb.com/cloud/atlas
- ✅ **VS Code** or any code editor

---

## 📁 Project Structure

```
mini-social-app-complete/
├── backend/              # Server-side code
│   ├── models/          # Database schemas
│   ├── routes/          # API endpoints
│   ├── middleware/      # Auth middleware
│   ├── server.js        # Main server file
│   ├── package.json     # Backend dependencies
│   └── .env.example     # Environment variables template
│
├── frontend/            # Client-side code
│   ├── public/         # Static files
│   ├── src/
│   │   ├── components/ # React components
│   │   ├── context/    # State management
│   │   ├── services/   # API calls
│   │   ├── App.js      # Main app component
│   │   └── index.js    # Entry point
│   ├── package.json    # Frontend dependencies
│   └── .env.example    # Environment variables template
│
└── README.md           # Documentation
```

---

## ⚙️ Setup Instructions

### STEP 1: Setup MongoDB Atlas (5 minutes)

1. **Create Account**
   - Go to https://www.mongodb.com/cloud/atlas
   - Click "Try Free" and sign up

2. **Create Cluster**
   - Click "Build a Database"
   - Choose **FREE** (M0) tier
   - Select **AWS** and a region near you
   - Click "Create"
   - Wait 2-3 minutes for setup

3. **Create Database User**
   - Click "Database Access" (left sidebar)
   - Click "Add New Database User"
   - Username: `miniuser`
   - Password: Click "Autogenerate" and **SAVE IT**
   - Database User Privileges: "Read and write to any database"
   - Click "Add User"

4. **Allow Network Access**
   - Click "Network Access" (left sidebar)
   - Click "Add IP Address"
   - Click "Allow Access from Anywhere"
   - Click "Confirm"

5. **Get Connection String**
   - Click "Database" (left sidebar)
   - Click "Connect" on your cluster
   - Choose "Connect your application"
   - **COPY** the connection string
   - It looks like: `mongodb+srv://miniuser:<password>@cluster0.xxxxx.mongodb.net/`

---

### STEP 2: Backend Setup (5 minutes)

1. **Open Terminal in VS Code**
   - Open the project folder in VS Code
   - Press `` Ctrl + ` `` (or Terminal → New Terminal)

2. **Navigate to backend**
   ```bash
   cd backend
   ```

3. **Create .env file**
   - Create a new file named `.env` in the `backend` folder
   - Copy this content and **REPLACE** with your values:

   ```env
   MONGODB_URI=mongodb+srv://miniuser:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/mini-social-app?retryWrites=true&w=majority
   JWT_SECRET=my_super_secret_key_12345_change_this
   PORT=5000
   FRONTEND_URL=http://localhost:3000
   ```

   **Important:**
   - Replace `YOUR_PASSWORD` with your MongoDB password
   - Replace `cluster0.xxxxx` with your cluster address

4. **Install Dependencies**
   ```bash
   npm install
   ```
   ⏳ Wait 1-2 minutes

5. **Start Backend**
   ```bash
   npm start
   ```

   ✅ You should see:
   ```
   Server running on port 5000
   MongoDB Connected: cluster0.xxxxx.mongodb.net
   ```

   ⚠️ **Keep this terminal running!**

---

### STEP 3: Frontend Setup (5 minutes)

1. **Open New Terminal**
   - Click the "+" button in terminal (top right)
   - Or: Terminal → New Terminal

2. **Navigate to frontend**
   ```bash
   cd frontend
   ```

3. **Create .env file**
   - Create a new file named `.env` in the `frontend` folder
   - Add this content:

   ```env
   REACT_APP_API_URL=http://localhost:5000/api
   ```

4. **Install Dependencies**
   ```bash
   npm install
   ```
   ⏳ Wait 2-3 minutes

5. **Start Frontend**
   ```bash
   npm start
   ```

   ✅ Browser should open automatically at http://localhost:3000

---

## 🎉 Test the Application

### 1. Create an Account
- Click "Sign Up"
- Enter:
  - Username: `testuser`
  - Email: `test@example.com`
  - Password: `password123`
- Click "Sign Up"

### 2. Create Your First Post
- Type: `Hello! This is my first post 🎉`
- Add image URL (optional): `https://picsum.photos/400/300`
- Click "Post"

### 3. Test Features
- ❤️ Click heart icon to like
- 💬 Click comment icon and add a comment
- 🔄 Click "Load More" to test pagination

---

## 🛑 How to Stop

When you're done:
1. Go to each terminal
2. Press `Ctrl + C`

---

## 🔄 How to Start Again

Next time you want to run the app:

**Terminal 1 (Backend):**
```bash
cd backend
npm start
```

**Terminal 2 (Frontend):**
```bash
cd frontend
npm start
```

---

## 🐛 Troubleshooting

### Problem: "MongoDB connection failed"
**Solution:**
- Check `.env` file has correct connection string
- Make sure password has no special characters causing issues
- Verify IP whitelist in MongoDB Atlas

### Problem: "Port 5000 already in use"
**Solution:**
- Close any other apps using port 5000
- Or change `PORT=5001` in backend `.env`

### Problem: "Cannot find module"
**Solution:**
```bash
# Delete node_modules and reinstall
cd backend
rm -rf node_modules
npm install

cd ../frontend
rm -rf node_modules
npm install
```

### Problem: Frontend shows blank page
**Solution:**
- Check browser console (F12) for errors
- Make sure backend shows "MongoDB Connected"
- Verify both servers are running

---

## 📞 Need Help?

If you're stuck:
1. Check error messages in terminal
2. Check browser console (F12)
3. Read the error message carefully
4. Double-check all .env values

---

## ✅ Checklist

Before submitting, make sure:
- [ ] MongoDB Atlas cluster created
- [ ] Backend `.env` file configured
- [ ] Frontend `.env` file configured
- [ ] Both terminals running without errors
- [ ] Can signup and login
- [ ] Can create posts
- [ ] Can like and comment
- [ ] Pagination works

---

## 📚 Additional Resources

- **Full Documentation**: See `README.md`
- **Deployment Guide**: See `DEPLOYMENT.md`
- **API Documentation**: See `API.md`
- **Features Guide**: See `FEATURES.md`

---

**Happy Coding! 🚀**
