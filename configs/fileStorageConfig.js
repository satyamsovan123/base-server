const multer = require("multer");
const { uuid } = require("uuidv4");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    // cb(null, `${Date.now()}-${file.originalname}`);
    cb(null, `${Date.now()}-${uuid()}`);
  },
});

const upload = multer({ storage: storage });

module.exports = { upload };
