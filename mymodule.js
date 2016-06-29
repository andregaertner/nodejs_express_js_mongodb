greating = function great(req, res, next){
  console.log('Welcome Andre Gärtner from module.');
  next();
}

module.exports = greating
