var fs = require('fs')
  , AWS = require('aws-sdk')
  , imagemagick = require('imagemagick')
  , mongoose  = require('mongoose')
  , Schema    = mongoose.Schema
  , ObjectId  = mongoose.ObjectId;

if (process.env.NODE_ENV === 'production') {
  mongoose.connect('mongodb://nodejitsu:1f011a83ab17a799c8e6c8d8c088ef95@linus.mongohq.com:10048/nodejitsudb2972390581');
} else {
  mongoose.connect('mongodb://localhost/campervan');
}

var imageSchema = new Schema({ title : String, href : String, lat : String, lng : String, createdDate : Date, createdAt : Date })
var Model = mongoose.model('Image', imageSchema);

var create = function(filePath, imageTitle, callback) {
  
  var handleImageMetaData = function(err, metadata) {
    var image = new Model();
    image.title = imageTitle;
    if (metadata.exif.gpsLatitude === undefined || metadata.exif.gpsLongitude === undefined ) {
      callback('No GPS metadata');
      return;
    }
    image.lat = transformExifGPSData(metadata.exif.gpsLatitude, metadata.exif.gpsLatitudeRef);
    image.lng = transformExifGPSData(metadata.exif.gpsLongitude, metadata.exif.gpsLongitudeRed);
    image.createdDate = new Date(metadata.exif.dateTimeOriginal);
    image.createdAt = new Date();
    if (process.env.NODE_ENV === 'production') {
      console.log('application is in production, using AWS...');
      console.log('accessKeyId: ' + process.env.AWS_KEY);
      console.log('secretAccessKey: ' + process.env.AWS_SECRET);
      AWS.config.update({ accessKeyId: process.env.AWS_KEY, secretAccessKey: process.env.AWS_SECRET });
      AWS.config.update({ region: 'us-east-1' });
      console.log('copying from filePath: ' + filePath);
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
          console.log('data is available?' + data);
          console.log('or there was an error: ' + err);
          console.log('uploading to S3. Waiting for response from AWS...');
          s3.client.putObject(data).done(function(resp) {
            // todo: check `resp` to see if an error occurred in the upload
            console.log(resp)
            callback(null);
          });
        }
      });
    } else {
      fs.rename(filePath, './public/test/files/' + image._id + '.jpg', function(err) {
        if (err) { 
          throw new Error(err);
        } else {
          image.href = '/test/files/' + image._id + '.jpg';
          console.log(image.href);
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

var sort = function(sortQuery, callback) {
  Model.find({}).sort('field ' + sortQuery).exec(callback);
};

var transformExifGPSData = function(gpsCoordinates, gpsCompassRef) { 
  array = gpsCoordinates.split(', ').map(eval)
  return ((gpsCompassRef === 'S' || gpsCompassRef === 'E') ? -1 : 1) * 
    (array[0] + ((array[1] / 60) + (array[2] / 3600) / 100))
};

exports.create = create;
exports.destroy = destroy;
exports.find = find;
exports.sort = sort;