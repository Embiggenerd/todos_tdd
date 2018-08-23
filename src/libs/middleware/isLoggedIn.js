module.exports = (req, res, next) => {
  console.log('req.session', req.session);
  console.log('req.body', req.body);
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
