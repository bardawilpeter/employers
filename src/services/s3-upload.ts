// Imports
import * as multer from 'multer';
import * as aws from 'aws-sdk';
import * as multerS3 from 'multer-s3';

// AWS configuration
const awsConfig={
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    region: process.env.AWS_REGION,
    sslEnabled: false,
    s3ForcePathStyle: true
};
// AWS initialize
const s3 = new aws.S3(awsConfig);
// Call to aws from multer
const Upload = multer({
    storage: multerS3({
        s3: s3,
        acl: 'public-read',
        bucket: process.env.AWS_BUCKET_NAME,
        metadata: function (req: any, file: any, cb: any) {
            cb(null, { fieldName: file.fieldname });
        },
        key: function (req: any, file: any, cb: any) {
            cb(null, Date.now().toString())
        }
    })
});

export default Upload;
