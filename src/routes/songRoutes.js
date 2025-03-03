const express = require("express");
const {
  getSongsByArtist,
  getTopSongs,
  getSongById,
} = require("../controllers/songController");
const cache = require("../middleware/cache");

const router = express.Router();

router.get("/artist/:artist", cache(300), getSongsByArtist);
router.get("/top", cache(3600), getTopSongs);
router.get("/:id", cache(300), getSongById);

module.exports = router;
