const mongoose = require('mongoose')
const yearschema1 = new mongoose.Schema({
    NAME: {
        type: String


    },
    CSEA1: {
        type: String,
        default: ''

    },
    CSEB1: {
        type: String,
        default: ''

    },
    CSEC1: {
        type: String,
        default: ''

    }
});
const year1 = mongoose.model('year1', yearschema1)

module.exports = year1