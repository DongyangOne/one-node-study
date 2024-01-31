const Sequelize = require("sequelize");

module.exports = class User extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      // ** 테이블 컬럼에 대한 설정 (init의 첫 번째 인수)
      {
        username: {
          type: Sequelize.STRING(40),
          allowNull: false,
        },
        password: {
          type: Sequelize.STRING(40),
          allowNull: false,
        },
        name: {
          type: Sequelize.STRING(20),
          allowNull: false,
        },
      },
      // ** 테이블 자체에 대한 설정 (init의 두 번째 인수)
      {
        sequelize,
        charset: "utf8",
        collate: "utf8_general_ci",
        tableName: "user",
        modelName: "User",
        underscored: true,
        timestamps: false,
      }
    );
  }
  static associate(db) {
    db.User.hasMany(db.Board, { foreignKey: "user_id", sourceKey: "id" });
  }
};
