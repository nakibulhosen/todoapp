const mongoose = require('mongoose');

const todoSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
        error: 'title is required'
    },
    description: String,
    status: {
        type: String,
        enum: ['active', 'inactive']
    },
    date: {
        type: Date,
        default: Date.now,
    }
});

// instacne method 
todoSchema.methods = {
    findActive: function () {
        return mongoose.model("Todo").find({ status: 'active' })
    },
    findActiveCallback: function (callback) {
        return mongoose.model("Todo").find({ status: 'active' }, callback)
    }
}

// static methods
todoSchema.statics = {
    findByJS: function () {
        return this.find({ title: /js/i });
    }
}
module.exports = todoSchema;