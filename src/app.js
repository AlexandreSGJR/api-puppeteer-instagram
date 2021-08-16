const express = require('express');
const app = express();
const router = express.Router();
//Rotas
const index = require('./routes/index');
const personRoute = require('./routes/personRoute');
const instagramRoute = require('./routes/instagramRoute');

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/', index);
app.use('/person', personRoute);
app.use('/insta', instagramRoute);
module.exports = app;
