const express = require('express');
const router = express.Router();
const { listUsers, getUser, updateUser, deleteUser } = require('../controllers/users.controller');

router.get('/', listUsers);
router.get('/:id', getUser);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);


module.exports = router;
