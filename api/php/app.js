"use strict"

require("dotenv").config()
require("./db_config/db.connection");
const songRouter = require("./routes/song.routes")
const express = require("express");
const { Mongoose } = require("mongoose");
const app = express();


app.set('x-powered-by', false);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(function (req, res, next) {
    console.log(`requesting url: ${req.url}`);
    next();
})

app.use("/api", songRouter)


app.use(function (req, res) {
    res.status(404).json({ "error": "no route is found !" })
})


const server = app.listen(process.env.PORT, function () {
    console.log(`Server started and listening to port ${server.address().port}`)
})

console.log("server is being started....")