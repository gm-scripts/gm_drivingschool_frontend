module.exports = {
  publicPath:
    process.env.NODE_ENV === "production" ? "nui://gm_hud/html/" : "/",
  filenameHashing: false
};
