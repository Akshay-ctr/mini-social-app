# API Documentation

Complete REST API documentation for Mini Social App backend.

**Base URL**: `http://localhost:5000/api` (Development)
**Base URL**: `https://your-app.onrender.com/api` (Production)

---

## Table of Contents
1. [Authentication](#authentication)
2. [Posts](#posts)
3. [Error Responses](#error-responses)
4. [Rate Limiting](#rate-limiting)

---

## Authentication

All authenticated endpoints require a JWT token in the Authorization header:
```
Authorization: Bearer <your-jwt-token>
```

### Register User

Create a new user account.

**Endpoint**: `POST /auth/signup`

**Authentication**: Not required

**Request Body**:
```json
{
  "username": "johndoe",
  "email": "john@example.com",
  "password": "password123"
}
```

**Validation Rules**:
- `username`: Required, 3-30 characters, unique, alphanumeric
- `email`: Required, valid email format, unique
- `password`: Required, minimum 6 characters

**Success Response (201)**:
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

**Error Responses**:
- `400` - Missing required fields
- `400` - Email already registered
- `400` - Username already taken
- `500` - Server error

---

### Login User

Authenticate and get JWT token.

**Endpoint**: `POST /auth/login`

**Authentication**: Not required

**Request Body**:
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

**Success Response (200)**:
```json
{
  "success": true,
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "username": "johndoe",
    "email": "john@example.com",
    "profileImage": "https://via.placeholder.com/150"
  }
}
```

**Error Responses**:
- `400` - Missing email or password
- `401` - Invalid email or password
- `500` - Server error

---

### Get Current User

Get authenticated user's profile.

**Endpoint**: `GET /auth/me`

**Authentication**: Required

**Headers**:
```
Authorization: Bearer <token>
```

**Success Response (200)**:
```json
{
  "success": true,
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "username": "johndoe",
    "email": "john@example.com",
    "profileImage": "https://via.placeholder.com/150",
    "createdAt": "2024-01-31T10:00:00.000Z"
  }
}
```

**Error Responses**:
- `401` - No token provided
- `401` - Invalid token
- `401` - Token expired
- `500` - Server error

---

## Posts

### Create Post

Create a new post with text and/or image.

**Endpoint**: `POST /posts`

**Authentication**: Required

**Headers**:
```
Authorization: Bearer <token>
```

**Request Body**:
```json
{
  "content": "Just finished an amazing coding session!",
  "image": "https://example.com/image.jpg"
}
```

**Validation Rules**:
- At least one field required (`content` OR `image`)
- `content`: Optional, max 1000 characters
- `image`: Optional, valid URL

**Success Response (201)**:
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
    "createdAt": "2024-01-31T10:30:00.000Z",
    "updatedAt": "2024-01-31T10:30:00.000Z"
  }
}
```

**Error Responses**:
- `400` - Missing both content and image
- `401` - Unauthorized
- `500` - Server error

---

### Get All Posts

Retrieve all posts with pagination.

**Endpoint**: `GET /posts`

**Authentication**: Not required (Public)

**Query Parameters**:
- `page`: Page number (default: 1)
- `limit`: Posts per page (default: 10, max: 50)

**Example**: `GET /posts?page=1&limit=10`

**Success Response (200)**:
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
            "username": "janedoe",
            "profileImage": "https://via.placeholder.com/150"
          },
          "username": "janedoe",
          "text": "Great job!",
          "createdAt": "2024-01-31T10:35:00.000Z"
        }
      ],
      "createdAt": "2024-01-31T10:30:00.000Z",
      "updatedAt": "2024-01-31T10:35:00.000Z"
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

**Error Responses**:
- `500` - Server error

---

### Get Single Post

Retrieve a specific post by ID.

**Endpoint**: `GET /posts/:id`

**Authentication**: Not required (Public)

**URL Parameters**:
- `id`: Post ID (MongoDB ObjectId)

**Example**: `GET /posts/507f1f77bcf86cd799439011`

**Success Response (200)**:
```json
{
  "success": true,
  "post": {
    "_id": "507f1f77bcf86cd799439011",
    "user": {
      "_id": "507f1f77bcf86cd799439012",
      "username": "johndoe",
      "profileImage": "https://via.placeholder.com/150"
    },
    "username": "johndoe",
    "content": "Just finished an amazing coding session!",
    "image": "https://example.com/image.jpg",
    "likes": [],
    "comments": [],
    "createdAt": "2024-01-31T10:30:00.000Z"
  }
}
```

**Error Responses**:
- `404` - Post not found
- `500` - Server error

---

### Like/Unlike Post

Toggle like status on a post.

**Endpoint**: `POST /posts/:id/like`

**Authentication**: Required

**Headers**:
```
Authorization: Bearer <token>
```

**URL Parameters**:
- `id`: Post ID

**Request Body**: None

**Success Response (200)**:

**When Liking**:
```json
{
  "success": true,
  "message": "Post liked",
  "liked": true,
  "likesCount": 5
}
```

**When Unliking**:
```json
{
  "success": true,
  "message": "Post unliked",
  "liked": false,
  "likesCount": 4
}
```

**Error Responses**:
- `401` - Unauthorized
- `404` - Post not found
- `500` - Server error

**Behavior**:
- If user hasn't liked: Adds like
- If user has liked: Removes like
- Stores user ID and username
- Prevents duplicate likes

---

### Add Comment

Add a comment to a post.

**Endpoint**: `POST /posts/:id/comment`

**Authentication**: Required

**Headers**:
```
Authorization: Bearer <token>
```

**URL Parameters**:
- `id`: Post ID

**Request Body**:
```json
{
  "text": "This is an awesome post!"
}
```

**Validation Rules**:
- `text`: Required, max 500 characters, cannot be empty

**Success Response (201)**:
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

**Error Responses**:
- `400` - Comment text is required
- `401` - Unauthorized
- `404` - Post not found
- `500` - Server error

---

### Delete Post

Delete a post (owner only).

**Endpoint**: `DELETE /posts/:id`

**Authentication**: Required (Owner only)

**Headers**:
```
Authorization: Bearer <token>
```

**URL Parameters**:
- `id`: Post ID

**Success Response (200)**:
```json
{
  "success": true,
  "message": "Post deleted successfully"
}
```

**Error Responses**:
- `401` - Unauthorized
- `403` - Forbidden (not post owner)
- `404` - Post not found
- `500` - Server error

---

## Error Responses

All error responses follow this format:

```json
{
  "success": false,
  "message": "Error description"
}
```

### HTTP Status Codes

- `200` - Success
- `201` - Created successfully
- `400` - Bad request (validation error)
- `401` - Unauthorized (authentication required)
- `403` - Forbidden (insufficient permissions)
- `404` - Resource not found
- `500` - Internal server error

### Common Error Messages

**Authentication Errors**:
```json
{
  "success": false,
  "message": "No authentication token, access denied"
}
```

```json
{
  "success": false,
  "message": "Invalid token"
}
```

```json
{
  "success": false,
  "message": "Token has expired"
}
```

**Validation Errors**:
```json
{
  "success": false,
  "message": "Please provide username, email, and password"
}
```

```json
{
  "success": false,
  "message": "Email already registered"
}
```

**Not Found Errors**:
```json
{
  "success": false,
  "message": "Post not found"
}
```

---

## Rate Limiting

Currently no rate limiting implemented. For production, consider:

- 100 requests per 15 minutes per IP
- 20 login attempts per hour
- 50 post creations per day per user

**Recommended Implementation**:
```javascript
const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100
});

