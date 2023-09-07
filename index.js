const express = require("express");
const app = express();

const QRCode = require("qrcode");
const genPayload = require("promptpay-qr");
const bodyParser = require("body-parser");
const _ = require("lodash");
const cors = require("cors");

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const server = app.listen(5000, () => {
  console.log("WTT Pay is running on port 5000");
});

app.post("/genqr", (req, res) => {
  const amount = parseFloat(_.get(req, ["body", "amount"]));
  const mobileNumber = "0898182239";
  const payload = genPayload(mobileNumber, { amount });
  const option = {
    color: {
      dark: "#000",
      light: "#fff",
    },
  };
  QRCode.toDataURL(payload, option, (err, url) => {
    if (err) {
      console.log("ERROR");
      return res.status(400).json({
        RespCode: 400,
        RespMessage: "Error",
      });
    } else {
      return res.status(200).json({
        RespCode: 200,
        RespMessage: "OK",
        Result: url,
      });
    }
  });
});

module.exports = app;
