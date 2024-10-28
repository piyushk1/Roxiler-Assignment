const Transaction = require('../models/Transaction');

const getPieChart = async (req) => {
  const { month } = req.query;

  if (!month) {
    throw new Error('Month query parameter is required'); // Throw an error if month is not provided
  }

  const dateFilter = {
    dateOfSale: {
      $gte: new Date(`${month}-01T00:00:00Z`),
      $lt: new Date(`${month + 1}-01T00:00:00Z`),
    },
  };

  const pieData = await Transaction.aggregate([
    { $match: dateFilter },
    { $group: { _id: "$category", count: { $sum: 1 } } },
  ]);

  return pieData.map((item) => ({
    category: item._id,
    count: item.count,
  }));
};

const getPieChartHandler = async (req, res) => {
  try {
    const pieData = await getPieChart(req); // Call the refactored function
    return res.json(pieData); // Send the response here
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message || 'Failed to get pie chart data' });
  }
};

module.exports = getPieChartHandler;
