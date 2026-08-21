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

module.exports = router;
