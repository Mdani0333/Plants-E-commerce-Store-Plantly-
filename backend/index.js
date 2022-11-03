require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const connection = require("./db");
const userRoutes = require("./routes/User");
const adminRoutes = require("./routes/Admin");
const gardenerRoutes = require("./routes/Gardener");
const productsRoutes = require("./routes/Products");

//connecting to mongoDB
connection();

//middlewares
app.use(express.json());
app.use(cors());

//routes
app.use("/user", userRoutes);
app.use("/gardener", gardenerRoutes);
app.use("/admin", adminRoutes);
app.use("/products", productsRoutes);

//Server running on localhost
const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Server running on ${port}`));
