const mongoose = require('mongoose')
const yearSchema4 = new mongoose.Schema({
    NAME: {
        type: String

    },
    CSEA7: {
        type: String,
        default: ''

    },
    CSEB7: {
        type: String,
        default: ''

    },
    CSEC7: {
        type: String,
        default: ''

    }
});
const year4 = mongoose.model('year4', yearSchema4)

module.exports = year4