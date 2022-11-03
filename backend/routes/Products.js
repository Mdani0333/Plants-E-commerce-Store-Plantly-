const router = require("express").Router();
const Products = require("../models/product");
const { VerifyAdminToken } = require("../jwt/Auth");

//getting all products
router.get("/", async (req, res) => {
  try {
    const products = await Products.find().limit(50);
    res.status(201).send(products);
  } catch (error) {
    res.status(500).send({ message: "Server Error" });
  }
});

//creating a new product
router.post("/post", VerifyAdminToken, async (req, res) => {
  try {
    await new Products(req.body).save();
    res.status(201).send({ message: "Added to products" });
  } catch (error) {
    res.status(500).send({ message: "Server Error" });
  }
});

//deleting a single product
router.delete("/delete/:id", VerifyAdminToken, async (req, res) => {
  try {
    await Products.deleteOne({ _id: req.params.id });
    res.status(201).send({ message: "deleted!" });
  } catch (error) {
    res.status(500).send({ message: "Server Error" });
  }
});

//updating a single product
router.put("/update/:id", VerifyAdminToken, async (req, res) => {
  try {
    await Products.updateOne({ _id: req.params.id }, req.body);
    res.status(201).send({ message: "updated successfully!" });
  } catch (error) {
    res.status(500).send({ message: "Server Error" });
  }
});

module.exports = router;
