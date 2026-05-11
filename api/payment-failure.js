export default async function handler(req, res) {

res.writeHead(302, {
Location:
"https://kushalonline.com/payment-failure"
});

res.end();

}
