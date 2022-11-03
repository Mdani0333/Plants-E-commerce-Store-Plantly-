const jwt = require("jsonwebtoken");
const { Admin } = require("../models/admin");
const { Gardener } = require("../models/gardener");
const { User } = require("../models/user");

//verify User Token
const VerifyUserToken = async (req, res, next) => {
  try {
    if (req.headers.authorization) {
      const result = req.headers.authorization.split(" ");
      if (result[0] == "Bearer") {
        const decode = jwt.verify(result[1], process.env.JWT_PRIVATE_KEY);
        if (decode.tokenType == "USER") {
          const user = await User.findById(decode.userId);
          if (user) {
            req.headers.userId = user._id;
            next();
          } else {
            res
              .status(401)
              .send({ message: "This user is no longer existed!" });
          }
        } else {
          res.status(401).send({ message: "Only users are allowed!" });
        }
      } else {
        res.status(400).send({ message: "Bad Request!" });
      }
    } else {
      res.status(400).send({ message: "Token is missing!" });
    }
  } catch (error) {
    res.status(500).send({ Error: error });
  }
};

//verify Admin Token
const VerifyAdminToken = async (req, res, next) => {
  try {
    if (req.headers.authorization) {
      const result = req.headers.authorization.split(" ");
      if (result[0] == "Bearer") {
        const decode = jwt.verify(result[1], process.env.JWT_PRIVATE_KEY);
        if (decode.tokenType == "ADMIN") {
          const admin = await Admin.findById(decode.adminId);
          if (admin) {
            req.headers.adminId = admin._id;
            next();
          } else {
            res
              .status(401)
              .send({ message: "This admin is no longer existed!" });
          }
        } else {
          res.status(401).send({ message: "Only admins are allowed!" });
        }
      } else {
        res.status(400).send({ message: "Bad Request!" });
      }
    } else {
      res.status(400).send({ message: "Token is missing!" });
    }
  } catch (error) {
    res.status(500).send({ Error: error });
  }
};

//verify Gardener Token
const VerifyGardenerToken = async (req, res, next) => {
  try {
    if (req.headers.authorization) {
      const result = req.headers.authorization.split(" ");
      if (result[0] == "Bearer") {
        const decode = jwt.verify(result[1], process.env.JWT_PRIVATE_KEY);
        if (decode.tokenType == "GARDENER") {
          const gardener = await Gardener.findById(decode.gardenerId);
          if (gardener) {
            req.headers.gardenerId = gardener._id;
            next();
          } else {
            res
              .status(401)
              .send({ message: "This gardener is no longer existed!" });
          }
        } else {
          res.status(401).send({ message: "Only gardeners are allowed!" });
        }
      } else {
        res.status(400).send({ message: "Bad Request!" });
      }
    } else {
      res.status(400).send({ message: "Token is missing!" });
    }
  } catch (error) {
    res.status(500).send({ Error: error });
  }
};

module.exports = { VerifyUserToken, VerifyAdminToken, VerifyGardenerToken };
