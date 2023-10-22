const express = require('express')
const router = express.Router();
const {getUserById,getUsers,createUser,updateUser,deleteUser} = require('../controllers/Users.js')
const{tokenVerify} = require('../middlewares/tokenVerify.js')


router.get('/', tokenVerify, getUsers);
router.get('/:id', getUserById);
router.post('/', createUser);
router.put('/:id', tokenVerify, updateUser);

module.exports = router;