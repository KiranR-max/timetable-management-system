const mongoose = require('mongoose')
const yearSchema2 = new mongoose.Schema({
    NAME: {
        type: String

    },
    CSEA3: {
        type: String,
        default: ''

    },
    CSEB3: {
        type: String,
        default: ''

    },
    CSEC3: {
        type: String,
        default: ''

    }

});
const year2 = mongoose.model('year2', yearSchema2)

module.exports = year2