/**
 * song.routes.js
 */

"use strict"
const songController = require("../controllers/song-controller")
const artistController = require("../controllers/artist-controller")
const express = require("express");
const songRoutes = express.Router();


songRoutes.route("/songs")
    .get(songController.getAll)
    .post(songController.addOne)

songRoutes.route("/songs/:songId")
    .get(songController.getOne)
    .put(songController.fullUpdateOne)
    .patch(songController.partialUpdateOne)
    .delete(songController.deleteOne)


songRoutes.route("/songs/:songId/artists")
    .get(artistController.getAll)
    .post(artistController.addOne)

songRoutes.route("/songs/:songId/artists/:artistId")
    .get(artistController.getOne)
    .put(artistController.fullUpdateOne)
    .patch(artistController.partialUpdateOne)
    .delete(artistController.deleteOne)


module.exports = songRoutes;
