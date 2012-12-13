var fs = require('fs')
  , imagemagick = require('imagemagick')
  , image = require('../models/image');

exports.index = index = function(req, res) {
  image.find({}, function(err, images) {
    if (err) throw new Error(err)
    else res.render('index', { title: 'Campervan', images : JSON.stringify(images) });
  });
};

exports.destroy = function(req, res) {
  image.destroy(req.params.imageId, function(err) {
    if (err) throw new Error(err)
    else res.send(200);
  });
};

exports.show = function(req, res) { 
  data = { '_id' : 0, 'title' : 'Tom cooking', 'lat' : '0.0', 'lng' : '0.2', 'createdDate' : new Date().getTime() };
  res.render('show', { data : data })
};

exports.admin = function(req, res) {
  res.render('admin', { title : 'Campervan Admin' });
};

exports.create = function(req, res) {
  console.log('req.params: ' + JSON.stringify(req.params));
  image.create(req.files.image.path, req.params.title, function(err) {
    if (err) throw new Error(err);
    else res.send(200);
  });
};