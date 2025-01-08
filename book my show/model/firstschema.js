const mongoose = require('mongoose');

const schema = mongoose.Schema({

    name: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        required: true
    },
    image: {
        type: String,
        required: true
    }
});

const firstschema = mongoose.model("firstschema", schema);
module.exports = firstschema;