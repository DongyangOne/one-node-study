const express = require("express");
const { sequelize } = require("./models");

const userRouter = require("./routes/user");

const app = express();

app.set("port", 3000);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/user", userRouter);

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
