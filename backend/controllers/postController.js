const Post = require('../models/postModel');
const { moderateContent } = require('../ai/utils/contentModeration');

// @desc    Create a new post
// @route   POST /api/posts
// @access  Private
const createPost = async (req, res) => {
  const { caption } = req.body;
  const contentType = req.file ? 'image' : 'text';
  const mediaUrl = req.file ? req.file.path : null;

  try {
    const isCaptionSafe = await moderateContent(caption);
    if (!isCaptionSafe) {
      return res.status(400).json({ message: 'Caption contains inappropriate content.' });
    }

    const post = await Post.create({
      author: req.user.id,
      contentType,
      mediaUrl,
      caption,
      location: req.user.location, // Get location from user profile
    });

    res.status(201).json(post);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get all posts
// @route   GET /api/posts
// @access  Public
const getPosts = async (req, res) => {
  const pageSize = 10;
  const page = Number(req.query.page) || 1;

  try {
    const count = await Post.countDocuments();
    const posts = await Post.find()
      .sort({ createdAt: -1 })
      .limit(pageSize)
      .skip(pageSize * (page - 1))
      .populate('author', 'username profilePicture') // Populate author's username and profile picture
      .populate('comments.user', 'username profilePicture');

    res.status(200).json({
      posts,
      page,
      pages: Math.ceil(count / pageSize),
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get a single post by ID
// @route   GET /api/posts/:id
// @access  Public
const getPostById = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id)
      .populate('author', 'username profilePicture')
      .populate('comments.user', 'username profilePicture');
    if (post) {
      res.status(200).json(post);
    } else {
      res.status(404).json({ message: 'Post not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update a post
// @route   PUT /api/posts/:id
// @access  Private
const updatePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    // Check if the logged-in user is the author of the post
    if (post.author.toString() !== req.user.id) {
      return res.status(401).json({ message: 'User not authorized' });
    }

    const isCaptionSafe = await moderateContent(req.body.caption);
    if (!isCaptionSafe) {
      return res.status(400).json({ message: 'Caption contains inappropriate content.' });
    }

    // Update only the caption
    post.caption = req.body.caption || post.caption;

    const updatedPost = await post.save();
    res.status(200).json(updatedPost);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete a post
// @route   DELETE /api/posts/:id
// @access  Private
const deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    // Check if the logged-in user is the author of the post
    if (post.author.toString() !== req.user.id) {
      return res.status(401).json({ message: 'User not authorized' });
    }

    await Post.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Post removed' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Like or unlike a post
// @route   PUT /api/posts/:id/like
// @access  Private
const likePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    // Check if the post has already been liked by this user
    if (post.likes.some((like) => like.toString() === req.user.id)) {
      // Unlike the post
      post.likes = post.likes.filter(
        (like) => like.toString() !== req.user.id
      );
    } else {
      // Like the post
      post.likes.push(req.user.id);
    }

    await post.save();
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Add a comment to a post
// @route   POST /api/posts/:id/comment
// @access  Private
const addComment = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    const isCommentSafe = await moderateContent(req.body.text);
    if (!isCommentSafe) {
      return res.status(400).json({ message: 'Comment contains inappropriate content.' });
    }

    const newComment = {
      text: req.body.text,
      user: req.user.id,
    };

    post.comments.push(newComment);

    await post.save();

    const populatedPost = await Post.findById(post._id)
        .populate('author', 'username profilePicture')
        .populate('comments.user', 'username profilePicture');

    res.status(201).json(populatedPost);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createPost,
  getPosts,
  getPostById,
  updatePost,
  deletePost,
  likePost,
  addComment,
};