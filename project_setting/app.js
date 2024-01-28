const express = require("express");

// ** express 모듈을 변수에 할당
const app = express();

// ** Server Port 설정 (3000번)
app.set("port", 3000);

// ** GET / 요청시 함수 실행
app.get("/", (req, res) => {
  // 'Hello World!'를 전송한다.
  res.send("Hello World!");
});

// ** 서버 구동 (위에 설정한 포트로 서버를 구동한다.)
app.listen(app.get("port"), () => {
  // 서버가 구동되면서 실행될 함수
  console.log(`Server On Port ${app.get("port")}`);
});
