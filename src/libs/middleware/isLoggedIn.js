module.exports = (req, res, next) => {
  if (req.session.userId) {
    return next();
  }
  res.status(401).json({
    error: {
      name: 'YOU DONE GOOFED',
      message: 'Not authorized!'
    }
  });
};
