const router = require("express").Router();
const Products = require("../models/product");

router.get("/", async (req, res) => {
  try {
    const products = await Products.find();
    res.status(201).send(products);
  } catch (error) {
    res.status(500).send({ message: "Server Error" });
  }
});

router.post("/post", async (req, res) => {
  try {
    await new Products(req.body).save();
    res.status(201).send({ message: "Added to products" });
  } catch (error) {
    res.status(500).send({ message: "Server Error" });
  }
});

router.delete("/delete/:id", async (req, res) => {
  try {
    console.log({ _id: req.params.id });
    await Products.deleteOne({ _id: req.params.id });
    res.status(201).send({ message: "deleted!" });
  } catch (error) {
    res.status(500).send({ message: "Server Error" });
  }
});

router.put("/update/:id", async (req, res) => {
  try {
    const product = new Products({
      _id: req.params.id,
      name: req.body.name,
      category: req.body.category,
      specie: req.body.specie,
      image: req.body.image,
      price: req.body.price,
      instock: req.body.instock,
      description: req.body.description,
      temprature: req.body.temprature,
      humidity: req.body.humidity,
      water: req.body.water,
      light: req.body.light,
      height: req.body.height,
      benefits: {
        airFreshner: req.body.benefits.airFreshner,
        otherBenefits: req.body.benefits.otherBenefits,
      },
      cautions: {
        animalFriendly: req.body.cautions.animalFriendly,
        poisonous: req.body.cautions.poisonous,
        deathOnConsumption: req.body.cautions.deathOnConsumption,
      },
    });
    await Products.updateOne({ _id: req.params.id }, req.body);
    res.status(201).send({ message: "updated successfully!" });
  } catch (error) {
    res.status(500).send({ message: "Server Error" });
  }
});

module.exports = router;
