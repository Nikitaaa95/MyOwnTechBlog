const withAuth = (req, res, next) => {
  if (!req.session.user_id) {
    res.redirect('/auth/login');
  } else {
    next();
  }
};

module.exports = withAuth;
