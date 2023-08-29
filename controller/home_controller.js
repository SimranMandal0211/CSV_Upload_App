const CSVFile = require('../models/csvData');
const fs = require('fs');
const path = require('path');
const papa = require('papaparse');

// render home page
module.exports.homePage = async function(request, respond){
    let files = await CSVFile.find({});

    return respond.render('home', {
        title: "CSV Upload | Home",
        files: files
    });
}

// create and parse CSV
module.exports.uploadFile = (request, respond) => {
    console.log('upload file');
    CSVFile.uploadedCSV(request, respond, async function(err){
        try{
            let csvFile = await CSVFile.findOne({name: request.file.originalname});

            if(csvFile){
                request.flash('error', 'CSV already exists! ')
                return respond.redirect('back');
            }
    
            // parsing csv using papaparse
            const CSVFileUP = request.file.path;
            const csvData = fs.readFileSync(CSVFileUP, 'utf8');
    
            const conversedFile = papa.parse(csvData, {
                header: false
            });
    
            // allowing only csv input type
            if(request.file && request.file.mimetype == 'text/csv'){
                // inserting the converted JSON to DB
                let csvFile = csvFile.create({
                    name: request.file.originalname,
                    file: conversedFile.data
                });
                request.flash('success', 'CSV uploaded successfully');
                return respond.redirect('back');
            }else{
                request.flash('error', 'only CSV file allowed');
                return respond.redirect('back');
            }
        }catch(err){
            console.log('error', err);
            request.flash('error', 'something went wrong');
            return respond.render('servererror');
        }
    })
}

// display csv Data
module.exports.displayCSV = async(request, respond) => {
    console.log('display CSV');

    let displayData = await CSVFile.findById(request.params.id);
    return respond.render('table', {
        title: 'CSV Uploaf | Details',
        file: displayData.name,
        keys: displayData.file[0],
        results: displayData.file
    })
};

// delete CSV from DB
module.exports.deleteCSV  = async (request, respond) => {
    console.log('delete CSV');
    let deleteCSV = await CSVFile.findByIdAndDelete(request.params.id);
    request.flash('success' , 'CSV removed successfully');
    return respond.redirect('back');
}