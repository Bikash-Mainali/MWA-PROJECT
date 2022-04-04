/**
 * db.connection.js
 */

"use strict"

require("dotenv").config();
require("../models/song-model")
const mongoose = require("mongoose");

mongoose.connect(process.env.DB_URL, { useNewUrlParser: true, useUnifiedTopology: true });

mongoose.connection.on("connected", function () {
    console.log(`Mongoose connected to: ${process.env.DB_NAME}`)
});

mongoose.connection.on("disconnected", function () {
    console.log(`Mongoose disconnected`)
});

mongoose.connection.on("error", function (error) {
    console.log(`Mongoose connection error: ${error}`)
});

process.on("SIGINT", function() {
    mongoose.connection.close(function() {
        console.log(process.env.SIGINT_MESSAGE);
        process.exit(0);
    });
});

process.on("SIGTERM", function(){
    mongoose.connection.close(function() {
        console.log(process.env.SIGTERM_MESSAGE);
        process.exit(0);
    })
})
