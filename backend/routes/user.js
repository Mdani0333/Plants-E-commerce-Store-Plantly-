const router = require("express").Router();
const { User, validate } = require("../models/user");
const Products = require("../models/product");
const bcrypt = require("bcrypt");
const { VerifyUserToken, VerifyAdminToken } = require("../jwt/Auth");
const jwt = require("jsonwebtoken");
const {
  orderConfirmationEmail,
  verificationCodeEmail,
} = require("../utils/email");
const ShortUniqueId = require("short-unique-id");

const orderNumber = new ShortUniqueId({
  dictionary: "alphanum_upper",
  shuffle: false,
  length: 16,
});
const emailVerificationCode = new ShortUniqueId({
  dictionary: "alphanum_upper",
  shuffle: true,
  length: 4,
});

//SignUp email Verification
router.post("/email-verification", async (req, res) => {
  if (req.body.email) {
    const user = await User.findOne({ email: req.body.email });
    if (user)
      return res
        .status(409)
        .send({ message: "User with given email already exists!" });

    const code = emailVerificationCode();
    verificationCodeEmail(code, req);
    res.status(200).send({ verificationCode: code });
  } else {
    res.status(400).send({ message: "email is required!" });
  }
});

//user signUp
router.post("/signUp", async (req, res) => {
  try {
    const { error } = validate(req.body);
    if (error)
      return res.status(400).send({ message: error.details[0].message });

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
    if (req.body.email) {
      const user = await User.findOne({ email: req.body.email });
      if (!user) return res.status(401).send({ message: "invalid Email" });

      if (req.body.password) {
        const validPassword = await bcrypt.compare(
          req.body.password,
          user.password
        );
        if (!validPassword)
          return res.status(401).send({ message: "invalid password" });

        const userToken = jwt.sign(
          { userId: user._id, tokenType: "USER" },
          process.env.JWT_PRIVATE_KEY,
          {
            expiresIn: "7d",
          }
        );
        res.status(200).send({
          Token: userToken,
          User: user,
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
    if (req.body.method == "PUSH") {
      req.body.product.quantity = 1;
      await User.updateOne(
        { _id: req.headers.userId },
        { $push: { cart: req.body.product } }
      );
      const user = await User.findById(req.headers.userId);
      res.status(201).send({ user: user, message: "Added!" });
    } else if (req.body.method == "PULL") {
      await User.updateOne(
        { _id: req.headers.userId },
        { $pull: { cart: { _id: req.body.id } } }
      );
      const user = await User.findById(req.headers.userId);
      res.status(201).send({ user: user, message: "Removed!" });
    }
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
        { $push: { favourites: req.body.product } }
      );
      const user = await User.findById(req.headers.userId);
      res.status(201).send({ user: user, message: "Added!" });
    } else if (req.body.method === "PULL") {
      await User.updateOne(
        { _id: req.headers.userId },
        { $pull: { favourites: { _id: req.body.id } } }
      );
      const user = await User.findById(req.headers.userId);
      res.status(201).send({ user: user, message: "Removed!" });
    }
  } catch (error) {
    res.status(500).send({ message: "Server Error" });
  }
});

//updating username or password
router.patch("/changePassword", VerifyUserToken, async (req, res) => {
  try {
    if (req.body.name) {
      if (req.body.oldPassword && req.body.newPassword) {
        const user = await User.findById(req.headers.userId);
        const validPassword = await bcrypt.compare(
          req.body.oldPassword,
          user.password
        );
        if (!validPassword)
          return res.status(401).send({ message: "invalid Old Password" });

        const salt = await bcrypt.genSalt(Number(process.env.SALT));
        const hashPassword = await bcrypt.hash(req.body.newPassword, salt);

        await User.updateOne(
          { _id: req.headers.userId },
          { name: req.body.name, password: hashPassword }
        );
        res.status(200).send({ message: "updated!" });
      } else {
        res.status(401).send({ message: "Password fields can't be empty!" });
      }
    } else {
      res.status(401).send({ message: "Name can't be empty!" });
    }
  } catch (error) {
    res.status(500).send({ message: "Server Error" });
  }
});

//increment or decrement quantity
router.patch("/cart/quantity", VerifyUserToken, async (req, res) => {
  if (req.body.method === "INC") {
    await User.updateOne(
      { _id: req.headers.userId, "cart._id": req.body.id },
      { $inc: { "cart.$.quantity": 1 } }
    );
    const user = await User.findById(req.headers.userId);
    res.status(201).send(user);
  } else if (req.body.method === "DEC") {
    await User.updateOne(
      { _id: req.headers.userId, "cart._id": req.body.id },
      { $inc: { "cart.$.quantity": -1 } }
    );
    const user = await User.findById(req.headers.userId);
    res.status(201).send(user);
  }
});

//Order placement
router.post("/order-placement", VerifyUserToken, async (req, res) => {
  try {
    req.body.orderNo = orderNumber();
    req.body.date = new Date();

    //decresing instock on basis of products quantity in cart
    for (let i = 0; i < req.body.products.length; i++) {
      await Products.updateOne(
        { _id: req.body.products[i]._id },
        { $inc: { instock: -req.body.products[i].quantity } }
      );
    }
    //creating shopping history
    await User.updateOne(
      { _id: req.headers.userId },
      { $push: { shoppingHistory: req.body } }
    );
    //setting cart to empty
    await User.updateOne({ _id: req.headers.userId }, { $set: { cart: [] } });
    const user = await User.findById(req.headers.userId);

    orderConfirmationEmail(orderNumber(), user, req);

    res.status(201).send({ user: user, message: "Your Order is Placed!" });
  } catch (error) {
    res.status(400).send({ message: "Server Error!" });
  }
});

//manage Orders status
router.patch("/manage-orders", VerifyAdminToken, async (req, res) => {
  await User.updateOne(
    { _id: req.body.userId, "shoppingHistory._id": req.body.orderId },
    { $set: { "shoppingHistory.$.status": req.body.status } }
  );

  const user = await User.findById(req.body.userId);

  res.status(200).send({ user: user });
});

module.exports = router;
