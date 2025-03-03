const express = require("express");
const songRoutes = require("./songRoutes");

const router = express.Router();

router.get("/health", (req, res) => {
  res.status(200).json({ status: "ok" });
});

router.use("/songs", songRoutes);

module.exports = router;
