const mongoose = require('mongoose');

const MONGODB_URL = process.env.MONGODB_URL;

async function main() {
  await mongoose.connect(MONGODB_URL, {
    dbName: 'adopt_pet'
  });
  console.log("Connected to Mongoose!"); 
}

main().catch((error) => {
  console.error(error);
});

module.exports = mongoose;