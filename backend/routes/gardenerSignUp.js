const router = require("express").Router();
const { Gardener, validate } = require("../models/gardener");
const bcrypt = require("bcrypt");

router.get("/get/:id", async (req, res) => {
  try {
    const gardener = await Gardener.findOne({ _id: req.params.id });
    res.status(201).send(gardener);
  } catch (error) {
    res.status(500).send({ message: "Server Error" });
  }
});

router.post("/", async (req, res) => {
  try {
    const { error } = validate(req.body);
    if (error)
      return res.status(400).send({ message: error.details[0].message });

    const gardener = await Gardener.findOne({ email: req.body.email });
    if (gardener)
      return res
        .status(409)
        .send({ message: "Gardener with given email already exists!" });

    const salt = await bcrypt.genSalt(Number(process.env.SALT));
    const hashPassword = await bcrypt.hash(req.body.password, salt);

    await new Gardener({ ...req.body, password: hashPassword }).save();
    res.status(201).send({ message: "Sign Up successfully!" });
  } catch (error) {
    res.status(500).send({ message: "Server Error" });
  }
});

router.get("/all-gardeners", async (req, res) => {
  try {
    const all = await Gardener.find();
    res.status(201).send(all);
  } catch (error) {
    res.status(500).send({ message: "Server Error" });
  }
});

router.patch("/update/:id", async (req, res) => {
  try {
    await Gardener.updateOne(
      { _id: req.params.id },
      { $set: { resume: [req.body] } }
    );
    res.status(201).send({ message: "updated successfully!" });
  } catch (error) {
    res.status(500).send({ message: "Server Error" });
  }
});

router.delete("/delete/:id", async (req, res) => {
  try {
    await Gardener.deleteOne({ _id: req.params.id });
    res.status(201).send({ message: "deleted!" });
  } catch (error) {
    res.status(500).send({ message: "Server Error" });
  }
});

module.exports = router;
