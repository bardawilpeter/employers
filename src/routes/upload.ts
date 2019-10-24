/**
   * Image Upload.
   * @param {req} - containing the file uploaded
   * This function will return url of image uploaded to s3
*/
export function imageUpload(req: any, res: any, next: any) {
    res.status(200).send({'imageUrl': req.file.location})
}
