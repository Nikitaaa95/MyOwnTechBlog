const router = require('express').Router();
const { Post, User, Comment } = require('../models');

// Homepage route
router.get('/', async (req, res) => {
  try {
    // Get all posts with associated user data
    const posts = await Post.findAll({
      include: { model: User },
      order: [['created_at', 'DESC']],
    });

    // Render the homepage template with the posts data
    res.render('homepage', {
      posts: posts.map(post => post.toJSON()), 
      loggedIn: req.session.loggedIn || false, 
    });
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

// Single post route
router.get('/post/:id', async (req, res) => {
  try {
    const post = await Post.findByPk(req.params.id, {
      include: [{ model: User }, { model: Comment, include: [{ model: User }] }],
    });

    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

   
    res.render('single-post', {
      post: post.toJSON(), 
      loggedIn: req.session.loggedIn || false, 
    });
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

module.exports = router;
