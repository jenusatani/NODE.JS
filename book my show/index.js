const express = require("express");
const path = require("path");
const port = 1008;
const app = express();

const db = require("./config/db");
const schema = require("./model/firstschema");
const multer = require("multer");
const fs = require("fs");

app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: true }));

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

const Storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/");
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + "_" + Date.now());
    },
});

const upload = multer({ storage: Storage }).single("image");

app.get('/', async (req, res) => {
    const showForm = req.query.showForm === 'true';
    const Movie = await schema.find({});
    
    res.render('index', { showForm, Movie });
});

app.post("/adddata", upload, async (req, res) => {
    req.body.image = `/uploads/${req.file.filename}`;
    await schema.create(req.body);
    res.redirect("/");
});

app.get("/deletedata", async (req, res) => {
    let singledata = await schema.findById(req.query.id);
    try {
        fs.unlinkSync(singledata.image);
    } catch (err) {
        console.error("Error deleting file:", err);
    }
    await schema.findByIdAndDelete(req.query.id);
    res.redirect("/");
});

app.get("/editdata", async (req, res) => {
    let singledata = await schema.findById(req.query.id);
    res.render("edit", { singledata });
});

app.post("/updatedata", upload, async (req, res) => {
    let singledata = await schema.findById(req.body.id);
    let image = req.file ? `/uploads/${req.file.filename}` : singledata.image;

    if (req.file && singledata.image) {
        try {
            fs.unlinkSync(singledata.image);
        } catch (err) {
            console.error("Error deleting file:", err);
        }
    }

    req.body.image = image;
    await schema.findByIdAndUpdate(req.body.id, req.body);
    res.redirect("/");
});

app.get('/adddata', (req, res) => {
    res.render('adddata');
});

app.post('/adddata', (req, res) => {
});


app.listen(port, (err) => {
    if (err) {
        console.log("Server error:", err);
    } else {
        console.log("Server started on port number " + port);
    }
});
