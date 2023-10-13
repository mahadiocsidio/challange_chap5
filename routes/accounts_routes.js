const express = require('express');
const router = express.Router();
const { createAccount, getAccountById, getAccounts } = require('../controllers/Accounts.js');

router.post('/', createAccount);
router.get('/', getAccounts);
router.get('/:id', getAccountById);

module.exports = router;