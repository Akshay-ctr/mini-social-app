import React, { useState } from "react";
import {
  Paper,
  TextField,
  Button,
  Box,
  Avatar,
  IconButton,
  Alert,
} from "@mui/material";
import { PhotoCamera, Close } from "@mui/icons-material";
import { useAuth } from "../context/AuthContext";
import { postAPI } from "../services/api";

const CreatePost = ({ onPostCreated }) => {
  const { user } = useAuth();
  const [content, setContent] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [imagePreview, setImagePreview] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleImageUrlChange = (e) => {
    const url = e.target.value;
    setImageUrl(url);
    setImagePreview(url);
    setError("");
  };

  const handleRemoveImage = () => {
    setImageUrl("");
    setImagePreview("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // Validation
    if (!content.trim() && !imageUrl.trim()) {
      setError("Please add either text content or an image URL");
      return;
    }

    setLoading(true);

    try {
      const postData = {
        content: content.trim(),
        image: imageUrl.trim(),
      };

      await postAPI.createPost(postData);

      // Reset form
      setContent("");
      setImageUrl("");
      setImagePreview("");

      // Notify parent component
      if (onPostCreated) {
        onPostCreated();
      }
    } catch (err) {
      console.error("Error creating post:", err);
      setError(err.response?.data?.message || "Failed to create post");
    }

    setLoading(false);
  };

  return (
    <Paper elevation={2} sx={{ p: 2, mb: 3 }}>
      <Box sx={{ display: "flex", gap: 2 }}>
        <Avatar
          src={user?.profileImage}
          alt={user?.username}
          sx={{ width: 40, height: 40 }}
        >
          {user?.username?.[0]?.toUpperCase()}
        </Avatar>

        <Box sx={{ flex: 1 }}>
          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              multiline
              rows={3}
              placeholder={`What's on your mind, ${user?.username}?`}
              value={content}
              onChange={(e) => {
                setContent(e.target.value);
                setError("");
              }}
              variant="outlined"
              sx={{ mb: 2 }}
            />

            {error && (
              <Alert severity="error" sx={{ mb: 2 }}>
                {error}
              </Alert>
            )}

            {/* Image URL Input */}
            <Box sx={{ mb: 2 }}>
              <TextField
                fullWidth
                placeholder="Add image URL (optional)"
                value={imageUrl}
                onChange={handleImageUrlChange}
                variant="outlined"
                size="small"
                InputProps={{
                  startAdornment: (
                    <PhotoCamera sx={{ mr: 1, color: "action.active" }} />
                  ),
                }}
              />
            </Box>

            {/* Image Preview */}
            {imagePreview && (
              <Box
                sx={{
                  position: "relative",
                  mb: 2,
                  borderRadius: 2,
                  overflow: "hidden",
                }}
              >
                <img
                  src={imagePreview}
                  alt="Preview"
                  style={{
                    width: "100%",
                    maxHeight: "300px",
                    objectFit: "cover",
                  }}
                  onError={() => {
                    setError("Invalid image URL");
                    setImagePreview("");
                  }}
                />
                <IconButton
                  onClick={handleRemoveImage}
                  sx={{
                    position: "absolute",
                    top: 8,
                    right: 8,
                    bgcolor: "rgba(0, 0, 0, 0.5)",
                    color: "white",
                    "&:hover": {
                      bgcolor: "rgba(0, 0, 0, 0.7)",
                    },
                  }}
                  size="small"
                >
                  <Close />
                </IconButton>
              </Box>
            )}

            <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
              <Button
                type="submit"
                variant="contained"
                disabled={loading || (!content.trim() && !imageUrl.trim())}
                sx={{ minWidth: 100 }}
              >
                {loading ? "Posting..." : "Post"}
              </Button>
            </Box>
          </form>
        </Box>
      </Box>
    </Paper>
  );
};

export default CreatePost;
