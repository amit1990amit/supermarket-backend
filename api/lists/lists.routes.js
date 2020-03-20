const { Router } = require('express');
const { createList } = require('./lists.controller');
const { getLists } = require('./lists.controller');
const { getList } = require('./lists.controller');
const { deleteList } = require('./lists.controller');
const { updateList } = require('./lists.controller');
const router = Router();


router.post('/', createList);
router.get('/', getLists);
router.get('/:id', getList);
router.delete('/:_id',deleteList);
router.put('/:_id', updateList);

module.exports = router;