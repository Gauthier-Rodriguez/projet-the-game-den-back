require("dotenv/config"); 


const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(process.env.DB_URL, {
  define: {
    createdAt: "Created_at", 
    updatedAt: "Updated_at" 
  },
  logging: false 
});

module.exports = sequelize;