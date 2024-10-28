const express = require('express');
const mongoose = require('mongoose');
const apiRoutes = require('./routes/apiRoutes'); 
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.use('/api', apiRoutes); 

// MongoDB connection
mongoose.connect(process.env.MONGO_URI).then(() => {
  console.log('Connected to MongoDB');
}).catch((err) => {
  console.error('Error connecting to MongoDB:', err);
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
