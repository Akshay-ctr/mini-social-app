# Contributing to Mini Social App

Thank you for your interest in contributing to this project! This guide will help you get started.

## 🎯 Project Overview

This is a full-stack social media application built for the 3W Full Stack Internship Assignment. It demonstrates:
- User authentication and authorization
- CRUD operations with MongoDB
- Real-time UI updates
- RESTful API design
- Modern React patterns

## 🛠️ Development Setup

### Prerequisites
- Node.js v14+ and npm
- MongoDB (local or Atlas)
- Git
- Code editor (VS Code recommended)

### Local Setup
1. Fork and clone the repository
2. Install dependencies:
```bash
# Backend
cd backend
npm install

# Frontend
cd frontend
npm install
```

3. Set up environment variables (see `.env.example` files)
4. Start development servers:
```bash
# Backend (Terminal 1)
cd backend
npm run dev

# Frontend (Terminal 2)
cd frontend
npm start
```

## 📝 Code Style Guidelines

### JavaScript/React
- Use ES6+ syntax
- Functional components with hooks
- Meaningful variable names
- Add comments for complex logic
- Follow existing code structure

### Example:
```javascript
// Good
const handlePostCreation = async (postData) => {
  try {
    const response = await postAPI.createPost(postData);
    return response.data;
  } catch (error) {
    console.error('Error creating post:', error);
    throw error;
  }
};

// Avoid
const a = async (d) => {
  return await postAPI.createPost(d);
};
```

### File Organization
```
backend/
├── models/      # Database schemas
├── routes/      # API endpoints
├── middleware/  # Express middleware
└── server.js    # Main entry point

frontend/
├── components/  # React components
├── context/     # Context providers
├── services/    # API services
└── App.js       # Main app component
```

## 🔄 Git Workflow

### Branching Strategy
- `main` - Production-ready code
- `develop` - Development branch
- `feature/feature-name` - New features
- `fix/bug-description` - Bug fixes

### Commit Messages
Follow conventional commits:
```
feat: Add user profile page
fix: Resolve login authentication bug
docs: Update API documentation
style: Format code with prettier
refactor: Simplify post creation logic
test: Add unit tests for auth
```

### Pull Request Process
1. Create a feature branch from `develop`
2. Make your changes
3. Test thoroughly
4. Update documentation if needed
5. Submit PR with clear description
6. Wait for review

## ✅ Testing Guidelines

### Manual Testing Checklist
Before submitting PR, test:
- [ ] Signup with new user
- [ ] Login with existing user
- [ ] Create post (text only)
- [ ] Create post (image only)
- [ ] Create post (both)
- [ ] Like/unlike posts
- [ ] Add comments
- [ ] Delete own posts
- [ ] Load more posts (pagination)
- [ ] Logout

### Future: Automated Tests
When implementing tests, use:
- **Backend**: Jest + Supertest
- **Frontend**: Jest + React Testing Library

## 🐛 Bug Reports

When reporting bugs, include:
1. Description of the issue
2. Steps to reproduce
3. Expected behavior
4. Actual behavior
5. Screenshots (if applicable)
6. Environment (OS, browser, Node version)

**Example**:
```markdown
## Bug: Like count not updating

**Steps to reproduce:**
1. Login as user A
2. Like a post
3. Refresh page

**Expected:** Like count increases by 1
**Actual:** Like count stays the same
**Browser:** Chrome 120
**Environment:** Development
```

## 💡 Feature Requests

When suggesting features, provide:
1. Clear description
2. Use case/benefit
3. Implementation ideas (optional)
4. Mockups/sketches (optional)

**Example**:
```markdown
## Feature: Dark Mode

**Description:** Add dark mode toggle to settings

**Use Case:** Better UX for night-time users

**Implementation:** 
- Add theme context
- Create dark theme palette
- Add toggle button in header
- Save preference in localStorage
```

## 🚀 Adding New Features

### Backend Feature
1. Define schema in `models/` (if needed)
2. Create routes in `routes/`
3. Add middleware (if needed)
4. Update API documentation
5. Test endpoints

### Frontend Feature
1. Create component in `components/`
2. Add route (if needed)
3. Connect to API service
4. Update UI accordingly
5. Test user flow

### Example: Adding User Profile
```javascript
// 1. Backend - models/User.js (add fields)
bio: { type: String, maxlength: 200 }

// 2. Backend - routes/users.js (new file)
router.get('/:username', getUserProfile);
router.put('/profile', authMiddleware, updateProfile);

// 3. Frontend - components/Profile.js
const Profile = () => {
  // Fetch and display user data
};

// 4. Frontend - App.js
<Route path="/profile/:username" element={<Profile />} />
```

## 📚 Documentation

When adding features, update:
- `README.md` - User-facing changes
- `API.md` - New endpoints
- `FEATURES.md` - Feature descriptions
- Code comments - Complex logic

## 🎨 UI/UX Guidelines

### Design Principles
- Keep it simple and clean
- Maintain consistency
- Provide clear feedback
- Optimize for mobile
- Follow Material Design

### Component Standards
```javascript
// Always show loading state
{loading && <CircularProgress />}

// Always handle errors
{error && <Alert severity="error">{error}</Alert>}

// Always provide feedback
<Snackbar message="Post created!" />
```

## 🔒 Security Best Practices

When contributing:
- Never commit `.env` files
- Never expose API keys
- Sanitize user input
- Use parameterized queries
- Validate on both client and server
- Hash passwords properly
- Use HTTPS in production

## 📦 Dependencies

Before adding new dependencies:
1. Check if existing package can solve it
2. Verify it's actively maintained
3. Check bundle size impact
4. Discuss in issue first

### Allowed Libraries
- **Backend**: express, mongoose, jsonwebtoken, bcryptjs
- **Frontend**: Material-UI, axios, react-router-dom
- **Styling**: Material-UI ONLY (no TailwindCSS)

## 🎓 Learning Resources

If you're new to:
- **React**: [Official Docs](https://react.dev)
- **Node.js**: [Node.js Docs](https://nodejs.org/docs)
- **MongoDB**: [MongoDB University](https://university.mongodb.com)
- **Material-UI**: [MUI Docs](https://mui.com)

## 🤝 Code Review Process

### As a Reviewer
- Be constructive and respectful
- Explain the "why" behind suggestions
- Approve if changes are good enough
- Request changes for critical issues

### As a Contributor
- Respond to all comments
- Ask questions if unclear
- Make requested changes
- Thank reviewers

## 📞 Getting Help

- **Questions**: Open a discussion
- **Bugs**: Create an issue
- **Features**: Create feature request
- **Security**: Email privately

## 🏆 Recognition

Contributors will be:
- Listed in CONTRIBUTORS.md
- Mentioned in release notes
- Given credit in documentation

## 📄 License

By contributing, you agree that your contributions will be licensed under the same license as the project.

## ✨ First-Time Contributors

Welcome! Here's how to start:
1. Look for issues labeled "good first issue"
2. Comment on the issue to claim it
3. Fork the repository
4. Make your changes
5. Submit a pull request
6. We'll guide you through the process!

## 🎉 Thank You!

Every contribution makes this project better. Whether it's:
- Fixing a typo
- Adding a feature
- Improving documentation
- Reporting a bug

You're making a difference. Thank you! 🙏

---

**Happy Coding!** 💻

For questions, contact the maintainers or open an issue.
