const express = require('express');
require('dotenv').config();

const port = process.env.PORT || 8081;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/dang', (req,res)  => {
    res.json("hải đăng 1");
})

app.use('/', (req,res)  => {
    res.json("hải đăng");
})
app.listen(port, () => {
    console.log("server in running");
})