const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const passwordComplexity = require("joi-password-complexity");
const Joi = require("joi");

//cart Schema
const benefitsSchema = new mongoose.Schema({
  airFreshner: { type: Boolean, required: true },
  otherBenefits: { type: String, required: true },
});

const cautionsSchema = new mongoose.Schema({
  animalFriendly: { type: Boolean, required: true },
  poisonous: { type: Boolean, required: true },
  deathOnConsumption: { type: Boolean, required: true },
});

const cartSchema = new mongoose.Schema({
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

// Favourites Schema
const favSchema = new mongoose.Schema({
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

const paymentDetails = new mongoose.Schema({
  accountName: { type: String, required: true },
  accountNumber: { type: Number, required: true },
  bankName: { type: String, required: true },
});

const shoppingHistory = new mongoose.mongoose.Schema({
  orderNumber: { type: Number, required: true },
});

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  paymentDetails: { paymentDetails },
  cart: [cartSchema],
  favourites: [favSchema],
  shoppingHistory: [shoppingHistory],
});

userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign({ _id: this._id }, process.env.JWTPRIVATEKEY, {
    expiresIn: "7d",
  });
  return token;
};

const User = mongoose.model("user", userSchema);

const validate = (data) => {
  const schema = Joi.object({
    name: Joi.string().required().label("name"),
    email: Joi.string().email().required().label("email"),
    password: passwordComplexity().required().label("password"),
    paymentDetails: Joi.object(),
    cart: Joi.array(),
    favourites: Joi.array(),
    shoppingHistory: Joi.array(),
  });
  return schema.validate(data);
};

module.exports = { User, validate };
