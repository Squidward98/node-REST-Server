require('./config/config');

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');

// ================================================

const app = express();

// ================================================

// Parse application/x-www-form-urlencoded.

app.use(bodyParser.urlencoded({ extended: false }));
 
// Parse application/json.

app.use(bodyParser.json());

//Enable the public folder.

app.use(express.static(path.resolve(__dirname, '../public')));

app.use(require('./routes/index'));

mongoose.connect(process.env.URLDB, { useNewUrlParser: true, useCreateIndex: true }, (err, res) => {
    if(err) throw err;
    console.log('Database ONLINE');
});

app.listen(process.env.PORT, () => console.log(`Example app listening on port ${ process.env.PORT }!`));