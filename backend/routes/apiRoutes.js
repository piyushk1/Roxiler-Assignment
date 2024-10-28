const express = require('express');
const router = express.Router(); 
const initializeDatabase = require('../controllers/initializeDatabase');
const getBarChart = require('../controllers/getBarChart');
const getTransactions = require('../controllers/getTransactions');
const getStats = require('../controllers/getStats'); 
const getPieChart = require('../controllers/getPieChart');
const getCombinedData = require('../controllers/getCombinedData');

//  to initialize the database
router.get('/initializeDatabase', initializeDatabase);

//  to get transactions 
router.get('/transactions', getTransactions);

//  to get statistics for the selected month
router.get('/stats', getStats);

//  to get price range data for bar chart
router.get('/barchart', getBarChart);

//  to get category data for pie chart
router.get('/piechart', getPieChart);

//  to get combined data from all statistics APIs
router.get('/combined', getCombinedData);

module.exports = router;
