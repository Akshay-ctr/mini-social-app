# Mini Social Post Application

A full-stack social media application where users can create accounts, post text and images, view posts from others, like, and comment - inspired by the TaskPlanet app's Social Page.

## 🚀 Features

- **User Authentication**
  - Secure signup and login with email and password
  - JWT-based authentication
  - Protected routes and API endpoints

- **Post Creation**
  - Create posts with text, image URL, or both
  - Either text or image is required (not both mandatory)
  - Image preview before posting

- **Social Feed**
  - View all posts from all users in chronological order
  - Infinite scroll with pagination
  - Responsive and clean UI inspired by TaskPlanet

- **Interactions**
  - Like/unlike posts with instant UI updates
  - Add comments to any post
  - View list of users who liked or commented
  - Real-time count updates for likes and comments

- **User Experience**
  - Clean and modern Material-UI design
  - Responsive layout for all devices
  - Optimized performance with pagination
  - User-friendly error handling

## 🛠️ Tech Stack

### Frontend
- **React.js** - UI library
- **Material-UI (MUI)** - Component library and styling
- **React Router** - Client-side routing
- **Axios** - HTTP client
- **Context API** - State management

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM for MongoDB
- **JWT** - Authentication
- **bcryptjs** - Password hashing

## 📋 Prerequisites

Before running this project, make sure you have:

- Node.js (v14 or higher)
- MongoDB Atlas account (or local MongoDB)
- npm or yarn package manager

## 🔧 Installation & Setup

### 1. Clone the Repository

```bash
git clone <your-repo-url>
cd mini-social-app
```

### 2. Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file in the backend folder:

```env
MONGODB_URI=MONGODB_URI=your_mongodb_atlas_connection_string
JWT_SECRET=your_super_secret_jwt_key_change_in_production
PORT=5000
FRONTEND_URL=http://localhost:3000
```

Start the backend server:

```bash
npm start
# or for development with auto-reload
npm run dev
```

The backend will run on `http://localhost:5000`

### 3. Frontend Setup

```bash
cd frontend
npm install
```

Create a `.env` file in the frontend folder:

```env
REACT_APP_API_URL=http://localhost:5000/api
```

Start the frontend development server:

```bash
npm start
```

The frontend will run on `http://localhost:3000`

## 📁 Project Structure

```
mini-social-app/
├── backend/
│   ├── models/
│   │   ├── User.js          # User schema
│   │   └── Post.js          # Post schema with comments
│   ├── routes/
│   │   ├── auth.js          # Authentication routes
│   │   └── posts.js         # Post CRUD and interactions
│   ├── middleware/
│   │   └── auth.js          # JWT verification middleware
│   ├── server.js            # Express app configuration
│   ├── package.json
│   └── .env.example
│
├── frontend/
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── components/
│   │   │   ├── Header.js        # Navigation header
│   │   │   ├── Login.js         # Login form
│   │   │   ├── Signup.js        # Signup form
│   │   │   ├── Feed.js          # Main feed with pagination
│   │   │   ├── CreatePost.js    # Post creation form
│   │   │   ├── PostCard.js      # Individual post display
│   │   │   └── PrivateRoute.js  # Protected route wrapper
│   │   ├── context/
│   │   │   └── AuthContext.js   # Authentication state
│   │   ├── services/
│   │   │   └── api.js           # API service layer
│   │   ├── App.js               # Main app component
│   │   └── index.js             # Entry point
│   ├── package.json
│   └── .env.example
│
└── README.md
```

## 🗄️ Database Schema

### Users Collection

```javascript
{
  username: String (unique, required, 3-30 chars),
  email: String (unique, required, validated),
  password: String (hashed, required, min 6 chars),
  profileImage: String (default placeholder),
  createdAt: Date,
  updatedAt: Date
}
```

### Posts Collection

```javascript
{
  user: ObjectId (ref: User),
  username: String,
  content: String (max 1000 chars),
  image: String (URL),
  likes: [
    {
      user: ObjectId (ref: User),
      username: String
    }
  ],
  comments: [
    {
      user: ObjectId (ref: User),
      username: String,
      text: String (required, max 500 chars),
      createdAt: Date
    }
  ],
  createdAt: Date,
  updatedAt: Date
}
```

## 🔌 API Endpoints

### Authentication

- `POST /api/auth/signup` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (protected)

### Posts

- `GET /api/posts` - Get all posts (paginated)
- `GET /api/posts/:id` - Get single post
- `POST /api/posts` - Create new post (protected)
- `DELETE /api/posts/:id` - Delete post (protected, owner only)
- `POST /api/posts/:id/like` - Like/unlike post (protected)
- `POST /api/posts/:id/comment` - Add comment (protected)

## 🚀 Deployment

### Deploy Backend to Render

1. Create a new Web Service on Render
2. Connect your GitHub repository
3. Set build command: `cd backend && npm install`
4. Set start command: `cd backend && npm start`
5. Add environment variables from `.env.example`

### Deploy Frontend to Vercel/Netlify

**Vercel:**
```bash
cd frontend
vercel --prod
```

**Netlify:**
```bash
cd frontend
npm run build
# Deploy the build folder
```

Update `REACT_APP_API_URL` in frontend to your deployed backend URL.

### MongoDB Atlas Setup

1. Create a cluster on MongoDB Atlas
2. Create a database user
3. Whitelist your IP (or use 0.0.0.0/0 for development)
4. Get connection string and update `MONGODB_URI`

## ✨ Key Features Implementation

### Authentication Flow
- Password hashing with bcryptjs (10 salt rounds)
- JWT tokens with 7-day expiration
- Token stored in localStorage
- Protected routes with middleware

### Like System
- Toggle like/unlike with single click
- Optimistic UI updates
- Track usernames of users who liked

### Comment System
- Nested comments in post document
- Real-time comment count updates
- Display commenter username

### Pagination
- Load 10 posts per page
- "Load More" button for additional posts
- Efficient database queries with skip/limit

## 🎨 UI/UX Highlights

- Material-UI for consistent, professional design
- Responsive layout (mobile, tablet, desktop)
- Loading states and error handling
- Smooth transitions and interactions
- Clean, minimalist design inspired by TaskPlanet

## 🔒 Security Features

- Password hashing before storage
- JWT-based authentication
- Protected API routes
- Input validation and sanitization
- CORS configuration
- Environment variables for sensitive data

## 📝 Best Practices

- Clean, reusable component structure
- Separation of concerns (services, context, components)
- Error handling and user feedback
- Code comments for clarity
- Environment-based configuration
- Responsive design principles

## 🤝 Contributing

This is a learning project for the 3W Full Stack Internship assignment.

## 📄 License

This project is created for educational purposes.

## 👨‍💻 Author

Created as part of 3W Full Stack Internship Assignment - Round 1

## 📞 Support

For issues or questions, please create an issue in the GitHub repository.

---

**Note:** Make sure to update the `.env` files with your actual credentials before running the application. Never commit `.env` files to version control.
