const router = require('express').Router();
const { Post, User, Comment } = require('../models');

// Homepage route
router.get('/', async (req, res) => {
  try {
    // Get all posts with associated user data
    const postData = await Post.findAll({
      include: [{ model: User }],
      order: [['created_at', 'DESC']],
    });

    // Serialize data so the template can read it
    const posts = postData.map((post) => post.get({ plain: true }));

    // Render the homepage template with the posts data
    res.render('homepage', {
      posts,
      loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

// Single post route
router.get('/post/:id', async (req, res) => {
  try {
    // Get the post by id with associated user and comments data
    const postData = await Post.findByPk(req.params.id, {
      include: [{ model: User }, { model: Comment, include: [{ model: User }] }],
    });

    // Serialize data so the template can read it
    const post = postData.get({ plain: true });

    // Render the single post template with the post data
    res.render('single-post', {
      post,
      loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

module.exports = router;
