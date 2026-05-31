export default async function handler(req, res) {

res.writeHead(302, {
Location:
"https://pay.kushalonline.com/treatment-success.html"
});

res.end();

}
