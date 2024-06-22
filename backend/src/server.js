require("dotenv").config();
require("./connection/mongo.con")();
const routes = require("./routes/building.route")();
const cors = require("cors");
const express = require("express");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use("/api/v1/campusmap", routes);

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
  console.log(`Server connected on port ${PORT}`);
});
