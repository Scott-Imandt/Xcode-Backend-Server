const express = require('express');
require('dotenv').config()

const routes = require('./routes/routes.js')
const mongoose = require('mongoose')

//express app
const app = express();

app.use(express.json());

//Logger middleware
app.use((req, res, next) => {
    console.log(req.path, req.method);
    next();
})

// routes
app.use('/api', routes);

//connect to DB
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        //listen for request
        app.listen(process.env.PORT, () => {
            console.log('Connected to DB & Listening on port', process.env.PORT)
        })
    })
    .catch((error) => { console.log(error) })


