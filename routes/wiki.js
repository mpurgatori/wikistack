var express = require('express');
var router = express.Router();
var models = require('../models');
var promise = require('bluebird');

var Page = models.Page;
var User = models.User;

router.get('/', function(req, res){
  Page.findAll()
  .then(function(pageArr){
    res.render('index', {pages: pageArr});
  });


});

router.post('/', function(req, res){

  //add def for title and content
  var page = Page.build({
    title: req.body.title,
    content: req.body.content
  });


    page.save()
    .then(function(_page){
      res.redirect(_page.route);
  });
});

router.get('/stylesheets/style.css', function(req, res, next){
  res.sendFile('../stylesheets/style.css');
});


router.get('/add', function(req, res){
  res.render('addpage');
});

router.get('/:urlTitle', function (req, res, next) {
  Page.findAll({
    where: {
      urlTitle: req.params.urlTitle
    }
  })
  .then(function(foundPage){
    console.log("------------------------",foundPage[0]);
    res.render('wikipage', {page: foundPage[0]} );
  })
  .catch(next);

});

module.exports = router;
