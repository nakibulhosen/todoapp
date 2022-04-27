const mongoose = require('mongoose');
const todoSchema = require('../Schemas/todoSchema');

const Todo = new mongoose.model("Todo", todoSchema);

module.exports = Todo;