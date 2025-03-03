const axios = require("axios");
const logger = require("../utils/logger");
const { ITUNES_API_BASE_URL } = require("../config/constants");

exports.fetchSongsByArtist = async (artist, limit = 10, shuffle = true) => {
  try {
    const url = `${ITUNES_API_BASE_URL}/search?term=${encodeURIComponent(
      artist
    )}&entity=song&limit=${limit}`;

    const response = await axios.get(url);
    const songs = response.data.results.map((song) => ({
      id: song.trackId,
      artistName: song.artistName,
      trackName: song.trackName,
      previewUrl: song.previewUrl,
      artwork:
        song.artworkUrl100?.replace("100x100", "300x300") || song.artworkUrl100,
      releaseDate: song.releaseDate,
      genre: song.primaryGenreName,
    }));

    if (shuffle && songs.length > 0) {
      return songs.sort(() => Math.random() - 0.5);
    }

    return songs;
  } catch (error) {
    logger.error(`iTunes API error: ${error.message}`);
    throw new Error("Failed to fetch songs from iTunes API");
  }
};

exports.fetchTopSongs = async (limit = 50, genre) => {
  try {
    const params = new URLSearchParams({
      limit,
      entity: "song",
      chart: "mostPlayed",
    });

    if (genre) {
      params.append("genre", genre);
    }

    const url = `${ITUNES_API_BASE_URL}/chart?${params.toString()}`;
    const response = await axios.get(url);

    return response.data.results.map((song) => ({
      id: song.trackId,
      artistName: song.artistName,
      trackName: song.trackName,
      previewUrl: song.previewUrl,
      artwork:
        song.artworkUrl100?.replace("100x100", "300x300") || song.artworkUrl100,
      releaseDate: song.releaseDate,
      genre: song.primaryGenreName,
    }));
  } catch (error) {
    logger.error(`Error fetching top songs: ${error.message}`);
    throw new Error("Failed to fetch top songs");
  }
};

exports.fetchSongById = async (id) => {
  try {
    const url = `${ITUNES_API_BASE_URL}/lookup?id=${id}`;
    const response = await axios.get(url);

    if (response.data.results.length === 0) {
      return null;
    }

    const song = response.data.results[0];
    return {
      id: song.trackId,
      artistName: song.artistName,
      trackName: song.trackName,
      previewUrl: song.previewUrl,
      artwork:
        song.artworkUrl100?.replace("100x100", "300x300") || song.artworkUrl100,
      releaseDate: song.releaseDate,
      genre: song.primaryGenreName,
      duration: song.trackTimeMillis,
    };
  } catch (error) {
    logger.error(`Error fetching song by ID: ${error.message}`);
    throw new Error("Failed to fetch song details");
  }
};
