const axios = require('axios');
const Transaction = require('../models/Transaction'); // This is your MongoDB model

// Fetch data from the api and insert into the database
const initializeDatabase = async (req, res) => {
  try {
    
    //fetch the data
    const { data: transactions } = await axios.get('https://s3.amazonaws.com/roxiler.com/product_transaction.json');
    
    // Clear existing transactions 
    await Transaction.deleteMany(); 

    // Insert the new fetched transactions into database
    await Transaction.insertMany(transactions);
    
    res.json({ message: 'Database successfully initialized with Transactions.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to initialize database with Transactions' });
  }
};

module.exports = initializeDatabase;
