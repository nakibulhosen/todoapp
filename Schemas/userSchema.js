const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        message: 'name is required'
    },
    username: {
        type: String,
        required: true,
        message: 'Username is required'
    },
    password: {
        type: String,
        required: true,
        message: 'Password is not valid'
    },
    status: {
        type: String,
        enum: ['active', 'inactive']
    },
    todos: [
        {
            type: mongoose.Types.ObjectId,
            ref: "Todo"
        }
    ]

});

module.exports = userSchema;