const express = require('express');
const router = express.Router();
const { createAccount, getAccountById, getAccounts } = require('../controllers/Accounts.js');
const{tokenVerify} = require('../middlewares/tokenVerify.js')

router.post('/', tokenVerify, createAccount);
router.get('/', getAccounts);
router.get('/:id', getAccountById);

module.exports = router;