const mongoose = require('mongoose');

const MONGODB_URL = process.env.MONGODB_URL;

async function main() {
  mongoose.connect(MONGODB_URL, {
    dbName: 'pet_for_you'
  });
  console.log("Connected to Mongoose!"); 
}

main().catch((error) => {
  console.error(error);
});

module.exports = mongoose;