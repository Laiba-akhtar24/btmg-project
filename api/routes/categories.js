const express = require('express');
const router = express.Router();
const Category = require('../models/Category');

// GET all categories
router.get('/', async (req, res) => {
  try {
    const categories = await Category.find().sort({ order: 1 });
    res.json(categories);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// ADD category
router.post('/', async (req, res) => {
  try {
    const { name, order, slug } = req.body;
    if (!name || !slug) return res.status(400).json({ message: 'Name and slug required' });

    const exists = await Category.findOne({ slug });
    if (exists) return res.status(400).json({ message: 'Slug already exists' });

    const category = new Category({ name, order, slug });
    await category.save();
    res.json(category);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// DELETE category
router.delete('/:id', async (req, res) => {
  try {
    await Category.findByIdAndDelete(req.params.id);
    res.json({ message: 'Category deleted' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// ✅ UPDATE category
router.put('/:id', async (req, res) => {
  try {
    const { name, order, slug } = req.body;
    if (!name || !slug) return res.status(400).json({ message: 'Name and slug required' });

    const category = await Category.findById(req.params.id);
    if (!category) return res.status(404).json({ message: 'Category not found' });

    category.name = name;
    category.order = order;
    category.slug = slug;

    await category.save();
    res.json(category);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;