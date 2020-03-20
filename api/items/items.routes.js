const { Router } = require('express');
const { createItem } = require('./items.controller');
const { getItems } = require('./items.controller');
const { getItem } = require('./items.controller');
const { deleteItem } = require('./items.controller');
const { updateItem } = require('./items.controller');
const router = Router();


router.post('/', createItem);
router.get('/', getItems);
router.get('/:id', getItem);
router.delete('/:_id',deleteItem)
router.put('/:_id', updateItem)

module.exports = router;