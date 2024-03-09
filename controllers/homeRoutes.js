const router = require('express').Router();
const { User, Post, Comment } = require('../models');

// Define your home page routes here
router.get('/', async (req, res) => {
  try {
    const posts = await Post.findAll({ include: User });
    res.render('homepage', { posts });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/post/:id', async (req, res) => {
  try {
    const post = await Post.findByPk(req.params.id, { include: [User, Comment] });
    res.render('post', { post });
  } catch (err) {
    res.status(500).json(err);
  }
});


module.exports = router;
