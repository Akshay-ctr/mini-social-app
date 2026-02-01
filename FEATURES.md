# Features Documentation

Detailed documentation of all features implemented in Mini Social App.

## Table of Contents
1. [User Authentication](#user-authentication)
2. [Post Creation](#post-creation)
3. [Social Feed](#social-feed)
4. [Like System](#like-system)
5. [Comment System](#comment-system)
6. [Pagination](#pagination)
7. [UI/UX Features](#uiux-features)

---

## User Authentication

### Signup
**Endpoint**: `POST /api/auth/signup`

**Features**:
- Username validation (3-30 characters, unique)
- Email validation (valid format, unique)
- Password hashing with bcryptjs (10 salt rounds)
- Minimum password length: 6 characters
- Auto-login after successful signup
- JWT token generation (7-day expiration)

**Frontend**:
- Real-time validation
- Password visibility toggle
- Password confirmation field
- Error messages for duplicate username/email
- Redirect to feed after successful signup

**Request Body**:
```json
{
  "username": "johndoe",
  "email": "john@example.com",
  "password": "password123"
}
```

**Response**:
```json
{
  "success": true,
  "message": "User registered successfully",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "username": "johndoe",
    "email": "john@example.com",
    "profileImage": "https://via.placeholder.com/150"
  }
}
```

### Login
**Endpoint**: `POST /api/auth/login`

**Features**:
- Email and password authentication
- Password comparison with bcrypt
- JWT token generation
- User data retrieval
- Token stored in localStorage

**Frontend**:
- Auto-fill support
- Remember credentials (browser default)
- Password visibility toggle
- Clear error messages
- Redirect to feed after successful login

**Request Body**:
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

### Logout
**Frontend Only**:
- Clear JWT token from localStorage
- Clear user data from context
- Redirect to login page
- Clean session state

### Protected Routes
**Middleware**: `authMiddleware`

**Features**:
- Verify JWT token from Authorization header
- Decode user ID from token
- Fetch user data from database
- Attach user object to request
- Handle expired tokens
- Handle invalid tokens

**Usage**:
```javascript
router.post('/posts', authMiddleware, createPost);
```

---

## Post Creation

### Create Post
**Endpoint**: `POST /api/posts`
**Authentication**: Required

**Features**:
- Text content (optional, max 1000 characters)
- Image URL (optional)
- At least one field required (text OR image)
- Auto-fill username from authenticated user
- Timestamp creation

**Frontend**:
- Multiline text input
- Image URL input with icon
- Live image preview
- Remove image option
- Validation before submit
- Loading state during creation
- Auto-refresh feed after post

**Request Body**:
```json
{
  "content": "Just finished an amazing coding session!",
  "image": "https://example.com/image.jpg"
}
```

**Response**:
```json
{
  "success": true,
  "message": "Post created successfully",
  "post": {
    "_id": "507f1f77bcf86cd799439011",
    "user": "507f1f77bcf86cd799439012",
    "username": "johndoe",
    "content": "Just finished an amazing coding session!",
    "image": "https://example.com/image.jpg",
    "likes": [],
    "comments": [],
    "createdAt": "2024-01-31T10:30:00.000Z"
  }
}
```

### Delete Post
**Endpoint**: `DELETE /api/posts/:id`
**Authentication**: Required (Owner only)

**Features**:
- Only post owner can delete
- Confirmation dialog
- Remove from database
- Update UI instantly

---

## Social Feed

### Get All Posts
**Endpoint**: `GET /api/posts?page=1&limit=10`
**Authentication**: Not required (public)

**Features**:
- Paginated results
- Sorted by newest first
- Populated user details
- Populated comment user details
- Total count and pagination metadata

**Query Parameters**:
- `page`: Page number (default: 1)
- `limit`: Posts per page (default: 10)

**Response**:
```json
{
  "success": true,
  "posts": [
    {
      "_id": "507f1f77bcf86cd799439011",
      "user": {
        "_id": "507f1f77bcf86cd799439012",
        "username": "johndoe",
        "profileImage": "https://via.placeholder.com/150"
      },
      "username": "johndoe",
      "content": "Just finished an amazing coding session!",
      "image": "https://example.com/image.jpg",
      "likes": [
        {
          "user": "507f1f77bcf86cd799439013",
          "username": "janedoe"
        }
      ],
      "comments": [
        {
          "_id": "507f1f77bcf86cd799439014",
          "user": {
            "_id": "507f1f77bcf86cd799439013",
            "username": "janedoe"
          },
          "username": "janedoe",
          "text": "Great job!",
          "createdAt": "2024-01-31T10:35:00.000Z"
        }
      ],
      "createdAt": "2024-01-31T10:30:00.000Z"
    }
  ],
  "pagination": {
    "currentPage": 1,
    "totalPages": 5,
    "totalPosts": 50,
    "hasMore": true
  }
}
```

### Frontend Feed Features
- Infinite scroll with "Load More" button
- Refresh button to reload feed
- Empty state when no posts
- Loading skeleton/spinner
- Auto-refresh after creating post
- Relative timestamps (e.g., "2h ago", "Just now")

---

## Like System

### Like/Unlike Post
**Endpoint**: `POST /api/posts/:id/like`
**Authentication**: Required

**Features**:
- Toggle like status (like if not liked, unlike if already liked)
- Store user ID and username
- Prevent duplicate likes
- Return updated like count
- Return like status (liked/unliked)

**Request**: No body required

**Response**:
```json
{
  "success": true,
  "message": "Post liked",
  "liked": true,
  "likesCount": 5
}
```

### Frontend Like Features
- Heart icon (filled when liked, outline when not)
- Red color when liked
- Instant UI update (optimistic update)
- Display like count
- Click to toggle
- No double-like protection

**Implementation**:
```javascript
// Check if user liked the post
const isLiked = post.likes?.some(
  like => like.user === user?.id
);

// Optimistic update
handleLike = async () => {
  // Update UI first
  setLocalPost(prev => ({
    ...prev,
    likes: isLiked 
      ? prev.likes.filter(like => like.user !== user.id)
      : [...prev.likes, { user: user.id, username: user.username }]
  }));
  
  // Then update backend
  await postAPI.likePost(postId);
};
```

---

## Comment System

### Add Comment
**Endpoint**: `POST /api/posts/:id/comment`
**Authentication**: Required

**Features**:
- Add comment to specific post
- Store user ID and username
- Timestamp creation
- Maximum 500 characters
- Return updated comment count

**Request Body**:
```json
{
  "text": "This is an awesome post!"
}
```

**Response**:
```json
{
  "success": true,
  "message": "Comment added successfully",
  "comment": {
    "_id": "507f1f77bcf86cd799439014",
    "user": {
      "_id": "507f1f77bcf86cd799439013",
      "username": "janedoe",
      "profileImage": "https://via.placeholder.com/150"
    },
    "username": "janedoe",
    "text": "This is an awesome post!",
    "createdAt": "2024-01-31T10:35:00.000Z"
  },
  "commentsCount": 3
}
```

### Frontend Comment Features
- Expandable comment section
- Click comment icon to toggle
- Display all comments with user avatars
- Add new comment with text input
- Submit button
- Clear input after posting
- Display comment count
- Loading state while posting

**Comment Display**:
- User avatar
- Username in bold
- Comment text
- List format for multiple comments

---

## Pagination

### Backend Pagination
**Implementation**:
```javascript
const page = parseInt(req.query.page) || 1;
const limit = parseInt(req.query.limit) || 10;
const skip = (page - 1) * limit;

const totalPosts = await Post.countDocuments();
const posts = await Post.find()
  .sort({ createdAt: -1 })
  .skip(skip)
  .limit(limit);

const pagination = {
  currentPage: page,
  totalPages: Math.ceil(totalPosts / limit),
  totalPosts,
  hasMore: skip + posts.length < totalPosts
};
```

### Frontend Pagination
- Load 10 posts initially
- "Load More" button at bottom
- Append new posts to existing list
- Disable button while loading
- Hide button when no more posts
- "You've reached the end" message

**Optimization**:
- Only fetch new data when needed
- Cache already loaded posts
- Efficient database queries with indexes

---

## UI/UX Features

### Design System
**Material-UI Theme**:
```javascript
{
  palette: {
    primary: { main: '#1976d2' },
    secondary: { main: '#dc004e' },
    background: { default: '#f5f5f5' }
  }
}
```

### Responsive Design
- Mobile-first approach
- Breakpoints for all screen sizes
- Touch-friendly buttons
- Optimized images
- Flexible layouts

### User Feedback
- Loading spinners during API calls
- Success messages
- Error alerts with clear messages
- Disabled states for buttons
- Form validation feedback

### Navigation
- Sticky header with app name
- User avatar in header
- Logout from dropdown menu
- Home icon to return to feed
- Auto-redirect when not logged in

### Accessibility
- Semantic HTML
- ARIA labels where needed
- Keyboard navigation support
- Color contrast compliance
- Alt text for images

### Performance
- Optimized re-renders
- Lazy loading images
- Efficient state management
- Debounced search (if implemented)
- Memoized components

### Time Display
Smart relative time formatting:
- "Just now" - less than 1 minute
- "5m ago" - less than 1 hour
- "2h ago" - less than 24 hours
- "3d ago" - less than 7 days
- Full date - older than 7 days

### Error Handling
- Network error recovery
- Invalid token handling
- Form validation errors
- Image loading errors
- 404 page for invalid routes

---

## Security Features

### Password Security
- bcryptjs hashing (10 rounds)
- Never store plain text
- Never return password in API responses

### JWT Security
- Secure secret key
- 7-day expiration
- HTTP-only recommended for production
- Signed with HS256 algorithm

### Input Validation
- Email format validation
- Username length/format validation
- Content length limits
- XSS prevention (React auto-escapes)

### CORS Configuration
```javascript
app.use(cors({
  origin: process.env.FRONTEND_URL,
  credentials: true
}));
```

### Route Protection
- JWT verification middleware
- Owner-only delete operations
- Public read, authenticated write

---

## Best Practices Implemented

1. **Code Organization**
   - Separate concerns (models, routes, controllers)
   - Reusable components
   - Centralized API service
   - Context for global state

2. **Error Handling**
   - Try-catch blocks
   - Meaningful error messages
   - Status codes
   - Error boundaries (React)

3. **Code Quality**
   - Consistent naming conventions
   - Comments where needed
   - Clean, readable code
   - No console.logs in production

4. **Performance**
   - Database indexing
   - Efficient queries
   - Optimistic UI updates
   - Minimal re-renders

5. **User Experience**
   - Fast load times
   - Instant feedback
   - Smooth transitions
   - Clear navigation

---

This documentation covers all major features implemented in the Mini Social App. For implementation details, refer to the source code.
