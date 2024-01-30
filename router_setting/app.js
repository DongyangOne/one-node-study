const express = require("express");

const app = express();

app.set("port", 3000);

// ** router 가져오기
// index는 생략 가능
const indexRouter = require("./routes");
const testRouter = require("./routes/test");

// ** router 연결

// ** / 경로인 경우 indexRouter로 연결
app.use("/", indexRouter);

// ** /test 경로인 경우 testRouter로 연결
app.use("/test", testRouter);

app.listen(app.get("port"), () => {
  console.log(`Server On Port ${app.get("port")}`);
});
