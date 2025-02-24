const mongoose = require("mongoose")

const schema = mongoose.Schema({
    username : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true
    },
    password : {
        type : String,
        required : true
    }
});

const firstschema = mongoose.model("Product-Detail",schema);

module.exports = firstschema;