const express = require('express')
const router = express.Router();
const {getUserById,getUsers,createUser,updateUser,deleteUser} = require('../controllers/Users.js')

router.get('/users', getUsers);
router.get('/users/:id', getUserById);
router.post('/users', createUser);
router.put('/users/:id', updateUser);
router.delete('/users/:id', deleteUser);

module.exports = router;