const router = require("express").Router();
const { User, validate } = require("../models/user");
const bcrypt = require("bcrypt");

router.get("/get/:id", async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.params.id });
    res.status(201).send(user);
  } catch (error) {
    res.status(500).send({ message: "Server Error" });
  }
});

router.get("/all-users", async (req, res) => {
  try {
    const allusers = await User.find();
    res.status(201).send(allusers);
  } catch (error) {
    res.status(500).send({ message: "Server Error" });
  }
});

router.post("/", async (req, res) => {
  try {
    const { error } = validate(req.body);
    if (error)
      return res.status(400).send({ message: error.details[0].message });

    const user = await User.findOne({ email: req.body.email });
    if (user)
      return res
        .status(409)
        .send({ message: "User with given email already exists!" });

    const salt = await bcrypt.genSalt(Number(process.env.SALT));
    const hashPassword = await bcrypt.hash(req.body.password, salt);

    await new User({ ...req.body, password: hashPassword }).save();
    res.status(201).send({ message: "User created successfully!" });
  } catch (error) {
    res.status(500).send({ message: "Server Error" });
  }
});

router.delete("/delete/:id", async (req, res) => {
  try {
    await User.deleteOne({ _id: req.params.id });
    res.status(201).send({ message: "deleted!" });
  } catch (error) {
    res.status(500).send({ message: "Server Error" });
  }
});

router.patch("/cart/:id", async (req, res) => {
  try {
    console.log(req.body);
    await User.updateOne({ _id: req.params.id }, { $set: { cart: req.body } });
    res.status(201).send({ message: "updated successfully!" });
  } catch (error) {
    res.status(500).send({ message: "Server Error" });
  }
});

router.patch("/fav/:id", async (req, res) => {
  try {
    await User.updateOne(
      { _id: req.params.id },
      { $set: { favourites: req.body } }
    );
    res.status(201).send({ message: "updated successfully!" });
  } catch (error) {
    res.status(500).send({ message: "Server Error" });
  }
});

module.exports = router;
