// Imports
import * as multer from "multer";
import * as aws from "aws-sdk";
import * as multerS3 from "multer-s3";

// AWS configuration
const awsConfig = {
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  region: process.env.AWS_REGION,
  sslEnabled: false,
  s3ForcePathStyle: true
};
const fileFilter = (req: any, file: any, cb: any) => {
  if (
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg"
  ) {
    cb(null, true);
  } else {
    cb(new Error("Invalid type only jpeg, png and jpg are allowed"), false);
  }
};

// Call to aws from multer
const Upload = multer({
  fileFilter,
  storage: multerS3({
    s3: new aws.S3(awsConfig),
    acl: "public-read",
    bucket: process.env.AWS_BUCKET_NAME,
    metadata:(req: any, file: any, cb: any)=> {
      cb(null, { fieldName: file.fieldname });
    },
    key:(req: any, file: any, cb: any) =>{
      cb(null, Date.now().toString());
    }
  }),
  limits: {
    fileSize: 1024 * 1024
  }
}).single('image');

export default Upload;
