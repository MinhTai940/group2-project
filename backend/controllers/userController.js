// backend/controllers/userController.js

// Mảng tạm trong RAM (mất khi restart). Đủ cho bài thực hành.
let users = [
  // ví dụ mẫu ban đầu (có thể để rỗng)
  // { id: "1", name: "Alice", email: "alice@example.com" }
];

// GET /users
exports.list = (req, res) => {
  res.json(users);
};

// POST /users
exports.create = (req, res) => {
  const { name, email } = req.body || {};

  // validate lười mà hiệu quả
  if (!name || !name.trim()) {
    return res.status(400).json({ message: "name is required" });
  }
  if (!email || !/\S+@\S+\.\S+/.test(email)) {
    return res.status(400).json({ message: "valid email is required" });
  }

  // chống trùng email cho vui (không bắt buộc)
  if (users.some(u => u.email.toLowerCase() === email.toLowerCase())) {
    return res.status(409).json({ message: "email already exists" });
  }

  const user = {
    id: String(Date.now()),  // id đơn giản cho bài lab
    name: name.trim(),
    email: email.trim()
  };

  users.unshift(user);
  return res.status(201).json(user);
};

// (tuỳ chọn) export để reset trong test
exports._reset = () => { users = []; };
