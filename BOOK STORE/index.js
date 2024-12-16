const express = require("express");
let book = [];

const port = 1008;
const app = express();

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.render("index", { book });
});

app.post("/adddata", (req, res) => {
    req.body.id = String(Date.now());
    book.push(req.body);
    res.redirect("/");
});

app.get("/deletedata", (req, res) => {
    const deleteid = String(req.query.id);
    book = book.filter((el) => el.id !== deleteid);
    res.redirect("/");
});

app.get("/editdata", (req, res) => {
    const updateid = req.query.id;
    const singledata = book.find((item) => item.id === updateid);
    res.render("edit", { singledata });
});

app.post("/updatedata", (req, res) => {
    const updateid = req.body.id;

    book.forEach((e) => {
        if (e.id === updateid) {
            e.name = req.body.name;
            e.Author = req.body.Author;
            e.Price = req.body.Price;
            e.Date = req.body.Date;
            e.image = req.body.image;
        }
    });

    res.redirect("/");
});

app.listen(port, (err) => {
    if (err) {
        console.log("Server error:", err);
    } else {
        console.log("Server started on port number " + port);
    }
});
