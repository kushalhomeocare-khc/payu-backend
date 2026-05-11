export default async function handler(req, res) {

res.writeHead(302, {
Location:
"https://kushalonline.com/consult-success"
});

res.end();

}
