const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const passwordComplexity = require("joi-password-complexity");
const Joi = require("joi");

const experienceSchema = new mongoose.Schema({
  title: { type: String, required: true },
  company: { type: String, required: true },
  fromDate: { type: Date, required: true },
  toDate: { type: Date, required: true },
  description: { type: String, required: true },
});

const resumeSchema = new mongoose.Schema({
  status: { type: String, required: true },
  image: { type: String, required: true },
  name: { type: String, required: true },
  address: { type: String, required: true },
  contactNo: { type: Number, required: true },
  summary: { type: String, required: true },
  experience: [experienceSchema],
  education: { type: String, required: true },
  skills: { type: String, required: true },
  hobbies: { type: String, required: true },
});

const gardenerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  resume: [resumeSchema],
});

const Gardener = mongoose.model("gardener", gardenerSchema);

const validate = (data) => {
  const schema = Joi.object({
    name: Joi.string().required().label("name"),
    email: Joi.string().email().required().label("email"),
    password: passwordComplexity().required().label("password"),
    resume: Joi.array(),
  });
  return schema.validate(data);
};

module.exports = { Gardener, validate };
