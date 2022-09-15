const mongoose = require('mongoose');
const environment = require('../environment/environment');

async function main() {
  await mongoose.connect(environment.MONGODB_URL);
  console.log("Connected to Mongoose!"); 
}

main().catch((error) => {
  console.log(error);
});

module.exports = mongoose;