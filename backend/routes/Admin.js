const router = require("express").Router();
const { Admin, validate } = require("../models/admin");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//admin signUp
router.post("/signUp", async (req, res) => {
  try {
    const { error } = validate(req.body);
    if (error)
      return res.status(400).send({ message: error.details[0].message });

    const admin = await Admin.findOne({ email: req.body.email });
    if (admin)
      return res
        .status(409)
        .send({ message: "User with given email already exists!" });

    const salt = await bcrypt.genSalt(Number(process.env.SALT));
    const hashPassword = await bcrypt.hash(req.body.password, salt);

    await new Admin({ ...req.body, password: hashPassword }).save();
    res.status(201).send({ message: "Admin created successfully!" });
  } catch (error) {
    res.status(500).send({ message: "Server Error" });
  }
});

//admin Login
router.post("/login", async (req, res) => {
  try {
    if (req.body.email) {
      const admin = await Admin.findOne({ email: req.body.email });
      if (!admin)
        return res.status(401).send({ message: "invalid Email" });

      if (req.body.password) {
        const validPassword = await bcrypt.compare(
          req.body.password,
          admin.password
        );
        if (!validPassword)
          return res.status(401).send({ message: "invalid password" });

        const adminToken = jwt.sign(
          { adminId: admin._id, tokenType: "ADMIN" },
          process.env.JWT_PRIVATE_KEY,
          {
            expiresIn: "7d",
          }
        );
        res.status(200).send({
          Token: adminToken,
          Role: "ADMIN",
          Admin: admin,
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

module.exports = router;
