const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const todoHandler = require('./routeHandler/todoHandler');
const userHandler = require('./routeHandler/userHandler');
require('dotenv').config()
// initialize express app 
const app = express();
// add middleware 
app.use(cors());
app.use(express.json());

//connect with database with mongoose
mongoose.connect('mongodb://localhost/todos', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => {
        console.log('Database connection successful')
    })
    .catch((err) => {
        console.log('Error in connecting with database', err)
    })
// application routes
app.use('/todo', todoHandler);
app.use('/user', userHandler);

// default error handler
const errorHandler = (err, req, res, next) => {
    if (res.headerSent) {
        return next(err.message)
    }
    res.status(500).json({ error: err.message })
}

// app.use(errorHandler)

app.listen(3000, () => {
    console.log('Listenting to the port 3000')
})