const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const axios = require("axios");

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.send("Song Guessing Game API is running...");
});

app.get("/api/songs/:artist", async (req, res) => {
  const artist = req.params.artist;
  const url = `https://itunes.apple.com/search?term=${encodeURIComponent(
    artist
  )}&entity=song&limit=10`;

  try {
    const response = await axios.get(url);
    const songs = response.data.results.map((song) => ({
      artistName: song.artistName,
      trackName: song.trackName,
      previewUrl: song.previewUrl,
      artwork: song.artworkUrl100,
    }));
    res.json(songs);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch songs" });
  }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
