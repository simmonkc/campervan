var fs = require('fs')
  , imagemagick = require('imagemagick')
  , image = require('../models/image');

exports.index = index = function(req, res) {
  image.find({}, function(err, images) {
    if (err) throw new Error(err)
    else res.render('index', { title: 'Campervan', images : images });
  });
};

exports.destroy = function(req, res) {
  image.destroy(req.params.imageId, function(err) {
    if (err) throw new Error(err)
    else index(req, res);
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
  var handleImageWritten = function(err, img) {
    img.save(function(err) {
      if (err) {
        console.log(err);
        res.send(500);
      } else {
        res.send(200);
      }
    });
  };
  // todo: this to image model on #create:
  var handleImageMetaData = function(err, metadata) {
    var lat = image.transformExifGPSData(metadata.exif.gpsLatitude, metadata.exif.gpsLatitudeRef);
    var lng = image.transformExifGPSData(metadata.exif.gpsLongitude, metadata.exif.gpsLongitudeRed);
    var createdDate = new Date(metadata.exif.dateTimeOriginal);
    img = image.create(req.body.title, 'http://localhost:3000/test/files/', lat, lng, createdDate);
    if (process.env.NODE_ENV === 'production') {
      // Upload to S3:
    } else {
      fs.rename(req.files.image.path, './test/files/' + img._id + '.jpg', function(err){
        handleImageWritten(null, img);
      });
    }
  };
  imagemagick.readMetadata(req.files.image.path, handleImageMetaData);
};