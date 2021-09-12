const { response } = require('express');
const express = require('express');
const router = express.Router();

// Item Model
let Item = require('../../models/Item');

// @route GET api/items
// @desc Get All Items
// @access Public
router.get('/', (req, res) => {
  Item.find()
  .sort({ date: -1 })
  .then(items => res.json(items))
  .catch(err => console.log(err));
});

// @route POST api/items
// @desc Create an Item
// @access Public
router.post('/', (req, res) => {
  const newItem = new Item({
    name: req.body.name
  });

  newItem.save()
  .then(item => res.json(item))
  .catch(err => console.log(err));
});

// @route DELETE api/items/:id
// @desc Delete an Item
// @access Public
router.delete('/:id', (req, res) => {
  Item.findById(req.params.id)
  .then(item => item.remove()
  .then(() => res.json({ success: true })))
  .catch(err => res.status(404).json({ success: false }));
});

// @route PUT api/items/:id
// @desc Update an Item
// @access Public
router.put('/:id', (req, res) => {
  Item.findById(req.params.id, function(err, item) {
    item.name = req.body.name;
      item.save()
      .then(item => res.json(item))
      .catch(err => res.status(400).send(err));
  });
});

module.exports = router;