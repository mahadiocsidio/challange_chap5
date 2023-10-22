const express = require('express');
const router = express.Router();
const { createTransaction, getTransactionById, getTransactions } = require('../controllers/Transaction.js');
const{tokenVerify} = require('../middlewares/tokenVerify.js')

router.post('/', tokenVerify, createTransaction);
router.get('/', getTransactions);
router.get('/:id', getTransactionById);

module.exports = router;