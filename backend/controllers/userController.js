// controllers/userController.js
const User = require('../models/User');

// GET /users
exports.getUsers = async (req, res) => {
  try {
    const users = await User.find().lean(); // trả object thuần, nhẹ hơn
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: 'Lỗi lấy danh sách người dùng', error: err.message });
  }
};

// POST /users
exports.createUser = async (req, res) => {
  try {
    let { name, email } = req.body;

    // validation cơ bản
    if (!name || !email) {
      return res.status(400).json({ message: 'Name và email là bắt buộc' });
    }
    name = String(name).trim();
    email = String(email).trim();

    const emailRegex = /^\S+@\S+\.\S+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: 'Email không hợp lệ' });
    }

    // kiểm tra trùng email
    const existed = await User.findOne({ email });
    if (existed) {
      return res.status(409).json({ message: 'Email đã tồn tại' });
    }

    // tạo user trong MongoDB
    const user = await User.create({ name, email });
    return res.status(201).json(user);
  } catch (err) {
    res.status(500).json({ message: 'Lỗi tạo người dùng', error: err.message });
  }
};
