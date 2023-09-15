// require('dotenv').config()
const mongoose = require('mongoose');

// exports.connectMongoose = () => {
//   mongoose.connect(process.env.DB_URL,{
//     useNewUrlParser: true
//   })
//   .then((e) => console.log('Connected to MongoDB -> CSV Upload'))
//   .catch((e) => console1.log("Not Connect MongoDB"))
// }


module.exports.connectMongoose = async () => {
  try{
    await mongoose.connect(process.env.DB_URL)
    console.log('connect to MongoDB sucessfully')
  }catch(error){
    console.timeLog('connect failed' +error.message)
  }
}
