const express = require("express");
const port = 1008;

const app = express();

const db = require("./config/db")

app.use(express.urlencoded())
app.set("view engine","ejs");

app.use("/",require("./routes/route"));

app.listen(port,(err)=>{
    err ? console.log(err) : console.log("Server Started on Port" + port);
})