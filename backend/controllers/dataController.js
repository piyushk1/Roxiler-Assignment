const getStats = require('./getStats');
const getBarChart = require('./getBarChart');
const getPieChart = require('./getPieChart');

const getCombinedData = async (req, res) => {
  try {
    const [stats, barChart, pieChart] = await Promise.all([
      getStats(req),
      getBarChart(req),
      getPieChart(req),
    ]);

    res.json({ stats, barChart, pieChart });
  } catch (error) {
    console.error(`Error in ${req.method} ${req.originalUrl}:`, error);
    if (!res.headersSent) {
      res.status(500).json({ status: 'error', error: error.message || 'Failed to fetch combined data' });
    }
  }
};

const handleGetStats = async (req, res) => {
  try {
    const stats = await getStats(req);
    res.json(stats);
  } catch (error) {
    console.error(`Error in ${req.method} ${req.originalUrl}:`, error);
    if (!res.headersSent) {
      res.status(500).json({ status: 'error', error: error.message || 'Failed to fetch stats' });
    }
  }
};

const handleGetBarChart = async (req, res) => {
  try {
    const barChart = await getBarChart(req);
    res.json(barChart);
  } catch (error) {
    console.error(`Error in ${req.method} ${req.originalUrl}:`, error);
    if (!res.headersSent) {
      res.status(500).json({ status: 'error', error: error.message || 'Failed to fetch bar chart' });
    }
  }
};

const handleGetPieChart = async (req, res) => {
  try {
    const pieChart = await getPieChart(req);
    res.json(pieChart);
  } catch (error) {
    console.error(`Error in ${req.method} ${req.originalUrl}:`, error);
    if (!res.headersSent) {
      res.status(500).json({ status: 'error', error: error.message || 'Failed to fetch pie chart' });
    }
  }
};

module.exports = {
  getCombinedData,
  handleGetStats,
  handleGetBarChart,
  handleGetPieChart,
};
