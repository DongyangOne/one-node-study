const Sequelize = require("sequelize");
const User = require("./user");
const Board = require("./board");

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
db.Board = Board;

// ** User init 메서드 호출
User.init(sequelize);
Board.init(sequelize);

// ** 관계 설정
User.associate(db);
Board.associate(db);

module.exports = db;
