const express = require('express');
const router = express.Router();
const UserStat = require('../models/UserStat');

// Simulate getting random stat (until ML is ready)
router.get('/:username', async (req, res) => {
  const username = req.params.username;

  // Mock random stats
  const mockStat = {
    username,
    scamLikelihood: Math.floor(Math.random() * 100),
    profileAge: Math.floor(Math.random() * 24),
    connections: Math.floor(Math.random() * 5000),
    activityScore: Math.floor(Math.random() * 10),
    redFlags: Math.floor(Math.random() * 5),
  };

  res.json(mockStat);
});

module.exports = router;
