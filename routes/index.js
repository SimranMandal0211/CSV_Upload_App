const express = require('express');

const router = express.Router();
const homeController = require('../controller/home_controller');

console.log('router loaded');

// render homepage
router.get('/', homeController.homePage);

// upload CSV
router.use('/file/uploads', homeController.uploadFile);

// view CSV File in Table formet
router.use('/views/:id', homeController.displayCSV);

// delete CSV file
router.use('/delete/:id', homeController.deleteCSV);

module.exports = router;