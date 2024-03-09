const router = require('express').Router();
const { Post, User } = require('../models');
const withAuth = require('../utils/auth');

// Dashboard route
router.get('/', withAuth, async (req, res) => {
  try {
    // Get all posts by the logged-in user
    const postData = await Post.findAll({
      where: { user_id: req.session.user_id },
      include: [{ model: User }],
      order: [['created_at', 'DESC']],
    });

    // Serialize data so the template can read it
    const posts = postData.map((post) => post.get({ plain: true }));

    // Render the dashboard template with the posts data
    res.render('dashboard', {
      posts,
      loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

// New post form route
router.get('/new', withAuth, async (req, res) => {
  try {
    res.render('new-post', {
      loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

// Create a new post
router.post('/new', withAuth, async (req, res) => {
  try {
    const newPost = await Post.create({
      title: req.body.title,
      content: req.body.content,
      user_id: req.session.user_id,
    });

    res.status(200).json(newPost);
  } catch (err) {
 
