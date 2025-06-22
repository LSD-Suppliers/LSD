const mongoose = require('mongoose');

const UserStatSchema = new mongoose.Schema({
  username: String,
  scamLikelihood: Number, // percentage
  profileAge: Number, // in months
  connections: Number,
  activityScore: Number,
  redFlags: Number,
});

module.exports = mongoose.model('UserStat', UserStatSchema);
