const Transaction = require('../models/Transaction');

// function to get the start and end of a given month
const getMonthDateRange = (month) => {
  const startDate = new Date(`${month}-01T00:00:00Z`); 
  const endDate = new Date(startDate);  
  endDate.setMonth(endDate.getMonth() + 1);  // Set end date to next month

  return { $gte: startDate, $lt: endDate };
};

const getTransactions = async (req, res) => {
  try {
    const { page = 1, perPage = 10, search = '', month } = req.query;

    // filters for date and search
    const filters = {};
    
    if (month) {
      filters.dateOfSale = getMonthDateRange(month);  //  filter for the month
    }

    if (search) {
      filters.$or = [
        { title: { $regex: search, $options: 'i' } },  //  title search caseinsensitive
        { description: { $regex: search, $options: 'i' } },
        { price: { $regex: search, $options: 'i' } }
      ];
    }

    // Calculate the pagination 
    const skipCount = (Number(page) - 1) * Number(perPage);

    // Fetch the transactions
    const transactions = await Transaction
      .find(filters)
      .skip(skipCount)
      .limit(Number(perPage));

    // Count total matching records
    const totalRecords = await Transaction.countDocuments(filters);

    // Return paginated transactions and total pages
    res.json({
      transactions,
      totalPages: Math.ceil(totalRecords / perPage),
      currentPage: Number(page)
    });
  } catch (error) {
    console.error('Error fetching transactions:', error);
    res.status(500).json({ message: 'Failed to retrieve transactions.' });
  }
};

module.exports = getTransactions;
