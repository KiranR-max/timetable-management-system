const mongoose = require('mongoose')
const yearclassSchema4 = new mongoose.Schema({
    NAME: {
        type: String


    },
    MONDAY: {
        one: {
            type: String,
            default: ''

        },
        two: {
            type: String,
            default: ''

        },
        three: {
            type: String,
            default: ''

        },
        four: {
            type: String,
            default: ''

        },
        five: {
            type: String,
            default: ''

        },
        six: {
            type: String,
            default: ''

        },
        seven: {
            type: String,
            default: ''

        },
        eight: {
            type: String,
            default: ''

        }
    },


    TUESDAY: {
        one: {
            type: String,
            default: ''

        },
        two: {
            type: String,
            default: ''

        },
        three: {
            type: String,
            default: ''

        },
        four: {
            type: String,
            default: ''

        },
        five: {
            type: String,
            default: ''

        },
        six: {
            type: String,
            default: ''

        },
        seven: {
            type: String,
            default: ''

        },
        eight: {
            type: String,
            default: ''

        }
    },

    WEDNESDAY: {
        one: {
            type: String,
            default: ''

        },
        two: {
            type: String,
            default: ''

        },
        three: {
            type: String,
            default: ''

        },
        four: {
            type: String,
            default: ''

        },
        five: {
            type: String,
            default: ''

        },
        six: {
            type: String,
            default: ''

        },
        seven: {
            type: String,
            default: ''

        },
        eight: {
            type: String,
            default: ''

        }
    },

    THURSDAY: {
        one: {
            type: String,
            default: ''

        },
        two: {
            type: String,
            default: ''

        },
        three: {
            type: String,
            default: ''

        },
        four: {
            type: String,
            default: ''

        },
        five: {
            type: String,
            default: ''

        },
        six: {
            type: String,
            default: ''

        },
        seven: {
            type: String,
            default: ''

        },
        eight: {
            type: String,
            default: ''

        }
    },

    FRIDAY: {
        one: {
            type: String,
            default: ''

        },
        two: {
            type: String,
            default: ''

        },
        three: {
            type: String,
            default: ''

        },
        four: {
            type: String,
            default: ''

        },
        five: {
            type: String,
            default: ''

        },
        six: {
            type: String,
            default: ''

        },
        seven: {
            type: String,
            default: ''

        },
        eight: {
            type: String,
            default: ''

        }
    },

    SATURDAY: {
        one: {
            type: String,
            default: ''

        },
        two: {
            type: String,
            default: ''

        },
        three: {
            type: String,
            default: ''

        },
        four: {
            type: String,
            default: ''

        },

        five: {
            type: String,
            default: ''

        },
        six: {
            type: String,
            default: ''

        },
        seven: {
            type: String,
            default: ''

        },
        eight: {
            type: String,
            default: ''

        }
    }

})
const yearclass4 = mongoose.model('yearclass4', yearclassSchema4)
module.exports = yearclass4