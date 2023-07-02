module.exports = {
    ensureAuth: function (req, res, next) {
      if (req.isAuthenticated()) {
        return next();
      } else {
        res.status(400).json('Failed to authenticate')
      }
    }
  };
  