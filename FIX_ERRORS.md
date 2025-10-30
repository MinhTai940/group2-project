# Hướng dẫn khắc phục lỗi ứng dụng

## 🔍 **Các lỗi đã được khắc phục:**

### **1. Lỗi "Không thể tải danh sách người dùng"**
**Nguyên nhân:** Frontend gọi API với URL cũ `/users` thay vì `/api/users`
**Giải pháp:** ✅ Đã cập nhật tất cả API calls trong frontend

### **2. Lỗi "Có lỗi xảy ra khi thêm user"**
**Nguyên nhân:** 
- Frontend gọi API với URL cũ
- User model yêu cầu password nhưng user management không cần
**Giải pháp:** ✅ 
- Cập nhật API URLs
- Tạo UserManagement model riêng cho user management

## 🔧 **Các thay đổi đã thực hiện:**

### **Frontend:**
1. ✅ Cập nhật `UserList.jsx`:
   - `http://localhost:3000/users` → `http://localhost:3000/api/users`
   - Tất cả API calls đã được sửa

2. ✅ Cập nhật `AddUser.jsx`:
   - `http://localhost:3000/users` → `http://localhost:3000/api/users`

### **Backend:**
1. ✅ Tạo `UserManagement.js` model:
   - Chỉ có name và email (không cần password)
   - Dành riêng cho user management

2. ✅ Cập nhật `userController.js`:
   - Sử dụng UserManagement model thay vì User model
   - Loại bỏ password requirement

## 🚀 **Cách chạy ứng dụng sau khi sửa:**

### **Backend:**
```bash
cd backend
npm install
npm start
```

### **Frontend:**
```bash
cd frontend
npm start
```

## ✅ **Kiểm tra hoạt động:**

1. **Backend chạy thành công:**
   ```
   ✅ MongoDB connected successfully
   🚀 Server running on port 3000
   📡 API endpoints available at http://localhost:3000
   ```

2. **Frontend chạy thành công:**
   - Truy cập `http://localhost:3001`
   - Form đăng ký/đăng nhập hoạt động
   - Sau khi đăng nhập, có thể thêm/sửa/xóa user

3. **API endpoints hoạt động:**
   - `GET /api/users` - Lấy danh sách user
   - `POST /api/users` - Thêm user mới
   - `PUT /api/users/:id` - Cập nhật user
   - `DELETE /api/users/:id` - Xóa user

## 🔍 **Nếu vẫn gặp lỗi:**

1. **Kiểm tra console browser:**
   - Mở Developer Tools (F12)
   - Xem tab Console để thấy lỗi chi tiết

2. **Kiểm tra Network tab:**
   - Xem các API calls có thành công không
   - Kiểm tra status code và response

3. **Kiểm tra backend logs:**
   - Xem terminal chạy backend
   - Kiểm tra có lỗi database không

4. **Kiểm tra MongoDB connection:**
   - Đảm bảo MongoDB Atlas đang hoạt động
   - Kiểm tra MONGO_URI trong server.env

## 📝 **Lưu ý quan trọng:**

- **Authentication** và **User Management** là 2 hệ thống riêng biệt
- **User model** dành cho authentication (có password, role)
- **UserManagement model** dành cho quản lý user (chỉ name, email)
- Cả 2 đều sử dụng cùng database nhưng khác collection

## 🎯 **Kết quả mong đợi:**

Sau khi sửa, ứng dụng sẽ hoạt động bình thường:
- ✅ Đăng ký/đăng nhập thành công
- ✅ Hiển thị danh sách user
- ✅ Thêm user mới thành công
- ✅ Sửa/xóa user thành công
- ✅ Không còn lỗi popup









