const express = require('express');
const cors = require('cors'); // Імпортуйте пакет корс
const app = express();
const bodyParser = require('body-parser');
const sequelize = require ('../Backend/config/db.js')
const cookieParser = require('cookie-parser');
const { logger } = require('./middleware/logEvents.js');
const verifyJWT = require('./middleware/verifyJWT');
const errorHandler = require('./middleware/errorHandler')
app.use(express.json());
app.use(cors())
sequelize.sync();
app.use(logger);

app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// app.use(bodyParser.urlencoded({extended: true}));
// app.use(bodyParser.json());
app.use(bodyParser.json({ limit: '50000mb' })); // Наприклад, обмеження на 50 МБ
app.use(bodyParser.urlencoded({ extended: true, limit: '50000mb' }));
const registerRouter = require('./routes/registerRouter.js')
app.use('/register', registerRouter);

const authRouter = require('./routes/authController.js');
app.use('/auth', authRouter);

const refreshRouter = require('./routes/refreshRouter.js');
app.use('/refresh', refreshRouter);

app.use(verifyJWT);
const customerRouter = require('./routes/customersRouter.js');
app.use('/customer', customerRouter);

const statisticRouter = require('./routes/staticticRouter.js');
app.use('/statistic', statisticRouter);

const employeeRouter = require('./routes/employeesRouter.js');
app.use('/employee', employeeRouter);

const orderRouter = require('./routes/ordersRouter.js');
app.use('/order', orderRouter);

const orderItemRouter = require('./routes/orderItemRouter.js');
app.use('/orderItem', orderItemRouter);

const productRouter = require('./routes/productRouter.js');
app.use('/product', productRouter);

// const loginRouter = require('./routes/loginRouter.js');
// app.use('/login', loginRouter);


app.use(errorHandler);

module.exports = app;