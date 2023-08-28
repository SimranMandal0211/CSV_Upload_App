const CSVFile = require('../models/csvData');
const fs = require('fs');
const path = require('path');
const papa = require('papaparse');
const { request } = require('http');

module.exports.homePage = function(request, respond){
    return respond.render('home', {
        title: "home"
    });
}

module.exports.uploadFile = (request, respond) => {
    console.log('upload file');
}

module.exports.displayCSV = (request, respond) => {
    console.log('display CSV');
}

module.exports.deleteCSV  = (request, respond) => {
    console.log('delete CSV');
}