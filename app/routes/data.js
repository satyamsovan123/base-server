const express = require("express");
const router = express.Router();

const {
  getUserDataById,
  getAllUserData,
  getAllData,
} = require("../controllers/data/getData");
const { updateData } = require("../controllers/data/updateData");
const {
  deleteAllData,
  deleteDataById,
} = require("../controllers/data/deleteData");
const {
  verifyJWT,
  verifyUpdateDataRequest,
  verifyAddDataRequest,
  verifyGetByIdRequest,
  checkEmailVerificationStatus,
} = require("../middlewares");
const { addData } = require("../controllers/data/addData");
const { upload } = require("../../configs");

router.post(
  "/getuserdatabyid",
  verifyJWT,
  checkEmailVerificationStatus,
  verifyGetByIdRequest,
  getUserDataById
);
router.get(
  "/getalluserdata",
  verifyJWT,
  checkEmailVerificationStatus,
  getAllUserData
);
router.get("/getallData", getAllData);
router.post(
  "/adddata",
  upload.any(), // upload.any() is a middleware from multer that is used to upload files and to accept multipart form data
  verifyJWT,
  checkEmailVerificationStatus,
  verifyAddDataRequest,
  addData
);
router.put(
  "/updatedata",
  upload.any(), // upload.any() is a middleware from multer that is used to upload files and to accept multipart form data
  verifyJWT,
  checkEmailVerificationStatus,
  verifyUpdateDataRequest,
  updateData
);
router.post(
  "/deletedatabyid",
  verifyJWT,
  checkEmailVerificationStatus,
  verifyGetByIdRequest,
  deleteDataById
);
router.delete(
  "/deletealldata",
  verifyJWT,
  checkEmailVerificationStatus,
  deleteAllData
);

module.exports = router;
