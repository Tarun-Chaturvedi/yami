const express = require('express');
const router = express.Router();
const Heritage = require('../models/Heritage');

// @route   GET /api/sites
// @desc    Get all published heritage sites
router.get('/', async (req, res) => {
  try {
    // Only return sites that have been reviewed and published
    const sites = await Heritage.find({ isPublished: true }).sort({ overallAvg: -1 });
    res.json(sites);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Server Error' });
  }
});

// @route   POST /api/sites/nominate
// @desc    Submit a new site for review
router.post('/nominate', async (req, res) => {
  try {
    const { name, location, image, description, ratings } = req.body;

    const newSite = new Heritage({
      name,
      location,
      image,
      description,
      ratings,
      isPublished: false // Ensures it goes to the review queue
    });

    await newSite.save();
    res.status(201).json({ message: 'Nomination submitted successfully for review.', site: newSite });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Server Error saving nomination' });
  }
});

// @route   GET /api/sites/pending
// @desc    Get all sites waiting for review (isPublished: false)
router.get('/pending', async (req, res) => {
  try {
    const pendingSites = await Heritage.find({ isPublished: false }).sort({ createdAt: -1 });
    res.json(pendingSites);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Server Error' });
  }
});

// @route   PATCH /api/sites/:id/approve
// @desc    Approve a site and make it public
router.patch('/:id/approve', async (req, res) => {
  try {
    const site = await Heritage.findByIdAndUpdate(
      req.params.id, 
      { isPublished: true }, 
      { new: true }
    );
    if (!site) return res.status(404).json({ message: 'Site not found' });
    res.json({ message: 'Site approved successfully', site });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Server Error' });
  }
});

// @route   DELETE /api/sites/:id
// @desc    Reject and delete a nominated site
router.delete('/:id', async (req, res) => {
  try {
    const site = await Heritage.findByIdAndDelete(req.params.id);
    if (!site) return res.status(404).json({ message: 'Site not found' });
    res.json({ message: 'Site rejected and deleted' });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Server Error' });
  }
});

module.exports = router;

