import fs from "fs";

export default function renameFile(req, res, next) {
  const proxyHost = req.headers["x-forwarded-host"];
  const host = proxyHost ?? req.headers.host;
  const { originalname, filename } = req.file;
  const relativePath = `uploads/${Date.now()}_${originalname.replace(
    /[^a-zA-Z0-9.]/g,
    ""
  )}`;
  const newPath = `./public/${relativePath}`;
  const fullPath = `${req.protocol}://${host}/${relativePath}`;
  fs.rename(`./public/uploads/${filename}`, newPath, (err) => {
    if (err) {
      return;
    }
    req.newPath = fullPath;
    req.relativePath = relativePath;
    next();
  });
}
