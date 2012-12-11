imagemagick = require('imagemagick');
image = require('../models/image');

exports.index = function(req, res) {
  image.find({}, function(err, images) {
    if (err) throw new Error(err)
    else res.render('index', { title: 'Campervan', images : images });
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
  imagemagick.readMetadata(req.files.image.path, function(err, metadata) {
    var transformExifGPSData = function(gpsCoordinates, gpsCompassRef) { 
      array = gpsCoordinates.split(', ').map(eval)
      return ((gpsCompassRef === 'S' || gpsCompassRef === 'E') ? -1 : 1) * 
        (array[0] + ((array[1] / 60) + (array[2] / 3600) / 100))
    };

    var lat = transformExifGPSData(metadata.exif.gpsLatitude, metadata.exif.gpsLatitudeRef);
    var lng = transformExifGPSData(metadata.exif.gpsLongitude, metadata.exif.gpsLongitudeRed);
    var createdDate = new Date(metadata.exif.dateTimeOriginal);
    img = image.create(req.body.title, 'http://localhost:3000/test/files/', lat, lng, createdDate);
    img.save(function(err) {
      if (err) throw new Error(err);
      else res.send(200);
    });
  });
};