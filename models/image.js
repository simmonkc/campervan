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
  
  var storeImage = function(image) {
  }

  var resizeAndStoreImage = function(image) {
    imagemagick.resize({ 
      srcData : fs.readFileSync(filePath, 'binary'),
      width: 768
    }, function(err, stdout, stderr) {
      if (err) { throw err }
      if (process.env.NODE_ENV === 'production') {
        AWS.config.update({ accessKeyId: process.env.AWS_KEY , secretAccessKey: process.env.AWS_SECRET });
        AWS.config.update({ region: 'us-east-1' });
        AWS.config.update({ sslEnabled : false });
        var s3 = new AWS.S3();
        var data = { 
            Bucket : 'campervan' 
          , Key : 'images/' + image._id + '.jpg'
          , Body : stdout
          , ContentType : 'image/jpeg'
          , ACL : 'public-read' 
        };
        s3.client.putObject(data, function(err, data) {
          image.href = 'http://campervan.s3.amazonaws.com/images/' + image._id + '.jpg';
          image.save(function(err) { callback(err) });
        });
      } else {
        fs.writeFileSync('./public/test/files/' + image._id + '.jpg', stdout, 'binary');          
        image.href = '/test/files/' + image._id + '.jpg';
        image.save(function(err) { callback(err) });
      }
    });
  };

  var handleImageMetaData = function(err, metadata) {
    var image = new Model();
    image.title = imageTitle;
    if (metadata.exif) {
      image.createdDate = new Date(metadata.exif.dateTimeOriginal); 
      if (metadata.exif.gpsLatitude && metadata.exif.gpsLongitude) {
        image.lat = transformExifGPSData(metadata.exif.gpsLatitude, metadata.exif.gpsLatitudeRef);
        image.lng = transformExifGPSData(metadata.exif.gpsLongitude, metadata.exif.gpsLongitudeRed);
      }
    } else {
      callback('No EXIF data available.');
      return;
    }
    image.createdAt = new Date();
    resizeAndStoreImage(image);
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