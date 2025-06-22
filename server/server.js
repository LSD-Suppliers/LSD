const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

// Routes
const scamStatsRoute = require('./routes/scamStats');
app.use('/api/scamstats', scamStatsRoute);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
