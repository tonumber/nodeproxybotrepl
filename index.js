const http = require('http');
const fetch = require('node-fetch');
console.clear()
var lastport = 3001
let url = "https://www.google.com"
http.createServer((req, res) => {

  let body = '';
  req.on('data', chunk => {
    //console.log('chunk');
    body += chunk;
  });
  req.on('end', () => {
    let oldHost = req.headers.host;
    req.headers.host = url.replace('https://', '');
    let ref = req.headers.referer;
    if('referer' in req.headers)
      req.headers.referer = req.headers.referer.replace(oldHost, url.replace('https://', '')).replace('repl.it', url.replace('https://', '')).replace('node-proxy.agkemp.repl.co', url.replace('https://', ''));
    if('origin' in req.headers)
      req.headers.origin = req.headers.origin.replace(oldHost, url.replace('https://', '')).replace('repl.it', url.replace('https://', '')).replace('node-proxy.agkemp.repl.co', url.replace('https://', ''));
    fetch(url + req.url, {
    "headers": req.headers,
    "body": req.method=='POST'?body:null,
    "method": req.method,
    "mode": "cors",
    "referrer": ref?ref.replace(oldHost, url.replace('https://', '')).replace('repl.it', url.replace('https://', '')).replace('node-proxy.agkemp.repl.co', url.replace('https://', '')):null
    }).then(n=>{
      let headers = {};
      for (var pair of n.headers.entries()) {
        if(!['content-encoding', 'transfer-encoding', 'content-length', 'connection', 'via'].includes(pair[0]))
        headers[pair[0]] = pair[1];
      }
      res.writeHead(n.status, headers);
      return n.arrayBuffer();
    }).then(n=>{
      res.end(Buffer.from(n))
    }).catch(console.log);
  });
  
}).listen(3000);
function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}   

const discord = require('discord.js')

const client = new discord.Client()
client.on("ready", () =>{
  console.log("logged in xdxd")
})

client.on("message", async m =>{
  if (m.content.substr(0,"!proxy".length)== "!proxy"){
    var args = m.content.split(" ").slice(1)
    url = args[0]
    if (url.substr((url.length)-1, url.length) == "/" ) {console.log("omg discord");url = url.substr(0,(url.length)-1)}
    http.createServer((req, res) => {

  let body = '';
  req.on('data', chunk => {
    //console.log('chunk');
    body += chunk;
  });
  req.on('end', () => {
    let oldHost = req.headers.host;
    req.headers.host = url.replace('https://', '');
    let ref = req.headers.referer;
    if('referer' in req.headers)
      req.headers.referer = req.headers.referer.replace(oldHost, url.replace('https://', '')).replace('repl.it', url.replace('https://', '')).replace('node-proxy.agkemp.repl.co', url.replace('https://', ''));
    if('origin' in req.headers)
      req.headers.origin = req.headers.origin.replace(oldHost, url.replace('https://', '')).replace('repl.it', url.replace('https://', '')).replace('node-proxy.agkemp.repl.co', url.replace('https://', ''));
    fetch(url + req.url, {
    "headers": req.headers,
    "body": req.method=='POST'?body:null,
    "method": req.method,
    "mode": "cors",
    "referrer": ref?ref.replace(oldHost, url.replace('https://', '')).replace('repl.it', url.replace('https://', '')).replace('node-proxy.agkemp.repl.co', url.replace('https://', '')):null
    }).then(n=>{
      let headers = {};
      for (var pair of n.headers.entries()) {
        if(!['content-encoding', 'transfer-encoding', 'content-length', 'connection', 'via'].includes(pair[0]))
        headers[pair[0]] = pair[1];
      }
      res.writeHead(n.status, headers);
      return n.arrayBuffer();
    }).then(n=>{
      res.end(Buffer.from(n))
    }).catch(console.log);
  });
  
}).listen(lastport);
lastport++
    m.reply("Set! go to https://"+process.env.REPL_SLUG+"."+process.env.REPL_OWNER+".repl.co/")
  }
})
client.login("bot token")
