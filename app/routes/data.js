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
} = require("../middlewares");
const { addData } = require("../controllers/data/addData");

router.post(
  "/getuserdatabyid",
  verifyJWT,
  verifyGetByIdRequest,
  getUserDataById
);
router.get("/getalluserdata", verifyJWT, getAllUserData);
router.get("/getallData", getAllData);
router.post("/adddata", verifyJWT, verifyAddDataRequest, addData);
router.put("/updatedata", verifyJWT, verifyUpdateDataRequest, updateData);
router.post("/deletedatabyid", verifyJWT, verifyGetByIdRequest, deleteDataById);
router.delete("/deletealldata", verifyJWT, deleteAllData);

module.exports = router;
