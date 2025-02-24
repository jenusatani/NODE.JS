const mongoose = require("mongoose")

const schema = mongoose.Schema({
    proName : {
        type : String,
        required : true
    },
    proPrice : {
        type : String,
        required : true
    },
    proDiscription : {
        type : String,
        required : true
    }
});

const firstschema = mongoose.model("Products-Detail",schema);

module.exports = firstschema;