var fs = require('fs')
  , AWS = require('aws-sdk')
  , imagemagick = require('imagemagick')
  , mongoose  = require('mongoose')
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

var create = function(filePath, title, callback) {
  
  var handleImageMetaData = function(err, metadata) {
    var image = new Model();
    image.title = title;
    image.lat = transformExifGPSData(metadata.exif.gpsLatitude, metadata.exif.gpsLatitudeRef);
    image.lng = transformExifGPSData(metadata.exif.gpsLongitude, metadata.exif.gpsLongitudeRed);
    image.createdDate = new Date(metadata.exif.dateTimeOriginal);
    image.createdAt = new Date().toString();
    if (process.env.NODE_ENV === 'production') {
      AWS.config.loadFromPath(__dirname + '/../amazon-credentials.json');
      AWS.config.update({region: 'us-east-1'});
      fs.readFile(filePath, function(err, data) {
        if (err) {
          throw new Error(err);
        } else {
          var s3 = new AWS.S3();
          var data = { 
              Bucket : 'campervan' 
            , Key : 'images/' + image._id + '.jpg'
            , Body : data
            , ACL : 'public-read' 
          };
          console.log('uploading to s3...')
          s3.client.putObject(data).done(function(resp) {
            // todo: check `resp` to see if an error occurred in the upload
            console.log(resp)
            callback(null);
          });
        }
      });
    } else {
      fs.rename(filePath, './test/files/' + image._id + '.jpg', function(err) {
        if (err) { 
          throw new Error(err);
        } else {
          image.href = '/test/files/' + image + '.jpg';
          image.save(function(err) { callback(err) });
        }
        callback(err);
      });
    }
  };
  imagemagick.readMetadata(filePath, handleImageMetaData);
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