const router = require("express").Router();
const { Gardener, validate } = require("../models/gardener");
const bcrypt = require("bcrypt");
const {
  VerifyGardenerToken,
  VerifyAdminToken,
  VerifyUserToken,
} = require("../jwt/Auth");
const jwt = require("jsonwebtoken");

//gardener signUp
router.post("/signUp", async (req, res) => {
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

//gardener Login
router.post("/login", async (req, res) => {
  try {
    if (req.body.email) {
      const gardener = await Gardener.findOne({ email: req.body.email });
      if (!gardener)
        return res.status(401).send({ message: "invalid Email or Password" });

      if (req.body.password) {
        const validPassword = await bcrypt.compare(
          req.body.password,
          gardener.password
        );
        if (!validPassword)
          return res.status(401).send({ message: "invalid email or password" });

        const gardenerToken = jwt.sign(
          { gardenerId: gardener._id, tokenType: "GARDENER" },
          process.env.JWT_PRIVATE_KEY,
          {
            expiresIn: "7d",
          }
        );
        res.status(200).send({
          Token: gardenerToken,
          Role: "GARDENER",
          Gardener: gardener,
        });
      } else {
        res.status(401).send({ message: "Password is not provided!" });
      }
    } else {
      res.status(401).send({ message: "Email is not provided!" });
    }
  } catch (error) {
    res.status(500).send({ message: "Server Error" });
  }
});

//getting all gardeners
router.get("/all-gardeners", async (req, res) => {
  try {
    const all = await Gardener.find().limit(20);
    res.status(201).send(all);
  } catch (error) {
    res.status(500).send({ message: "Server Error" });
  }
});

//getting a single gardener
router.get("/get", VerifyGardenerToken, async (req, res) => {
  try {
    const gardener = await Gardener.findOne({ _id: req.headers.gardenerId });
    res.status(201).send(gardener);
  } catch (error) {
    res.status(500).send({ message: "Server Error" });
  }
});

//updating a single gardener
router.patch("/update", VerifyGardenerToken, async (req, res) => {
  try {
    await Gardener.updateOne(
      { _id: req.headers.gardenerId },
      { $set: { resume: [req.body.resume] } }
    );
    res.status(201).send({ message: "updated successfully!" });
  } catch (error) {
    res.status(500).send({ message: "Server Error" });
  }
});

//deleting a single gardener
router.delete("/delete/:id", VerifyAdminToken, async (req, res) => {
  try {
    await Gardener.deleteOne({ _id: req.params.id });
    res.status(201).send({ message: "deleted!" });
  } catch (error) {
    res.status(500).send({ message: "Server Error" });
  }
});

module.exports = router;
