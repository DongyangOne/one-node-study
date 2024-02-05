const Sequelize = require("sequelize");

module.exports = class Board extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      // ** 테이블 컬럼에 대한 설정 (init의 첫 번째 인수)
      {
        title: {
          type: Sequelize.STRING(40),
          allowNull: false,
        },
        content: {
          type: Sequelize.TEXT,
          allowNull: false,
        },
      },
      // ** 테이블 자체에 대한 설정 (init의 두 번째 인수)
      {
        sequelize,
        charset: "utf8",
        collate: "utf8_general_ci",
        tableName: "board",
        modelName: "Board",
        underscored: true,
        timestamps: false,
      }
    );
  }
  // ** 테이블간 관계 정의
  static associate(db) {
    db.Board.belongsTo(db.User, { foreignKey: "user_id", targetKey: "id" });
  }
};
