/**
 * artist-controller.js
 */

"use strict"

const Song = require("../models/song-model")
const getAll = function (req, res) {
    console.log(`Get all, artist controllers`);
    const songId = req.params.songId;
    Song.findById(songId).select("artists").exec(function (err, song) {
        const responseData = { status: 200, message: song };
        if (err) {
            responseData.status = 500;
            responseData.message = err;
        }
        res.status(responseData.status).json(responseData.message);
    })
}


const getOne = function (req, res) {
    console.log(`Get one, artist controllers`);
    const songId = req.params.songId;
    const artistId = req.params.artistId;
    Song.findById(songId).select("artists").exec(function (err, song) {
        const responseData = { status: 200, message: song };
        if (err) {
            responseData.status = 500;
            responseData.message = err;
        }
        else if (!song || song == null) {
            responseData.status = 404;
            responseData.message = { "message": `Song Id ${songId} not found` };
        }
        else {
            responseData.status = 200;
            responseData.message = (song.artists.id(artistId) != null ? song.artists.id(artistId) : { "message": `Artist Id ${artistId} not found` });
        }
        res.status(responseData.status).json(responseData.message);

    })
}


const addOne = function (req, res) {
    console.log("Add One Artist Controller");
    const songId = req.params.songId;
    Song.findById(songId).exec(function (err, song) {
        const responseData = { status: 200, message: song };
        if (err) {
            responseData.status = 500;
            responseData.message = err;
        } else if (!song) {
            responseData.status = 404;
            responseData.message = { "message": `Song ID ${songId} not found` };
        }
        if (song) {
            _addArtist(req, res, song);
        } else {
            res.status(responseData.status).json(responseData.message);
        }
    })
}

const _addArtist = function (req, res, song) {
    song.artists.push({
        "name": req.body.name, "role": req.body.role
    })
    song.save(function (err, updatedSong) {
        const responseData = { status: 200, message: [] };
        if (err) {
            responseData.status = 500;
            responseData.message = err;
        } else {
            responseData.status = 201;
            responseData.message = updatedSong.artists;
        }
        res.status(responseData.status).json(responseData.message);
    });;
}



const deleteOne = function (req, res) {
    console.log(`Delete one, artist controllers`);
    const songId = req.params.songId;
    const artistId = req.params.artistId;
    Song.findById(songId).select("artists").exec(function (err, song) {
        if (err) {
            responseData.status = 500;
            responseData.message = err
        }
        const artist = song.artists.id(artistId);
        artist.remove();
        song.save(function (err, deletedSong) {
            const responseData = { status: 204, message: `Artist with ID : ${artistId} deleted` };
            if (err) {
                responseData.status = 500;
                responseData.message = err
            } else if (!deletedSong) {
                responseData.status = 201;
                responseData.message = deletedSong.artists
            }
            res.json(responseData.message)
        });
    })
}

const fullUpdateOne = function (req, res) {
    console.log(`Put Update one, song controller`);
    const updateSong = function (req, res, song, responseData) {
        const artistId = req.params.artistId;
        const artist = song.artists.id(artistId);
        if (artist) {
            artist.name = req.body.name;
            artist.role = req.body.role;
            song.save(function (err, updatedSong) {
                if (err) {
                    responseData.status = 500;
                    responseData.message = err;
                } else {
                    responseData.status = 500;
                    responseData.message = updatedSong.artists;
                }
                res.json(responseData.message)
            });
        } else {
            responseData.status = 404;
            responseData.message = { "message": `Artist ID ${artistId} not found` };
            res.json(responseData.message)
        }
    }
    _updateOne(req, res, updateSong);
}

const partialUpdateOne = function (req, res) {
    console.log(`Patch Update one, song controller`);
    const updateSong = function (req, res, song, responseData) {
        const artistId = req.params.artistId;
        const artist = song.artists.id(artistId);
        if (artist) {
            if (req.body.name) {
                artist.name = req.body.name;
            }
            if (req.body.role) {
                artist.role = req.body.role;
            }
            song.save(function (err, updatedSong) {
                if (err) {
                    responseData.status = 500;
                    responseData.message = err;
                } else {
                    responseData.status = 500;
                    responseData.message = updatedSong.artists;
                }
                res.json(responseData.message)
            });
        } else {
            responseData.status = 404;
            responseData.message = { "message": `Artist ID ${artistId} not found` };
            res.json(responseData.message)
        }

    }
    _updateOne(req, res, updateSong);
}

const _updateOne = function (req, res, updateSongCallBack) {
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
            updateSongCallBack(req, res, song, responseData);
        }
    })
}


module.exports = {
    getAll,
    getOne,
    addOne,
    deleteOne,
    fullUpdateOne,
    partialUpdateOne
}