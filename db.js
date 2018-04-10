const mongoose = require('mongoose')

const PROD_URI = "mongodb://admin:123456@ds241039.mlab.com:41039/messagedb"
const DEV_URI = "mongodb://localhost:27017/chatMessageDb"

function connect(url) {
  return mongoose.connect(url,  function (err, res) {
    if(err) throw err;
    console.log('DB Connected successfully : ');
  })
}

module.exports = async function() {
  let databases = await Promise.all([connect(PROD_URI)])

  return {
    prod: databases[0]
  }
}
