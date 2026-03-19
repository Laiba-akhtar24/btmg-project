const express = require('express');
const router = express.Router();
const Topic = require('../models/Topic');

// Get topics by course
router.get('/:courseId', async (req, res) => {
  try {
    const topics = await Topic.find({ courseId: req.params.courseId }).sort({ sort: 1 });
    res.json(topics);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Add topic
router.post('/:courseId', async (req, res) => {
  try {
    const topic = new Topic({
      courseId: req.params.courseId,
      title: req.body.title,
      description: req.body.description,
      sort: req.body.sort,
      status: req.body.status
    });

    const saved = await topic.save();
    res.json(saved);

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Delete topic
router.delete('/:id', async (req, res) => {
  try {
    await Topic.findByIdAndDelete(req.params.id);
    res.json({ message: 'Topic deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Update status
router.put('/:id', async (req, res) => {
  try {
    const topic = await Topic.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true }
    );

    res.json(topic);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;