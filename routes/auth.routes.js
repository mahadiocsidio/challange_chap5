const express = require('express')
const router = express.Router()
const {register, login, authenticate} = require('../controllers/auth')
const {tokenVerify} = require('../middlewares/tokenVerify')

router.post('/register', register)
router.post('/login', login)
router.get('/authenticate',tokenVerify,authenticate)

module.exports = router;