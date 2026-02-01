# Deployment Guide

Complete step-by-step guide to deploy your Mini Social App to production.

## Table of Contents
1. MongoDB Atlas Setup
2. Backend Deployment (Render)
3. Frontend Deployment (Vercel)
4. Environment Variables
5. Testing

---

## 1. MongoDB Atlas Setup

### Step 1: Create MongoDB Atlas Account
1. Go to MongoDB Atlas
2. Sign up for a free account
3. Create a new organization (if needed)

### Step 2: Create a Cluster
1. Click "Build a Database"
2. Select "FREE" tier (M0)
3. Choose your cloud provider (AWS recommended)
4. Select a region close to your users
5. Click "Create Cluster"

### Step 3: Configure Database Access
1. Go to "Database Access" in left sidebar
2. Click "Add New Database User"
3. Choose "Password" authentication
4. Create username and strong password (save these!)
5. Set privileges to "Read and write to any database"
6. Click "Add User"

### Step 4: Configure Network Access
1. Go to "Network Access" in left sidebar
2. Click "Add IP Address"
3. For development: Click "Allow Access from Anywhere" (0.0.0.0/0)
4. For production: Add your server's IP address
5. Click "Confirm"

### Step 5: Get Connection String
1. Go to "Database" in left sidebar
2. Click "Connect" on your cluster
3. Choose "Connect your application"
4. Copy the connection string
5. Use database name: `mini-social-app`

⚠️ Important:
- Store this connection string only in environment variables
- Do NOT add it to README or documentation
- Do NOT commit it to GitHub

---

## 2. Backend Deployment (Render)

### Step 1: Prepare Backend for Deployment
1. Ensure `package.json` has a start script:

```json
"scripts": {
  "start": "node server.js"
}
Create .gitignore if not exists (already created)

Step 2: Push to GitHub
Create a new GitHub repository

Initialize git in your project:

cd mini-social-app
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin <your-repo-url>
git push -u origin main
Step 3: Deploy to Render
Go to Render.com

Sign up/login (can use GitHub)

Click "New +" → "Web Service"

Connect your GitHub repository

Configure:

Name: mini-social-backend

Root Directory: backend

Environment: Node

Build Command: npm install

Start Command: npm start

Instance Type: Free

Step 4: Add Environment Variables
In Render dashboard, go to "Environment" tab and add:

MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=generate_a_long_random_string
PORT=5000
FRONTEND_URL=will_add_after_frontend_deployment
NODE_ENV=production
To generate JWT_SECRET, use:

node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
Step 5: Deploy
Click "Create Web Service"

Wait for deployment (5–10 minutes)

Note your backend URL: https://your-app-name.onrender.com

3. Frontend Deployment (Vercel)
Step 1: Prepare Frontend
Update package.json build script (already configured):

"scripts": {
  "build": "react-scripts build"
}
Step 2: Deploy to Vercel
Option A: Vercel CLI
npm install -g vercel
vercel login
cd frontend
vercel --prod
Option B: Vercel Dashboard
Go to Vercel.com

Sign up/login with GitHub

Click "Add New Project"

Import your GitHub repository

Configure:

Framework Preset: Create React App

Root Directory: frontend

Build Command: npm run build

Output Directory: build

Step 3: Add Environment Variables
In Vercel project settings → Environment Variables:

REACT_APP_API_URL=https://your-backend-url.onrender.com/api
Step 4: Redeploy
Click "Redeploy" to apply environment variables

Note your frontend URL: https://your-app.vercel.app

4. Environment Variables
Update Backend FRONTEND_URL
Go back to Render dashboard

Navigate to your backend service

Go to "Environment" tab

Update FRONTEND_URL to your Vercel URL

Save and redeploy

Complete Environment Variables
Backend:

MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_generated_secret_key_here
PORT=5000
FRONTEND_URL=https://your-app.vercel.app
NODE_ENV=production
Frontend:

REACT_APP_API_URL=https://your-backend.onrender.com/api
5. Testing
Test Backend
Visit your backend URL

Ensure server is running without errors

Test Frontend
Visit your frontend URL

Try signup

Try login

Create a post with text and/or image

Like and comment on posts

Refresh page and verify session persists