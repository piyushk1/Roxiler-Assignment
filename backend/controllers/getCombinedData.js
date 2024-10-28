const getStats = require('./getStats');
const getBarChart = require('./getBarChart');
const getPieChart = require('./getPieChart');

const getCombinedData = async (req, res) => {
  try {
    const stats = await getStats(req, res); 
    const barChart = await getBarChart(req, res); 
    const pieChart = await getPieChart(req, res); 

    return res.json({
      stats,
      barChart,
      pieChart,
    });
  } catch (error) {
    console.error(error);
    if (!res.headersSent) {
      return res.status(500).json({ error: error.message || 'Failed to fetch combined data' });
    }
  }
};

module.exports = getCombinedData;
