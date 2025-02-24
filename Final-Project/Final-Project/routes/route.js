const express = require("express")
const route = express.Router();
const ctl = require("../controllers/ctl")

route.get("/",ctl.login);
route.get("/register",ctl.register);
route.get("/dashboard",ctl.dashboard);
route.post("/register",ctl.registerData);
route.post("/login",ctl.loginData);


route.get("/product",ctl.product);
route.post("/addProduct",ctl.addProduct);
route.get("/deleteProduct",ctl.deleteProduct);
route.get("/editProduct",ctl.editProduct);
route.post("/updateProduct",ctl.updateProduct)

module.exports = route;