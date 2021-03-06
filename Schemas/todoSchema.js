const mongoose = require('mongoose');

const todoSchema = mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Title is required']
    },
    description: String,
    status: {
        type: String,
        enum: ['active', 'inactive'],
        require: [true, 'Invalid todo status'],
    },
    date: {
        type: Date,
        default: Date.now,
    },
    user: {
        type: mongoose.Types.ObjectId,
        ref: "User",
        required: [true, 'Invalid userid']
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
        return this.find({ title: /js/i }); // new RegEx("js","i")
    }
}

// query language
todoSchema.query = {
    byLanguage: function (language) {
        console.log('by lang', language)
        return this.find({ title: new RegExp(language, "i") }); // new RegExp()
    },
}
module.exports = todoSchema;