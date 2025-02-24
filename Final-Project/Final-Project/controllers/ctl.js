const schema = require("../model/schema");
const productSchema = require("../model/productSchema")

module.exports.login = async (req, res) => {
    res.render("login")
}

module.exports.registerData = async (req, res) => {
    await schema.create(req.body)
        .then((data) => {
            res.redirect("/");
        })
}

module.exports.register = async (req, res) => {
    res.render("register")
}

module.exports.dashboard = async (req, res) => {
    await productSchema.find({})
        .then((data) => {
            res.render("dashboard", {data})
        })
}

module.exports.loginData = async (req, res) => {
    let user = await schema.findOne({ email: req.body.email })

    if (!user) {
        console.log("Usr Not Found !");
        res.redirect("/")
    }
    else {
        if (user.password == req.body.password) {
            res.redirect("/dashboard")
        }
        else {
            console.log("Password Not Match !");
        }
    }
}

module.exports.product = async (req,res)=>{
    res.render("addProduct")
}

module.exports.addProduct = async (req,res)=>{
    console.log(req.body);
    
    await productSchema.create(req.body)
    .then((data)=>{
        res.redirect("/dashboard")
    })
}

module.exports.deleteProduct = async  (req,res)=>{
    await productSchema.findByIdAndDelete(req.query.id)
    res.redirect("/dashboard")
}

module.exports.editProduct = async (req,res)=>{
    await productSchema.findById(req.query.id)
    .then((data)=>{
        res.render("editProduct",{data})
    })
}

module.exports.updateProduct = async (req,res)=>{
    await productSchema.findByIdAndUpdate(req.body.id,req.body)
    .then((data)=>{
        res.redirect("/dashboard")
    })
}
