const express = require("express");
const postRouter = require("./post");

const app = express();
const port = 3005;

// 미들웨어 설정
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 라우터 설정
app.use("/post", postRouter);

// 기본 경로 핸들러
app.get("/", (req, res) => {
  res.send("Hello World!");
});

// 서버 시작
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
