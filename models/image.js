var mongoose  = require('mongoose')
  , Schema    = mongoose.Schema
  , ObjectId  = mongoose.ObjectId;

if (process.env.NODE_ENV != 'production') {
  mongoose.connect('mongodb://localhost/campervan');
} else {
  console.log('No MongoDB instance yet set up.');
  process.exit();
}

var Model = mongoose.model('Image', 
  new Schema({ title : String, url : String, lat : String, lng : String, createdDate : String, createdAt : String })
);

var create = function(title, url, lat, lng, createdDate) {
  var image = new Model();
  image.title = title;
  image.url = url;
  image.lat = lat;
  image.lng = lng;
  image.createdDate = createdDate;
  image.createdAt = new Date().toString();
  return image;
};

var find = function(options, callback) {
  Model.find(options, callback);
};

exports.create = create;
exports.find = find;