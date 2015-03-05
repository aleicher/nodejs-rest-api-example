var restify = require('restify');
var citySave = require('save')('city');

var server = restify.createServer({
  name: 'my-api'
});

server.listen((process.env.PORT || 5000), function() {
  console.log('%s listening at %s', server.name, server.url);
});


server
  .use(restify.fullResponse())
  .use(restify.bodyParser());


server.get('/cities', function (req, res, next) {
  citySave.find({}, function (error, cities) {
    res.send(cities)
  })
});


server.post('/cities', function (req, res, next) {
  if (req.params.name === undefined) {
    return next(new restify.InvalidArgumentError('Name must be supplied'))
  }
 
  //citySave.create({ name: req.params.name }, function (error, city) {
  citySave.create(req.params, function (error, city) {
    if (error) return next(new restify.InvalidArgumentError(JSON.stringify(error.errors)))
 
    res.send(201, city)
  })
})


server.get('/cities/:id', function (req, res, next) {
  citySave.findOne({ _id: req.params.id }, function (error, city) {
    if (error) return next(new restify.InvalidArgumentError(JSON.stringify(error.errors)))
 
    if (city) {
      res.send(city)
    } else {
      res.send(404)
    }
  });
});

server.put('/cities/:id', function (req, res, next) {
  if (req.params.name === undefined) {
    return next(new restify.InvalidArgumentError('Name must be supplied'))
  }
 
  citySave.update({ _id: req.params.id, name: req.params.name }, function (error, city) {
    if (error) return next(new restify.InvalidArgumentError(JSON.stringify(error.errors)))
    res.send()
  });
});

server.del('/cities/:id', function (req, res, next) {
  citySave.delete(req.params.id, function (error, city) {
    if (error) return next(new restify.InvalidArgumentError(JSON.stringify(error.errors)))
 
    res.send()
  });
});
