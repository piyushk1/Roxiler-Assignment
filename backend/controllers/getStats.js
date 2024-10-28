const Transaction = require('../models/Transaction');

const getStats = async (req) => {
  const { month } = req.query;

  // Parse the month and year from the request
  const [year, monthNumber] = month.split('-').map(Number);
  if (!year || !monthNumber || monthNumber < 1 || monthNumber > 12) {
    throw new Error('Invalid month format. Expected format: YYYY-MM'); // Throw an error if the month format is invalid
  }

  // Create the start and end dates for the filter
  const startDate = new Date(year, monthNumber - 1, 1); // First day of the given month
  const endDate = new Date(year, monthNumber, 1); // First day of the next month

  const dateFilter = {
    dateOfSale: {
      $gte: startDate,
      $lt: endDate,
    },
  };

  // Calculate total sales amount
  const totalSalesAmountResult = await Transaction.aggregate([
    { $match: dateFilter },
    { $group: { _id: null, totalAmount: { $sum: "$price" } } },
  ]);

  // Calculate total sold and unsold items
  const totalSoldItems = await Transaction.countDocuments({ ...dateFilter, sold: true });
  const totalNotSoldItems = await Transaction.countDocuments({ ...dateFilter, sold: false });

  return {
    totalSalesAmount: totalSalesAmountResult[0]?.totalAmount || 0,
    totalSoldItems,
    totalNotSoldItems,
  };
};

const getStatsHandler = async (req, res) => {
  try {
    const stats = await getStats(req); // Call the refactored function
    return res.json(stats); // Send the response here
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message || 'Failed to get stats' });
  }
};

module.exports = getStatsHandler;