app.use('/api/', limiter);
```

---

## Testing the API

### Using cURL

**Signup**:
```bash
curl -X POST http://localhost:5000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{"username":"johndoe","email":"john@example.com","password":"password123"}'
```

**Login**:
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"john@example.com","password":"password123"}'
```

**Create Post**:
```bash
curl -X POST http://localhost:5000/api/posts \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{"content":"Hello World!","image":"https://example.com/image.jpg"}'
```

**Get Posts**:
```bash
curl http://localhost:5000/api/posts?page=1&limit=10
```

**Like Post**:
```bash
curl -X POST http://localhost:5000/api/posts/POST_ID/like \
  -H "Authorization: Bearer YOUR_TOKEN"
```

### Using Postman

1. Import the API collection
2. Set environment variables:
   - `BASE_URL`: http://localhost:5000/api
   - `TOKEN`: (will be set after login)
3. Test each endpoint

---

## WebSocket Support (Future Enhancement)

For real-time features, consider implementing:
- Real-time post updates
- Live like counts
- Instant comment notifications
- Online user status

**Suggested Technology**: Socket.io

---

## GraphQL Alternative (Future Enhancement)

Consider GraphQL for more flexible queries:
```graphql
query {
  posts(page: 1, limit: 10) {
    id
    content
    user {
      username
      profileImage
    }
    likes {
      username
    }
    comments {
      text
      user {
        username
      }
    }
  }
}
```

---

For questions or issues, please refer to the main README.md or create an issue in the repository.
