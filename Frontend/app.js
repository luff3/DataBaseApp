const express = require('express');
const app = express();
const sequelize = require ('./config/db.js')
const User = require ('./models/userModel.js')
app.use(express.json());

//sequelize.sync();

// const productsRouter = require('./routes/productsRouter');
// app.use('/api/v1/products', productsRouter);

// Наприклад, вибрати всіх користувачів і вивести їх дані
User.findAll({ raw: true }).then(users => {
    users.forEach(user => {
      console.log(user);
    });
  }).catch(err => {
    console.error('Помилка при виборі користувачів:', err);
  });
  

module.exports = app;