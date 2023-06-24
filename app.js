const express = require("express");
const postRouter = require("./post");
const app = express();
const port = 3005;

app.use("/post", postRouter);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.status(200).send("Hello World!");
});

app.listen(port, () => {
  console.log(`Start`);
});
