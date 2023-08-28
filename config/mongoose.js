require('dotenv').config()
const mongoose = require('mongoose');


mongoose.connect(`mongodb://0.0.0.0/${env.DB}`);

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'error in connecting to the db'));
db.once('open', function(){
  console.log('Successfully connected to the DB');
});

module.exports = db;