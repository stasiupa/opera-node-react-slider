const data = require("./data/slides.json");
const express = require("express");
const app = express();
const PORT = 8080;
const cors = require("cors");

app.use(cors());
app.use(express.static("public"));

app.get("/slides", (req, res) => {
  res.json(data);
});

app.listen(PORT, () => {
  console.log(`Server started on PORT: ${PORT}`);
});
