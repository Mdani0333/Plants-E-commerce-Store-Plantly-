const mongoose = require("mongoose");

const benefitsSchema = new mongoose.Schema({
  airFreshner: { type: Boolean, required: true },
  otherBenefits: { type: String, required: true },
});

const cautionsSchema = new mongoose.Schema({
  animalFriendly: { type: Boolean, required: true },
  poisonous: { type: Boolean, required: true },
  deathOnConsumption: { type: Boolean, required: true },
});

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String, required: true },
  specie: { type: String, required: true },
  image: { type: String, required: true },
  price: { type: Number, required: true },
  instock: { type: Number, required: true },
  description: { type: String, required: true },
  temprature: { type: String, required: true },
  humidity: { type: Number, required: true },
  water: { type: Number, required: true },
  light: { type: String, required: true },
  height: { type: String, required: true },
  benefits: benefitsSchema,
  cautions: cautionsSchema,
});

const Products = mongoose.model("products", productSchema);

module.exports = Products;
