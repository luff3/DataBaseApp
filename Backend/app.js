const express = require('express');
const app = express();
const sequelize = require ('../Backend/config/db.js')
const Customer = require ('./models/customerModel.js')
app.use(express.json());

sequelize.sync();

const customerRouter = require('./routes/customersRouter.js');
app.use('/customer', customerRouter);

const employeeRouter = require('./routes/employeesRouter.js');
app.use('/employee', employeeRouter);

const orderRouter = require('./routes/ordersRouter.js');
app.use('/order', orderRouter);

const orderItemRouter = require('./routes/orderItemRouter.js');
app.use('/orderItem', orderItemRouter);


const productRouter = require('./routes/productRouter.js');
app.use('/product', productRouter);

module.exports = app;