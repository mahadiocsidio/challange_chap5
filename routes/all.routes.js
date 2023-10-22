const express = require('express');
const router = express.Router();

router.use('/users', require('./user.routes.js'));
router.use('/accounts', require('./accounts.routes.js'));
router.use('/transactions', require('./transaction.routes.js'));
router.use('/auth', require('./auth.routes.js'));

module.exports = router;