// backend/routes/user.js
const router = require("express").Router();
const userCtrl = require("../controllers/userController");

router.get("/", userCtrl.list);    // GET /users
router.post("/", userCtrl.create); // POST /users

module.exports = router;
