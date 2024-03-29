const mongoose = require("mongoose");
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
  address: { type: String, required: true },
  summary: { type: String, required: true },
  experience: [experienceSchema],
  education: { type: String, required: true },
  skills: { type: String, required: true },
  hobbies: { type: String, required: true },
});

const gardenerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phoneNo: { type: Number, required: true },
  profilePic: { type: String, required: true },
  password: { type: String, required: true },
  resume: [resumeSchema],
});

const Gardener = mongoose.model("gardener", gardenerSchema);

const validate = (data) => {
  const schema = Joi.object({
    name: Joi.string().required().label("name"),
    email: Joi.string().email().required().label("email"),
    phoneNo: Joi.number().required().label("phoneNo"),
    profilePic: Joi.string().required().label("profilePic"),
    password: passwordComplexity().required().label("password"),
    resume: Joi.array(),
  });
  return schema.validate(data);
};

module.exports = { Gardener, validate };
