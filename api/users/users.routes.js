const { Router } = require('express');
const { createUser } = require('./users.controller');
const { getUsers } = require('./users.controller');
const { getUser } = require('./users.controller');
const { deleteUser } = require('./users.controller');
const { updateUser } = require('./users.controller');
const router = Router();


router.post('/', createUser);
router.get('/', getUsers);
router.get('/:id', getUser);
router.delete('/:_id',deleteUser);
router.put('/:_id', updateUser);

module.exports = router;