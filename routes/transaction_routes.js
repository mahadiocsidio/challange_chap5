const express = require('express');
const router = express.Router();
const { createTransaction, getTransactionById, getTransactions } = require('../controllers/Transaction.js');

router.post('/', createTransaction);
router.get('/', getTransactions);
router.get('/:id', getTransactionById);

module.exports = router;