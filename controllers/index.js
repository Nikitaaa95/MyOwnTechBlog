const router = require('express').Router();


router.use('/api', require('./api'));
router.use('/', require('./homeRoutes'));
router.use('/dashboard', require('./dashboardRoutes'));
router.use('/auth', require('./authRoutes.js'));

module.exports = router;
