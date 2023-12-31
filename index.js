const express = require("express");
const postRouter = require("./src/api/posts");
const port = 3005;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/posts", postRouter);

app.use((req, res, next) => {
  console.log(`[${req.method}] ${req.path} | ${new Date().toLocaleString()}`);
  next();
});

app.get("/api/posts", (req, res) => {
  res.status(200).send("Hello World!");
});

app.use((error, req, res, next) => {
  console.error(error.stack);
  res.status(500).send({ message: "Internal Server Error" });
});

app.all("*", (req, res) => {
  res.status(404).send({ message: "Invalid Route" });
});

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
