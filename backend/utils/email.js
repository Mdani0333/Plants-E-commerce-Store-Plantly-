var nodemailer = require("nodemailer");
const transporter = nodemailer.createTransport({
  service: "gmail",
  secureConnection: true,
  auth: {
    user: process.env.GMAIL_ACCOUNT,
    pass: process.env.GMAIL_PASSWORD,
  },
});

//sending mail on order placement
const orderConfirmationEmail = async (orderNo, user, req) => {
  var arrayItems = "";
  req.body.products.forEach((element) => {
    arrayItems +=
      "<p>" +
      element.specie +
      " " +
      element.name +
      " " +
      element.price +
      "*" +
      element.quantity +
      " " +
      "</p>";
  });

  transporter.sendMail(
    {
      from: '"Plantly" <noReply@gmail.com>',
      to: `adnanmanzoor1965@gmail.com, ${user.email}`,
      subject: "#Order Info",
      html: `<!DOCTYPE html>
        <html>
        <head>
            <title>Order Info</title>
        </head>
        <body>
            <h1>Your order was placed!</h1>
            <h2>Here are some Details:</h2>
            <h3>Username: ${user.name}</h3>
            <h3>Email: ${user.email}</h3>
            <h3>Order# ${orderNo}</h3>
            <div>${arrayItems}</div>
            <p><strong>Sum: </strong>Rs ${req.body.total}</p>
            <p>shipping cost: Rs${req.body.shippingCost}</p>
            <p><strong>Total: Rs${
              req.body.total + req.body.shippingCost
            }</strong></p>
            <h3>>Shipping details</h3>
            <p><strong>Address:</strong> ${req.body.address}</p>
            <p><strong>Zip-Code:</strong> ${req.body.zipCode}</p>
            <p><strong>Contact Number:</strong> ${req.body.phoneNo}</p>
            <p><strong>Note:</strong> ${req.body.note}</p>
            <h3>>Payment details</h3>
            <p><strong>Payment Type:</strong> "${req.body.paymentType}"</p>
            <p><strong>Current Status</strong> is "${req.body.status}"</p>
           
            <strong>Thank You!</strong>
            <strong>Happy Shopping!</strong>
        </body>
        </html>`,
    },
    function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log({ message: "Email Sent", Response: info.response });
      }
    }
  );
};

//sending verification code through email
const verificationCodeEmail = async (code, req) => {
  transporter.sendMail(
    {
      from: '"Plantly" <noReply@gmail.com>',
      to: `${req.body.email}`,
      subject: "Email Verification",
      html: `<!DOCTYPE html>
      <html>
      <head>
          <title>Verification Code</title>
      </head>
      <body>
          <h2>Hi, ${req.body.name}</h2>
          <h3>Your 4 digit Email Verification code is:</h3>
          <h2>${code}</h2>
      </body>
      </html>`,
    },
    function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log({ message: "Email Sent", Response: info.response });
      }
    }
  );
};

module.exports = { orderConfirmationEmail, verificationCodeEmail };
