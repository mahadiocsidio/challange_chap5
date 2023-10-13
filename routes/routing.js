const express = require('express');
const router = express.Router();

router.use('/users', require('./user_routes.js'));
router.use('/accounts', require('./accounts_routes.js'));
router.use('/transactions', require('./transaction_routes.js'));

module.exports = router;