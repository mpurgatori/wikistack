var express = require('express');
var morgan = require('morgan');
var nunjucks = require('nunjucks');
var bodyParser = require('body-parser');
var models = require('./models');
var router = require('./routes/wiki');

var app = express();

app.set('view engine', 'html'); //specifies the file should be viewed as HTML
app.engine('html', nunjucks.render); //specifies to render file as html
nunjucks.configure('views', {noCache:true});

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use(morgan('dev'));
app.use('/wiki', router);

models.Page.sync({})
.then(function(){
  return models.User.sync({});
})
.then(function(){
  app.listen(3000, function(){
    console.log('Listening to port');
  });
})

.catch(console.error);
