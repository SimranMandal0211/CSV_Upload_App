const express = require('express');
const app = express();
const port = 8000;

const expressLayouts = require('express-ejs-layouts');


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

// router
app.use('/', require('./routes'));

// ---Port Start ---
app.listen(port, () => {
    console.log(`My server start on this port ${port}`)
})