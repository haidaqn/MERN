const express = require('express');
require('dotenv').config();
const port = process.env.PORT || 8081;
const app = express();
const router = require('./router/index');
const db = require('./config/db/index');

db.connect();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

// method
router(app);

app.listen(port, () => {
    console.log("server in running");
})