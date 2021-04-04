module.exports = {
  publicPath:
    process.env.NODE_ENV === "production"
      ? "nui://gm_drivingschool/html/"
      : "/",
  filenameHashing: false
};
