const express = require('express');
require('dotenv').config();
const initRoutes = require('./router/index');
const db = require('./config/db/index');
const cookieParser = require('cookie-parser');

//


const app = express();
app.use(cookieParser());

const port = process.env.PORT || 8081;

db.connect();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

// method
initRoutes(app);

app.listen(port, () => {
    console.log("server in running");
})




// create -> post, put -> body
// get + delete -> query