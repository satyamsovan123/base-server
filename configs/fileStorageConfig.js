const multer = require("multer");
const { v4: uuidv4 } = require("uuid");

const storage = multer.memoryStorage({
  //   destination: function (req, file, cb) {
  //     cb(null, "uploads/");
  //   },
  filename: function (req, file, cb) {
    const fileName = `${Date.now()}-${uuidv4()}`;
    file.originalname = fileName;
    cb(null, fileName);
  },
});

const upload = multer({ storage: storage });

module.exports = { upload };
