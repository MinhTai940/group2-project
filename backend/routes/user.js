// routes/user.js
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// 🧠 Không cần thêm /users ở đây nữa,
// vì trong app.js bạn đã dùng app.use('/users', userRoutes)
router.get('/', userController.getUsers);
router.post('/', userController.createUser);

module.exports = router;
