const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const todoHandler = require('./routeHandler/todoHandler');
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
app.use('/todo', todoHandler)

// default error handler
function errorHandler(err, req, res, next) {
    if (res.headerSent) {
        return next(err)
    }
    res.status(500).json({ error: err })
}


app.listen(3000, () => {
    console.log('Listenting to the port 3000')
})