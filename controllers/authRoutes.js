const router = require('express').Router();
const bcrypt = require('bcrypt');
const { User } = require('../models');

// Login route
router.post('/login', async (req, res) => {
  try {
    const userData = await User.findOne({ where: { username: req.body.username } });

    if (!userData || !userData.checkPassword(req.body.password)) {
      res.render('login', { errorMessage: 'Incorrect username or password' });
      return;
    }

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.loggedIn = true;
      res.redirect('/dashboard');
    });
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

// Signup route
router.post('/signup', async (req, res) => {
  try {
    const newUser = await User.create({
      username: req.body.username,
      password: req.body.password,
    });

    req.session.save(() => {
      req.session.user_id = newUser.id;
      req.session.loggedIn = true;
      res.redirect('/dashboard');
    });
  } catch (err) {
    console.error(err);
    res.render('signup', { errorMessage: 'Failed to create user' });
  }
});

module.exports = router;
