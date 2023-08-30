require('dotenv').config()
const mongoose = require('mongoose');

exports.connectMongoose = () => {
  mongoose.connect(process.env.DB_URL,{
    useNewUrlParser: true
  })
  .then((e) => console.log('Connected to MongoDB -> CSV Upload'))
  .catch((e) => console.log("Not Connect MongoDB"))
}


// mongoose.connect(`mongodb://0.0.0.0/${process.env.DB}`);

// const db = mongoose.connection;
// db.on('error', console.error.bind(console, 'error in connecting to the db'));
// db.once('open', function(){
//   console.log('Successfully connected to the DB');
// });

// module.exports = db;