require("dotenv/config"); 


const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(process.env.DB_URL, {
  define: {
    createdAt: "created_at", 
    updatedAt: "updated_at" 
  },
  logging: false 
});

module.exports = sequelize;