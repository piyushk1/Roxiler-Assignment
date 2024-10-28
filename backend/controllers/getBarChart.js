const Transaction = require('../models/Transaction');

const getBarChart = async (req) => {
  const { month } = req.query;

  // Check if the month query parameter is provided
  if (!month) {
    throw new Error('Month query parameter is required'); // Throw an error instead of sending a response
  }

  // Convert month string into a Date object
  const startDate = new Date(`${month}-01T00:00:00Z`);
  const endDate = new Date(startDate);
  endDate.setMonth(startDate.getMonth() + 1); // Increment month

  const dateFilter = {
    dateOfSale: {
      $gte: startDate,
      $lt: endDate,
    },
  };

  const priceRanges = [
    { range: '0-100', min: 0, max: 100 },
    { range: '101-200', min: 101, max: 200 },
    { range: '201-300', min: 201, max: 300 },
    { range: '301-400', min: 301, max: 400 },
    { range: '401-500', min: 401, max: 500 },
    { range: '501-600', min: 501, max: 600 },
    { range: '601-700', min: 601, max: 700 },
    { range: '701-800', min: 701, max: 800 },
    { range: '801-900', min: 801, max: 900 },
    { range: '901-above', min: 901, max: Infinity },
  ];

  const barData = await Promise.all(
    priceRanges.map(async ({ range, min, max }) => {
      const count = await Transaction.countDocuments({
        ...dateFilter,
        price: { $gte: min, $lte: max },
      });
      return { range, count };
    })
  );

  return barData; // Return the data instead of sending a response
};

const getBarChartHandler = async (req, res) => {
  try {
    const barData = await getBarChart(req); // Call the refactored function
    return res.json(barData); // Send the response here
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message || 'Failed to get bar chart data' });
  }
};

module.exports = getBarChartHandler;
