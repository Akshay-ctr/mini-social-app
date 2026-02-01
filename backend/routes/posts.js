const express = require('express');
const router = express.Router();
const Post = require('../models/Post');
const authMiddleware = require('../middleware/auth');

/**
 * @route   POST /api/posts
 * @desc    Create a new post
 * @access  Private
 */
router.post('/', authMiddleware, async (req, res) => {
  try {
    const { content, image } = req.body;

    // Validation: at least one field required
    if (!content && !image) {
      return res.status(400).json({ 
        success: false, 
        message: 'Post must contain either text content or an image' 
      });
    }

    // Create new post
    const post = new Post({
      user: req.user._id,
      username: req.user.username,
      content,
      image
    });

    await post.save();

    res.status(201).json({
      success: true,
      message: 'Post created successfully',
      post
    });
  } catch (error) {
    console.error('Create post error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Server error while creating post',
      error: error.message 
    });
  }
});

/**
 * @route   GET /api/posts
 * @desc    Get all posts (public feed with pagination)
 * @access  Public
 */
router.get('/', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    // Get total count for pagination
    const totalPosts = await Post.countDocuments();

    // Fetch posts with pagination, sorted by newest first
    const posts = await Post.find()
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .populate('user', 'username profileImage')
      .populate('comments.user', 'username profileImage');

    res.json({
      success: true,
      posts,
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(totalPosts / limit),
        totalPosts,
        hasMore: skip + posts.length < totalPosts
      }
    });
  } catch (error) {
    console.error('Get posts error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Server error while fetching posts',
      error: error.message 
    });
  }
});

/**
 * @route   GET /api/posts/:id
 * @desc    Get single post by ID
 * @access  Public
 */
router.get('/:id', async (req, res) => {
  try {
    const post = await Post.findById(req.params.id)
      .populate('user', 'username profileImage')
      .populate('comments.user', 'username profileImage');

    if (!post) {
      return res.status(404).json({ 
        success: false, 
        message: 'Post not found' 
      });
    }

    res.json({
      success: true,
      post
    });
  } catch (error) {
    console.error('Get post error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Server error while fetching post',
      error: error.message 
    });
  }
});

/**
 * @route   POST /api/posts/:id/like
 * @desc    Like/Unlike a post
 * @access  Private
 */
router.post('/:id/like', authMiddleware, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ 
        success: false, 
        message: 'Post not found' 
      });
    }

    // Check if user already liked the post
    const likeIndex = post.likes.findIndex(
      like => like.user.toString() === req.user._id.toString()
    );

    if (likeIndex > -1) {
      // Unlike: remove like
      post.likes.splice(likeIndex, 1);
      await post.save();

      return res.json({
        success: true,
        message: 'Post unliked',
        liked: false,
        likesCount: post.likes.length
      });
    } else {
      // Like: add like
      post.likes.push({
        user: req.user._id,
        username: req.user.username
      });
      await post.save();

      return res.json({
        success: true,
        message: 'Post liked',
        liked: true,
        likesCount: post.likes.length
      });
    }
  } catch (error) {
    console.error('Like post error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Server error while liking post',
      error: error.message 
    });
  }
});

/**
 * @route   POST /api/posts/:id/comment
 * @desc    Add a comment to a post
 * @access  Private
 */
router.post('/:id/comment', authMiddleware, async (req, res) => {
  try {
    const { text } = req.body;

    if (!text || text.trim() === '') {
      return res.status(400).json({ 
        success: false, 
        message: 'Comment text is required' 
      });
    }

    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ 
        success: false, 
        message: 'Post not found' 
      });
    }

    // Add comment
    post.comments.push({
      user: req.user._id,
      username: req.user.username,
      text: text.trim()
    });

    await post.save();

    // Populate the newly added comment
    await post.populate('comments.user', 'username profileImage');

    res.status(201).json({
      success: true,
      message: 'Comment added successfully',
      comment: post.comments[post.comments.length - 1],
      commentsCount: post.comments.length
    });
  } catch (error) {
    console.error('Add comment error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Server error while adding comment',
      error: error.message 
    });
  }
});

/**
 * @route   DELETE /api/posts/:id
 * @desc    Delete a post (only by post owner)
 * @access  Private
 */
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ 
        success: false, 
        message: 'Post not found' 
      });
    }

    // Check if user is the post owner
    if (post.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ 
        success: false, 
        message: 'You can only delete your own posts' 
      });
    }

    await Post.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: 'Post deleted successfully'
    });
  } catch (error) {
    console.error('Delete post error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Server error while deleting post',
      error: error.message 
    });
  }
});

module.exports = router;
