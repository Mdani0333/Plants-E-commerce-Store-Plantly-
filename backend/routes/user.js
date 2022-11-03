const router = require("express").Router();
const { User, validate } = require("../models/user");
const bcrypt = require("bcrypt");
const { VerifyUserToken, VerifyAdminToken } = require("../jwt/Auth");
const jwt = require("jsonwebtoken");

//user signUp
router.post("/signUp", async (req, res) => {
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

//user Login
router.post("/login", async (req, res) => {
  try {
    const { error } = validate(req.body);
    if (error)
      return res.status(400).send({ message: error.details[0].message });

    const user = await User.findOne({ email: req.body.email });
    if (!user)
      return res.status(401).send({ message: "invalid Email or Password" });

    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!validPassword)
      return res.status(401).send({ message: "invalid email or password" });

    const userToken = jwt.sign(
      { userId: user._id, tokenType: "USER" },
      process.env.JWT_PRIVATE_KEY,
      {
        expiresIn: "7d",
      }
    );
    res.status(200).send({
      token: userToken,
      user: user,
      message: "Logged in Successfully",
    });
  } catch (error) {
    res.status(500).send({ message: "Server Error" });
  }
});

//getting all users
router.get("/all-users", VerifyAdminToken, async (req, res) => {
  try {
    const allusers = await User.find().limit(20);
    res.status(201).send(allusers);
  } catch (error) {
    res.status(500).send({ message: "Server Error" });
  }
});

//getting a single user
router.get("/get", VerifyUserToken, async (req, res) => {
  try {
    const user = await User.findById(req.headers.userId);
    res.status(201).send(user);
  } catch (error) {
    res.status(500).send({ message: "Server Error" });
  }
});

//deleting a single user
router.delete("/delete/:id", VerifyAdminToken, async (req, res) => {
  try {
    await User.deleteOne({ _id: req.params.id });
    res.status(201).send({ message: "deleted!" });
  } catch (error) {
    res.status(500).send({ message: "Server Error" });
  }
});

//updating cart of a single user
router.patch("/cart", VerifyUserToken, async (req, res) => {
  try {
    if (req.body.method === "PUSH") {
      await User.updateOne(
        { _id: req.headers.userId },
        { $push: { cart: req.body.cart } }
      );
    } else if (req.body.method === "PULL") {
      await User.updateOne(
        { _id: req.headers.userId },
        { $pull: { cart: _id } }
      );
    }
    res.status(201).send({ message: "Added!" });
  } catch (error) {
    res.status(500).send({ message: "Server Error" });
  }
});

//updating favourites of a single user
router.patch("/fav", VerifyUserToken, async (req, res) => {
  try {
    if (req.body.method === "PUSH") {
      await User.updateOne(
        { _id: req.headers.userId },
        { $push: { favourites: req.body.cart } }
      );
    } else if (req.body.method === "PULL") {
      await User.updateOne(
        { _id: req.headers.userId },
        { $pull: { favourites: _id } }
      );
    }
    res.status(201).send({ message: "Added!" });
  } catch (error) {
    res.status(500).send({ message: "Server Error" });
  }
});

module.exports = router;
