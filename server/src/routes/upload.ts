/**
 * Image Upload.
 * @param {req} - containing the file uploaded
 * This function will return url of image uploaded to s3
 */
export function imageUpload(req: any, res: any, next: any) {
  if (!req.isAuth) {
    throw new Error("Not authenticated!");
  }
  if (!req.file) {
    return res.status(200).send({ message: "Image already exist" });
  } else {
    return res.status(200).send({ imageUrl: req.file.location });
  }
}
