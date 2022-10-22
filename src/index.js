import express from "express";

const app = express();

const port = 4000;

app.get("/", (req, res) => {
  res.send({
    message: "Hola Mundo",
  });
});

app.listen(port, () => {
  console.log(`Server started at port ${port}`);
});
