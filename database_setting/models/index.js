const Sequelize = require("sequelize");
const User = require("./user");

const env = "development";
const config = require("../config/config")[env];
const db = {};

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
);

db.sequelize = sequelize;

// ** db 객체에 User Model 담기
db.User = User;

// ** User init 메서드 호출
User.init(sequelize);

module.exports = db;
