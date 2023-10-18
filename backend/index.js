const express = require('express');
const cors = require('cors');
const server = express();
require('dotenv').config();


server.use(express.json());
server.use(cors());

// Public folder 
server.use(express.static('public'));

// Routes

const UserRoutes = require('./routes/UserRoutes');
const PetRoutes = require('./routes/PetRoutes');
server.use('/users', UserRoutes);
server.use('/pets', PetRoutes);


server.listen(process.env.PORT || 5001, () => {

  if (process.env.PORT) {
    console.log(`
      ==============================================
      🚀 API IS RUNNING IN PORT ${ process.env.PORT } 🚀
      ==============================================
    `);
    return;
  }

  console.log(`
    ==============================================
    🚀 API IS RUNNING IN http://localhost:5001/ 🚀
    ==============================================
  `);
}) 