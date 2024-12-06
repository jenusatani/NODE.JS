const http = require ("http");
const port = 19005;

const porthandler = (req,res)=>{
     res.write("<h1>Server Started</h1>");
     res.end();
}

const Server = http.createServer(porthandler);


Server.listen(port,(err)=>{
    err ? console.log(err) : console.log("Server Started On POrt :" + port)
})

