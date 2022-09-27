const router = require("express").Router();
const { Gardener, validate } = require("../models/gardener");
const bcrypt = require("bcrypt");

router.post("/", async (req, res) => {
  try {
    const { error } = validate(req.body);
    if (error)
      return res.status(400).send({ message: error.details[0].message });

    const gardener = await Gardener.findOne({ email: req.body.email });
    if (!gardener)
      return res.status(401).send({ message: "invalid Email or Password" });

    const validPassword = await bcrypt.compare(
      req.body.password,
      gardener.password
    );
    if (!validPassword)
      return res.status(401).send({ message: "invalid email or password" });

    const token = gardener.generateAuthToken();
    res
      .status(200)
      .send({
        data: token,
        gardener: gardener,
        message: "Logged in Successfully",
      });
  } catch (error) {
    res.status(500).send({ message: "Server Error" });
  }
});

module.exports = router;
