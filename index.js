require('dotenv').config()
const express = require('express');
const app = express();
const port = 8000;


const db = require('./config/mongoose');
const expressLayouts = require('express-ejs-layouts');
const session = require('express-session');
const flash = require('connect-flash');

const customMware = require('./config/middleware');


// middleware to use assets
app.use(express.static('./assets'));
app.use(express.urlencoded());
app.use(expressLayouts);

// extract styles and scripts from layouts
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);

// setting view engine as ejs
app.set('view engine', 'ejs');
app.set('views', './views');


// ---Database connection---
const { connectMongoose } = require('./config/mongoose');
connectMongoose();

// to create an dues sessions
app.use(session({
    secret: process.env.SECRET,
    saveUninitialized: true,
    resave: true
}));

// uisng connect-flash to display flash notification in FE
app.use(flash());
app.use(customMware.setFlash);

// router
app.use('/', require('./routes'));

// ---Port Start ---
app.listen(port, () => {
    console.log(`My server start on this port ${port}`)
})