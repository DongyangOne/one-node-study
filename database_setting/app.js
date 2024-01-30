const express = require("express");
const { sequelize } = require("./models");

const app = express();

app.set("port", 3000);

sequelize
  .sync({ force: false })
  .then(() => {
    console.log("DB 연결 성공");
  })
  .catch((err) => {
    console.log(err);
  });

app.listen(app.get("port"), () => {
  console.log(`Server On Port ${app.get("port")}`);
});
