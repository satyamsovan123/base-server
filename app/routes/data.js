const express = require("express");
const router = express.Router();
const trimRequest = require("trim-request");

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
} = require("../middlewares");
const { addData } = require("../controllers/data/addData");

router.post(
  "/getuserdatabyid",
  trimRequest.all,
  verifyJWT,
  verifyGetByIdRequest,
  getUserDataById
);
router.get("/getalluserdata", trimRequest.all, verifyJWT, getAllUserData);
router.get("/getallData", trimRequest.all, getAllData);
router.post(
  "/adddata",
  trimRequest.all,
  verifyJWT,
  verifyAddDataRequest,
  addData
);
router.put(
  "/updatedata",
  trimRequest.all,
  verifyJWT,
  verifyUpdateDataRequest,
  updateData
);
router.post(
  "/deletedatabyid",
  trimRequest.all,
  verifyJWT,
  verifyGetByIdRequest,
  deleteDataById
);
router.delete("/deletealldata", trimRequest.all, verifyJWT, deleteAllData);

module.exports = router;
