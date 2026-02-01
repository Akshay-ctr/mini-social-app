import React, { useState } from 'react';
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  CardMedia,
  Avatar,
  IconButton,
  Typography,
  Box,
  Collapse,
  TextField,
  Button,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Divider
} from '@mui/material';
import {
  Favorite,
  FavoriteBorder,
  ChatBubbleOutline,
  Delete
} from '@mui/icons-material';
import { useAuth } from '../context/AuthContext';
import { postAPI } from '../services/api';

const PostCard = ({ post, onPostUpdated, onPostDeleted }) => {
  const { user } = useAuth();
  const [showComments, setShowComments] = useState(false);
  const [commentText, setCommentText] = useState('');
  const [localPost, setLocalPost] = useState(post);
  const [loading, setLoading] = useState(false);

  // Check if current user has liked the post
  const isLiked = localPost.likes?.some(
    (like) => like.user === user?.id || like.username === user?.username
  );

  const handleLike = async () => {
    try {
      const response = await postAPI.likePost(localPost._id);
      
      // Update local state optimistically
      setLocalPost((prev) => ({
        ...prev,
        likes: response.data.liked
          ? [...prev.likes, { user: user.id, username: user.username }]
          : prev.likes.filter((like) => like.user !== user.id)
      }));

      if (onPostUpdated) onPostUpdated();
    } catch (error) {
      console.error('Error liking post:', error);
    }
  };

  const handleComment = async () => {
    if (!commentText.trim()) return;

    setLoading(true);
    try {
      const response = await postAPI.addComment(localPost._id, {
        text: commentText
      });

      // Add new comment to local state
      setLocalPost((prev) => ({
        ...prev,
        comments: [...prev.comments, response.data.comment]
      }));

      setCommentText('');
      if (onPostUpdated) onPostUpdated();
    } catch (error) {
      console.error('Error adding comment:', error);
    }
    setLoading(false);
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      try {
        await postAPI.deletePost(localPost._id);
        if (onPostDeleted) onPostDeleted(localPost._id);
      } catch (error) {
        console.error('Error deleting post:', error);
      }
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInSeconds = Math.floor((now - date) / 1000);

    if (diffInSeconds < 60) return 'Just now';
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
    if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)}d ago`;
    
    return date.toLocaleDateString();
  };

  return (
    <Card sx={{ mb: 2 }}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: 'primary.main' }}>
            {localPost.username?.[0]?.toUpperCase()}
          </Avatar>
        }
        action={
          localPost.user === user?.id && (
            <IconButton onClick={handleDelete} color="error">
              <Delete />
            </IconButton>
          )
        }
        title={localPost.username}
        subheader={formatDate(localPost.createdAt)}
      />

      {localPost.content && (
        <CardContent sx={{ pt: 0 }}>
          <Typography variant="body1" color="text.primary">
            {localPost.content}
          </Typography>
        </CardContent>
      )}

      {localPost.image && (
        <CardMedia
          component="img"
          image={localPost.image}
          alt="Post image"
          sx={{ maxHeight: 500, objectFit: 'cover' }}
        />
      )}

      <CardActions disableSpacing sx={{ px: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
          <IconButton onClick={handleLike} color={isLiked ? 'error' : 'default'}>
            {isLiked ? <Favorite /> : <FavoriteBorder />}
          </IconButton>
          <Typography variant="body2" color="text.secondary">
            {localPost.likes?.length || 0}
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, ml: 2 }}>
          <IconButton onClick={() => setShowComments(!showComments)}>
            <ChatBubbleOutline />
          </IconButton>
          <Typography variant="body2" color="text.secondary">
            {localPost.comments?.length || 0}
          </Typography>
        </Box>
      </CardActions>

      <Collapse in={showComments} timeout="auto" unmountOnExit>
        <Divider />
        <CardContent>
          {/* Comments List */}
          {localPost.comments && localPost.comments.length > 0 && (
            <List sx={{ mb: 2 }}>
              {localPost.comments.map((comment, index) => (
                <ListItem key={index} alignItems="flex-start" sx={{ px: 0 }}>
                  <ListItemAvatar>
                    <Avatar sx={{ width: 32, height: 32, bgcolor: 'secondary.main' }}>
                      {comment.username?.[0]?.toUpperCase()}
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={
                      <Typography variant="subtitle2" fontWeight="bold">
                        {comment.username}
                      </Typography>
                    }
                    secondary={
                      <Typography variant="body2" color="text.primary">
                        {comment.text}
                      </Typography>
                    }
                  />
                </ListItem>
              ))}
            </List>
          )}

          {/* Add Comment */}
          <Box sx={{ display: 'flex', gap: 1, alignItems: 'flex-start' }}>
            <Avatar sx={{ width: 32, height: 32 }}>
              {user?.username?.[0]?.toUpperCase()}
            </Avatar>
            <TextField
              fullWidth
              size="small"
              placeholder="Write a comment..."
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              multiline
              maxRows={3}
            />
            <Button
              variant="contained"
              size="small"
              onClick={handleComment}
              disabled={!commentText.trim() || loading}
              sx={{ minWidth: 70 }}
            >
              Post
            </Button>
          </Box>
        </CardContent>
      </Collapse>
    </Card>
  );
};

export default PostCard;
