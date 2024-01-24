const express = require("express");
const router = express.Router();
const { getDataById, getAllData } = require("../controllers/data/getData");
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

router.post("/getdatabyid", verifyJWT, verifyGetByIdRequest, getDataById);
router.get("/getalldata", verifyJWT, getAllData);
router.post("/adddata", verifyJWT, verifyAddDataRequest, addData);
router.put("/updatedata", verifyJWT, verifyUpdateDataRequest, updateData);
router.delete(
  "/deletedatabyid",
  verifyJWT,
  verifyGetByIdRequest,
  deleteDataById
);
router.delete("/deletealldata", verifyJWT, deleteAllData);

module.exports = router;
