# 🚀 Quick Start Guide – Mini Social App

Follow these steps to run the application on your local machine.

---

## 📋 Prerequisites

Make sure you have the following installed:

- **Node.js** (v14 or higher)  
  Check with:
  ```bash
  node --version
Download: https://nodejs.org/

MongoDB Atlas account (Free Tier)
Sign up: https://www.mongodb.com/cloud/atlas

VS Code or any code editor

📁 Project Structure
mini-social-app/
├── backend/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── server.js
│   ├── package.json
│   └── .env.example
│
├── frontend/
│   ├── public/
│   ├── src/
│   ├── package.json
│   └── .env.example
│
└── README.md
⚙️ Step 1: MongoDB Atlas Setup (5 minutes)
Go to https://www.mongodb.com/cloud/atlas

Create a FREE (M0) cluster

Create a Database User

Username: your choice

Password: your choice (letters & numbers recommended)

Role: Read and write to any database

Go to Network Access

Click Add IP Address

Choose Allow access from anywhere (0.0.0.0/0)

Get your connection string:

Database → Connect → Drivers → Node.js

Copy the connection string

Example format (DO NOT copy directly):

mongodb+srv://<db_user>:<db_password>@<cluster>.mongodb.net/mini-social-app
⚙️ Step 2: Backend Setup
1. Open terminal in project root
cd backend
2. Install dependencies
npm install
3. Create .env file in backend/
MONGODB_URI=<your-mongodb-atlas-connection-string>
JWT_SECRET=<your-jwt-secret>
PORT=5000
FRONTEND_URL=http://localhost:3000
Notes:

Replace <your-mongodb-atlas-connection-string> with your actual MongoDB URI

Replace <your-jwt-secret> with any long random string

Never commit .env files to GitHub

4. Start backend server
npm start
You should see:

Server running on port 5000
Connected to MongoDB
Keep this terminal running.

⚙️ Step 3: Frontend Setup
Open a new terminal:

cd frontend
npm install
Create .env file in frontend/
REACT_APP_API_URL=http://localhost:5000/api
Start frontend
npm start
Frontend runs at:

http://localhost:3000
🎉 Test the Application
Sign Up

Username, email, password

Create a Post

Text or image (either one required)

Test Features

Like posts

Add comments

Load more posts (pagination)

🛑 Stop the App
Press Ctrl + C in both terminals.

🐛 Troubleshooting
MongoDB connection error
Check MongoDB URI in .env

Ensure IP 0.0.0.0/0 is added in Atlas

Verify database username & password

Port already in use
Change port in backend .env:

PORT=5001
Blank frontend page
Make sure backend is running

Check browser console (F12)

Verify API URL

✅ Final Checklist
 MongoDB Atlas configured

 Backend running without errors

 Frontend running

 Signup & login working

 Posts, likes, comments working

📚 References
Full documentation: README.md

Deployment guide: DEPLOYMENT.md

Happy Coding 🚀


---

### ✅ What to do now
If this file is tracked by Git:

```bash
git add SETUP_GUIDE.md
git commit -m "Add clean quick start setup guide"
git push origin main