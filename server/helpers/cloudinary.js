const cloudinary = require('cloudinary').v2;
const multer = require('multer');

cloudinary.config({
  cloud_name: 'dusrjecbh',
  api_key: '234489363873381',
  api_secret: 'J3MXbsl8efK8lOZn6xXeV9i4n7Q',
});

// Use in-memory storage for multer
const storage = new multer.memoryStorage();

async function imageUploadUtil(file) {
  const result = await cloudinary.uploader.upload(file, {
    resource_type: "auto",
  });

  return result;
}

const upload = multer({ storage });

module.exports = { upload, imageUploadUtil };
