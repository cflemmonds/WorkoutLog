const Sequelize = require('sequelize');

const sequelize = new Sequelize("postgres://postgres:cosmiclocal@localhost:5432/workout-log")

module.exports = sequelize;