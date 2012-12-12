var mongoose  = require('mongoose')
  , Schema    = mongoose.Schema
  , ObjectId  = mongoose.ObjectId;

if (process.env.NODE_ENV != 'production') {
  mongoose.connect('mongodb://localhost/campervan');
} else {
  console.log('No MongoDB instance yet set up.');
  process.exit();
}

var imageSchema = new Schema({ title : String, href : String, lat : String, lng : String, createdDate : String, createdAt : String })
var Model = mongoose.model('Image', imageSchema);

var create = function(title, href, lat, lng, createdDate) {
  var image = new Model();
  image.title = title;
  image.href = href;
  image.lat = lat;
  image.lng = lng;
  image.createdDate = createdDate;
  image.createdAt = new Date().toString();
  return image;
};

var destroy = function(_id, callback) {
  Model.remove({ _id : _id }, function(err) {
    callback(err);
  });
}

var find = function(options, callback) {
  Model.find(options, callback);
};

var transformExifGPSData = function(gpsCoordinates, gpsCompassRef) { 
  array = gpsCoordinates.split(', ').map(eval)
  return ((gpsCompassRef === 'S' || gpsCompassRef === 'E') ? -1 : 1) * 
    (array[0] + ((array[1] / 60) + (array[2] / 3600) / 100))
};

exports.create = create;
exports.destroy = destroy;
exports.find = find;
exports.transformExifGPSData = transformExifGPSData;