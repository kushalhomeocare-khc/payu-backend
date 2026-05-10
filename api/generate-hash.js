const crypto = require("crypto");

module.exports = async (req, res) => {

  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST");

  if (req.method !== "POST") {
    return res.status(405).send("Method Not Allowed");
  }

  const MERCHANT_KEY = "lAaXBo";
  const SALT = "HUZnR2ZwvvareYCbhlhpQeA9uZQdgB6m";

  const body =
typeof req.body === "string"
? JSON.parse(req.body)
: req.body;

const { planid } = body;

  let amount = "";
  let productinfo = "";

  if (planid === "CONSULTATION") {
    amount = "1000";
    productinfo = "Consultation Fee";
  }

  else if (planid === "2MTP") {
    amount = "3400";
    productinfo = "2 Months Treatment Plan";
  }

  else if (planid === "4MTP") {
    amount = "5200";
    productinfo = "4 Months Treatment Plan";
  }

  else if (planid === "6MTP") {
    amount = "7200";
    productinfo = "6 Months Treatment Plan";
  }

  else if (planid === "12MTP") {
    amount = "10800";
    productinfo = "12 Months Treatment Plan";
  }

  else {
    return res.status(400).json({
      error: "Invalid Plan"
    });
  }

  const txnid = "TXN" + Date.now();

  const firstname = "Patient";
  const email = "patient@example.com";
  const phone = "9876543210";

  const hashString =
`${MERCHANT_KEY}|${txnid}|${amount}|${productinfo}|${firstname}|${email}||||||||||${SALT}`;
  const hash = crypto
    .createHash("sha512")
    .update(hashString)
    .digest("hex");

let surl = "";
let furl = "";

if (planid === "CONSULTATION") {

  surl = "https://payu-backend-ruby.vercel.app/consult-success";
  furl = "https://payu-backend-ruby.vercel.app/payment-failure";

} else {

  surl = "https://payu-backend-ruby.vercel.app/payment-success";
  furl = "https://payu-backend-ruby.vercel.app/payment-failure";

}

res.status(200).json({
  key: MERCHANT_KEY,
  txnid,
  amount,
  firstname,
  email,
  phone,
  productinfo,
  hash,
  surl,
  furl
});

};
