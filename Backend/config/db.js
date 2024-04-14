const { Sequelize } = require('sequelize');


// khris 123 vasyll 13022004
const sequelize = new Sequelize('NikeShop', 'vasyll', '13022004', {
    host: 'localhost',
    dialect: 'mssql',
    dialectOptions: {
        options: {
          trustedConnection: true, // Встановлення параметра для використання Windows Authentication
          trustServerCertificate: true // Встановлення траст серверного сертифікату
        }
    }
});

sequelize.authenticate()
    .then(() => {
        console.log('Connection to the database has been established successfully.');
    })
    .catch((error) => {
        console.error('Unable to connect to the database:', error);
});

module.exports = sequelize;