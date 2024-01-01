const express = require("express");
const {
  getUsers,
  getUserDetails,
  createUser,
  updateUser,
  deleteUser,
} = require("../controllers/controller");
const router = express.Router();

router.get("/", getUsers);
router.get("/:userId", getUserDetails);
router.post("/", createUser);
router.put("/:userId", updateUser);
router.delete("/:userId", deleteUser);

module.exports = router;
