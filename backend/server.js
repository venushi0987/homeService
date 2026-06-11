const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db.js');
const authRoutes = require('./routes/authRoutes');
const jobRoutes = require('./routes/jobRoutes');

dotenv.config();

connectDB();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json()); 

app.use('/api/auth', authRoutes);
app.use('/api/jobs', jobRoutes);

// Simple Test Route
app.get('/', (req, res) => {
  res.send('Home Service App Backend is Running...');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});