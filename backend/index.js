require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const connection = require("./db");
const userRoutes = require("./routes/user");
const adminSignUp = require("./routes/adminSignUp");
const authRoutes = require("./routes/auth");
const adminAuth = require("./routes/adminAuth");
const productRoutes = require("./routes/product");

//connecting to mongoDB
connection();

//middlewares
app.use(express.json());
app.use(cors());

//routes
app.use("/user", userRoutes);
app.use("/admin/signUp", adminSignUp);
app.use("/auth", authRoutes);
app.use("/admin/login", adminAuth);
app.use("/products", productRoutes);

//Server running on localhost
const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Server running on ${port}`));
