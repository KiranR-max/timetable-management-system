const mongoose = require('mongoose')
const yearSchema3 = new mongoose.Schema({
    NAME: {
        type: String


    },
    CSEA5: {
        type: String,
        default: ''

    },
    CSEB5: {
        type: String,
        default: ''

    },
    CSEC5: {
        type: String,
        default: ''

    }
});
const year3 = mongoose.model('year3', yearSchema3)

module.exports = year3