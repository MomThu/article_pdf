import fs, { ReadStream } from "fs";
import { get, isEmpty } from "lodash";

const UploadService = async (fileUpload: any) => {
  // Load the AWS SDK for Node.js
  var AWS = require("aws-sdk");

  // Set the region
  AWS.config.update({ region: "ap-southeast-1" });

  // Create S3 service object
  var s3 = new AWS.S3({
    accessKeyId: "AKIA4BCFFU54IKRNTKOU",
    secretAccessKey: "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",
    apiVersion: "2006-03-01",
  });

  // call S3 to retrieve upload file to specified bucket
  var uploadParams: {
    Bucket: string;
    Key: string;
    Body: string;
    ContentType: string;
  } = {
    Bucket: "pdfarticlebucket",
    Key: "",
    Body: "",
    ContentType: "application/pdf",
  };
  var file = fileUpload;

  // Configure the file stream and obtain the upload parameters
  var fs = require("fs");

  var fileStream = fs.createReadStream(file.filepath);

  uploadParams.Body = fileStream;
  uploadParams.Key = file.newFilename;

  // call S3 to retrieve upload file to specified bucket
  var result = await s3.upload(uploadParams).promise();

  if (get(result, "Location", "") && get(result, "Location", "").length) {
    return {
      error: false,
      data: result?.Location,
      message: "Upload Successful!",
    };
  } else {
    return {
      error: true,
      message: "Upload Failed!",
    };
  }
};

export default UploadService;
