export default async function handler(req, res) {

res.writeHead(302, {
Location:
"https://pay.kushalonline.com/payment-success.html"
});

res.end();

}
