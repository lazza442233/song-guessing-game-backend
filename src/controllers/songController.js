const songService = require("../services/songService");
const { validateArtistName } = require("../utils/validators");
const logger = require("../utils/logger");

exports.getSongsByArtist = async (req, res, next) => {
  try {
    const { artist } = req.params;
    const { limit = 10, shuffle = true } = req.query;

    if (!validateArtistName(artist)) {
      return res.status(400).json({ error: "Invalid artist name" });
    }

    const songs = await songService.fetchSongsByArtist(
      artist,
      parseInt(limit),
      shuffle === "true"
    );

    if (songs.length === 0) {
      return res.status(404).json({ error: "No songs found for this artist" });
    }

    res.json(songs);
  } catch (error) {
    logger.error(`Error fetching songs: ${error.message}`);
    next(error);
  }
};

exports.getTopSongs = async (req, res, next) => {
  try {
    const { limit = 50, genre } = req.query;
    const songs = await songService.fetchTopSongs(parseInt(limit), genre);
    res.json(songs);
  } catch (error) {
    logger.error(`Error fetching top songs: ${error.message}`);
    next(error);
  }
};

exports.getSongById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const song = await songService.fetchSongById(id);

    if (!song) {
      return res.status(404).json({ error: "Song not found" });
    }

    res.json(song);
  } catch (error) {
    logger.error(`Error fetching song by ID: ${error.message}`);
    next(error);
  }
};
