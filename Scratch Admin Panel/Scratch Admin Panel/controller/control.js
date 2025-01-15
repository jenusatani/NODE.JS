const fs = require("fs");
const Admin = require('../model/adminSchema');
const path = require('path');

module.exports.login = (req, res) => {
    if (req.cookies.adminData) {
        res.redirect('/dashboard');
    } else {
        res.render("login");
    }
}

module.exports.logout = (req, res) => {
    res.clearCookie("adminData");
    res.redirect("/");

}

module.exports.userLogin = async (req, res) => {
    console.log(req.body.email);
    let admin = await Admin.findOne({ email: req.body.email });
    console.log(admin)
    if (admin) {
        if (admin.password == req.body.passWord) {
            res.cookie("adminData", admin);
            res.redirect('/dashboard');
        } else {
            res.redirect("/");
        }
    } else {
        res.redirect("/");
    }
}


module.exports.dashboard = (req, res) => {
    req.cookies.adminData ? res.render("dashboard") : res.redirect("/");

}

module.exports.addAdmin = (req, res) => {
    req.cookies.adminData ? res.render('addAdmin') : res.redirect("/");
}

module.exports.addAdminData = async (req, res) => {
    console.log(req.body);
    console.log(req.file);

    req.body.image = req.file.path;
    await Admin.create(req.body).then((data) => {
        res.redirect("/addAdmin");
    });
}

module.exports.viewAdmin = (req, res) => {
    if (req.cookies.adminData) {
        Admin.find().then((data) => {
            res.render('viewAdmin', { data });
        })
    }else{
        res.redirect("/");
        alert("invaild email and password");
    }
}


module.exports.deleteAdmin = async (req, res) => {
    await Admin.findByIdAndDelete(req.query.id).then((data) => {
        fs.unlinkSync(data.image);
        res.redirect("/viewAdmin");
    })
}

module.exports.editAdmin = async (req, res) => {
    const data = await Admin.findById(req.query.id);
    res.render('editAdmin', { data });
}

module.exports.updateAdmin = async (req, res) => {
    let img = "";
    let singleData = await Admin.findById(req.body.id);
    req.file ? img = req.file.path : img = singleData.image;
    req.file && fs.unlinkSync(singleData.image);
    await Admin.findByIdAndUpdate(req.body.id, { ...req.body, image: img }).then((data) => {
        res.redirect("/viewAdmin");
    })
}