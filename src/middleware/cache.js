const NodeCache = require("node-cache");
const cache = new NodeCache();

module.exports = (duration) => (req, res, next) => {
  if (process.env.CACHE_DISABLED === "true") {
    return next();
  }

  const key = req.originalUrl;
  const cachedResponse = cache.get(key);

  if (cachedResponse) {
    return res.json(cachedResponse);
  }

  const originalJson = res.json;
  res.json = (body) => {
    originalJson.call(res, body);
    cache.set(key, body, duration);
  };

  next();
};
