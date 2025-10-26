const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController');
const { protect } = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadMiddleware');

// POST /api/posts - Create a new post
router.post('/', protect, upload, postController.createPost);

// GET /api/posts - Get all posts
router.get('/', postController.getPosts);

// GET /api/posts/:id - Get a single post by ID
router.get('/:id', postController.getPostById);

// PUT /api/posts/:id - Update a post
router.put('/:id', protect, postController.updatePost);

// DELETE /api/posts/:id - Delete a post
router.delete('/:id', protect, postController.deletePost);

// PUT /api/posts/:id/like - Like or unlike a post
router.put('/:id/like', protect, postController.likePost);

// POST /api/posts/:id/comment - Add a comment to a post
router.post('/:id/comment', protect, postController.addComment);

module.exports = router;
