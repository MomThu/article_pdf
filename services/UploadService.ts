import fs, { ReadStream } from "fs";

const UploadService = (fileUpload: any) => {
  // Load the AWS SDK for Node.js
  var AWS = require('aws-sdk');

  // Set the region 
  AWS.config.update({ region: 'ap-southeast-1' });

  // Create S3 service object
  var s3 = new AWS.S3({ apiVersion: '2006-03-01' });

  // call S3 to retrieve upload file to specified bucket
  var uploadParams: { Bucket: string; Key: string; Body: string } = { Bucket: "pdfarticlebucket", Key: '', Body: '' };
  var file = fileUpload;

  // Configure the file stream and obtain the upload parameters
  // var fs = require('fs');
  console.log(file, "typeof file")
  var fileStream = fs.createReadStream(file);
  console.log(fileStream, "fileStream")

  fileStream.on('error', function (err) {
    console.log('File Error', err);
  });
  uploadParams.Body = fileStream;
  var path = require('path');
  uploadParams.Key = path.basename(file);
  // uploadParams.Key="hihihi"

  // call S3 to retrieve upload file to specified bucket
  s3.upload(uploadParams, function (err, data) {
    if (err) {
      console.log("Error", err);
    } if (data) {
      console.log("Upload Success", data.Location);
    }
  });
  return "upload here!!!"
}

export default UploadService