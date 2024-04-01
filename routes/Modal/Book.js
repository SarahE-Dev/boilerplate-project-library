//book schema

const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({

    title: {

        type: String,
        required: true

    },

    comments: {
        type: Array,
        default: []
    }

});

module.exports = mongoose.model('Book', bookSchema);