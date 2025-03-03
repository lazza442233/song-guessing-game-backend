exports.validateArtistName = (name) => {
  if (!name || typeof name !== "string") return false;
  if (name.trim().length < 2) return false;
  if (name.length > 100) return false;
  return true;
};
