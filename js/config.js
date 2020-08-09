const Sequelize = require("sequelize");
const sequelize = new Sequelize(
  "mysql://admin_sigmauser:pfaDKIJyPF@178.128.146.252/admin_sigmatest"
);
module.exports = sequelize;