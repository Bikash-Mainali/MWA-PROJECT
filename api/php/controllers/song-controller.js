/**
 * song-controller.js
 */

"use strict"

const responseData = require("../dtos/response")
const Song = require("../models/song-model")
const getAll = function (req, res) {
    console.log(`Get all, song controller`);
    let count = 5;
    let offset = 0;
    const maxCount = 10;
    const responseData = { status: 200, message: null };

    if (req.query && req.query.count) {
        count = parseInt(req.query.count, 10);

    }
    if (req.query && req.query.offset) {
        count = parseInt(req.query.offset, 10);
    }

    if (count > maxCount) {
        responseData.status = 404;
        responseData.message = `count must be less than ${maxCount}`
        res.status(responseData.status).json(responseData.message);
        return;

    }
    if (isNaN(count) || isNaN(offset)) {
        responseData.status = 404;
        responseData.message = `offset and count must be digit`;
        res.status(responseData.status).json(responseData.message);
        return;
    }
    Song.find().skip(offset).limit(count).exec(function (err, song) {
        if (err) {
            responseData.status = 500;
            responseData.message = err;
        } else {
            responseData.status = 200;
            responseData.message = song;
        }
        res.status(responseData.status).json(responseData.message);
    })
}

const addOne = function (req, res) {
    console.log(`Add one, song controller`);
    const newSong = {
        title: req.body.title,
        genre: req.body.genre,
        releasedDate: req.body.releasedDate,
        artists: req.body.artists
    };
    Song.create(newSong, function (err, song) {
        const responseData = { status: 201, message: song }
        if (err) {
            responseData.status = 500;
            responseData.message = err;
        }
        res.status(responseData.status).json(responseData.message);
    })

}

const getOne = function (req, res) {
    console.log(`Get one, song controller`);
    const songId = req.params.songId;
    Song.findById(songId).exec(function (err, song) {
        const responseData = { status: 200, message: song };
        if (err) {
            responseData.status = 500;
            responseData.message = err;
        }
        else if (!song) {
            responseData.status = 404;
            responseData.message = { "message": `Song ID ${songId} not found` };
        }
        res.status(responseData.status).json(responseData.message);
    })
}

const deleteOne = function (req, res) {
    console.log(`Delete one, song controller`);
    const songId = req.params.songId;
    Song.findByIdAndDelete(songId).exec(function (err, deletedSong) {
        const responseData = { status: 204, message: { "message": `song with ID : ${songId} successfully deleted` } };
        if (err) {
            responseData.status = 500;
            responseData.message = err
        } else if (!deletedSong) {
            responseData.status = 404;
            responseData.message = { "message": `Song ID ${songId} not found` };
        }
        res.json(responseData.message);
    })
}

const fullUpdateOne = function (req, res) {
    console.log(`Update one, song controller`);
    const updateSong = function (req, res, song, responseData) {
        song.title = req.body.title;
        song.genre = req.body.genre;
        song.releasedDate = req.body.releasedDate;
        song.artists = req.body.artists;
        song.save(function (err, updatedSong) {
            if (err) {
                responseData.status = 500;
                responseData.message = err;
            }
            res.json(responseData)
        });
    }
    _updateOne(req, res, updateSong);
}

const partialUpdateOne = function (req, res) {
    console.log(`Patch Update one, song controller`);
    const updateSong = function (req, res, song, responseData) {
        if (req.body.title) {
            song.title = req.body.title;
        }
        if (req.body.genre) {
            song.genre = req.body.genre;
        }
        if (req.body.releasedDate) {
            song.releasedDate = req.body.releasedDate;
        }
        if (req.body.artists) {
            song.artists = req.body.artists;
        }
        song.save(function (err, updatedSong) {
            if (err) {
                responseData.status = 500;
                responseData.message = err;
            }
            res.json(responseData)
        });
    }
    _updateOne(req, res, updateSong);
}

const _updateOne = function (req, res, updateSongCallBack) {
    console.log(`Put Update one, song controller`);
    const songId = req.params.songId;
    Song.findById(songId).exec(function (err, song) {
        const responseData = { status: 204, message: song };
        if (err) {
            responseData.status = 500;
            responseData.message = err;
        }
        else if (!song) {
            responseData.status = 404;
            responseData.message = { "message": `Song ID ${songId} not found` };
        }
        if (responseData.status !== 204) {
            res.status(responseData.status).json(responseData.message);
        } else {
            updateSongCallBack(req, res, song, responseData)
        }
    })
}


module.exports = {
    getAll,
    addOne,
    getOne,
    deleteOne,
    fullUpdateOne,
    partialUpdateOne
}