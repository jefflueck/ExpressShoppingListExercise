const express = require('express');
const router = express.Router();

const storeItems = require('./fakeDB');

router.get('', (req, res, next) => {
  res.json(storeItems);
});

router.post('', (req, res, next) => {
  try {
    let newItem = req.body;
    storeItems.push(newItem);
    console.log(newItem);
    return res.json({ item: newItem });
  } catch (err) {
    return next(err);
  }
});

router.get('/:name', (req, res, next) => {
  try {
    let itemName = req.params.name;
    let item = storeItems.find((item) => item.name === itemName);
    return res.json({ item });
  } catch (err) {
    return next(err);
  }
});

router.patch('/:name', (req, res, next) => {
  try {
    let itemName = req.params.name;
    let item = storeItems.find((item) => item.name === itemName);
    let updatedItem = Object.assign(item, req.body);
    return res.json({ item: updatedItem });
  } catch (err) {
    return next(err);
  }
});

router.delete('/:name', (req, res, next) => {
  try {
    let itemName = req.params.name;
    let item = storeItems.find((item) => item.name === itemName);
    let index = storeItems.indexOf(item);
    storeItems.splice(index, 1);
    return res.json({ message: `${itemName} deleted` });
  } catch (err) {
    return next(err);
  }
});

module.exports = router;
