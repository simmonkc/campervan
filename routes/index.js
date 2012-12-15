var fs = require('fs')
  , imagemagick = require('imagemagick')
  , image = require('../models/image');

exports.index = function(req, res) {
  image.find({ lat : { $exists : true }}, function(err, images) {
    if (err) throw new Error(err)
    else res.render('index', { title: 'Campervan', images : JSON.stringify(images) });
  });
};

exports.list = function(req, res) {
  image.sort('createdDate', function(err, images) {
    if (err) throw new Error(err)
    else res.render('list', { title: 'Campervan', images : JSON.stringify(images) });
  });
};

exports.destroy = function(req, res) {
  image.destroy(req.params.imageId, function(err) {
    if (err) throw new Error(err);
    else res.redirect('/admin');
  });
};

exports.show = function(req, res) { 
  data = { '_id' : 0, 'title' : 'Tom cooking', 'lat' : '0.0', 'lng' : '0.2', 'createdDate' : new Date().getTime() };
  res.render('show', { data : data })
};

exports.admin = function(req, res) {
  image.find({}, function(err, images) {
    if (err) throw new Error(err)
    else res.render('admin', { title: 'Campervan Admin', images : images });
  });
};

exports.create = function(req, res) {
  image.create(req.files.image.path, req.body.imageTitle, function(err) {
    if (err) res.send('The image has no GPS data and cannot be added to campervan.'); //throw new Error(err);
    else res.redirect('/admin');
  });
};