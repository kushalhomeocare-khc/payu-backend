import crypto from "crypto";

export default async function handler(req, res) {
res.setHeader("Access-Control-Allow-Origin", "*");
res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
res.setHeader("Access-Control-Allow-Headers", "Content-Type");

if (req.method === "OPTIONS") {
return res.status(200).end();
}
  
if (req.method !== "POST") {

return res.status(405).json({
error: "Method Not Allowed"
});

}

try {

const body =
typeof req.body === "string"
? JSON.parse(req.body)
: req.body;

const {
planid,
txnid,
firstname,
email
} = body;

const MERCHANT_KEY = "lAaXBo";

const SALT = "HUZnR2ZwvvareYCbhlhpQeA9uZQdgB6m";

let amount = "";
let productinfo = "";

if (planid === "CONSULT") {

amount = "1000";
productinfo = "Consultation Fee";

}

else if (planid === "2MTP") {

amount = "34";
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

let surl = "";
let furl = "";

if (planid === "CONSULT") {

surl =
"https://payu-backend-ruby.vercel.app/api/consult-success";

}

else {

surl =
"https://payu-backend-ruby.vercel.app/api/payment-success";

}

furl =
"https://payu-backend-ruby.vercel.app/api/payment-failure";


const hashString =
`${MERCHANT_KEY}|${txnid}|${amount}|${productinfo}|${firstname}|${email}|||||||||||${SALT}`;

const hash = crypto
.createHash("sha512")
.update(hashString)
.digest("hex");

return res.status(200).json({

key: MERCHANT_KEY,

txnid,

amount,

productinfo,

firstname,

email,

hash,

surl,

furl

});

}

catch (error) {

console.log(error);

return res.status(500).json({
error: "Hash generation failed"
});

}

}
