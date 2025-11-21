# Hướng dẫn test API Advanced Features với Postman

## Cấu hình cơ bản
- **Base URL**: `http://localhost:3000`
- **Content-Type**: `application/json`

## 🔐 **Authentication Required**
Một số API yêu cầu JWT token trong header:
```
Authorization: Bearer <your-jwt-token>
```

---

## 1. Test API Forgot Password (Quên mật khẩu)

### Endpoint: POST `/api/auth/forgot-password`

**Request Body:**
```json
{
  "email": "test@example.com"
}
```

**Expected Response (200):**
```json
{
  "success": true,
  "message": "Email reset password đã được gửi. Vui lòng kiểm tra hộp thư của bạn."
}
```

**Test Cases:**
1. ✅ Gửi email reset thành công với email hợp lệ
2. ❌ Gửi email reset với email không tồn tại (404)
3. ❌ Gửi email reset thiếu email (400)

---

## 2. Test API Reset Password (Đặt lại mật khẩu)

### Endpoint: POST `/api/auth/reset-password`

**Request Body:**
```json
{
  "token": "reset-token-from-email",
  "newPassword": "newpassword123"
}
```

**Expected Response (200):**
```json
{
  "success": true,
  "message": "Mật khẩu đã được đặt lại thành công"
}
```

**Test Cases:**
1. ✅ Reset password thành công với token hợp lệ
2. ❌ Reset password với token không hợp lệ (400)
3. ❌ Reset password với token đã hết hạn (400)
4. ❌ Reset password thiếu token hoặc password (400)

---

## 3. Test API Upload Avatar

### Endpoint: POST `/api/upload/avatar`

**Headers:**
```
Authorization: Bearer <jwt-token>
Content-Type: multipart/form-data
```

**Request Body (Form Data):**
- Key: `avatar`
- Type: File
- Value: Chọn file ảnh từ máy tính

**Expected Response (200):**
```json
{
  "success": true,
  "message": "Upload avatar thành công",
  "data": {
    "avatar": "https://res.cloudinary.com/your-cloud/group2-avatars/avatar-123-456789.jpg",
    "user": {
      "id": "64f8a1b2c3d4e5f6a7b8c9d0",
      "name": "Nguyễn Văn A",
      "email": "test@example.com",
      "role": "user",
      "avatar": "https://res.cloudinary.com/your-cloud/group2-avatars/avatar-123-456789.jpg"
    }
  }
}
```

**Test Cases:**
1. ✅ Upload avatar thành công với file ảnh hợp lệ
2. ❌ Upload avatar không có file (400)
3. ❌ Upload avatar với file không phải ảnh (400)
4. ❌ Upload avatar với file quá lớn (>5MB) (400)
5. ❌ Upload avatar không có token (401)

---

## 4. Test API Delete Avatar

### Endpoint: DELETE `/api/upload/avatar`

**Headers:**
```
Authorization: Bearer <jwt-token>
Content-Type: application/json
```

**Expected Response (200):**
```json
{
  "success": true,
  "message": "Xóa avatar thành công",
  "data": {
    "user": {
      "id": "64f8a1b2c3d4e5f6a7b8c9d0",
      "name": "Nguyễn Văn A",
      "email": "test@example.com",
      "role": "user",
      "avatar": null
    }
  }
}
```

**Test Cases:**
1. ✅ Xóa avatar thành công
2. ❌ Xóa avatar không có token (401)
3. ❌ Xóa avatar khi chưa có avatar (vẫn trả về success)

---

## Các bước test trong Postman:

### Bước 1: Tạo Collection
1. Tạo collection mới tên "Advanced Features API"
2. Thêm biến môi trường:
   - `base_url` = `http://localhost:3000`
   - `jwt_token` = `<your-jwt-token>`
   - `reset_token` = `<reset-token-from-email>`

### Bước 2: Test Forgot Password
1. Tạo request POST `{{base_url}}/api/auth/forgot-password`
2. Thêm body JSON với email
3. Gửi request và kiểm tra response
4. Kiểm tra email để lấy reset token

### Bước 3: Test Reset Password
1. Tạo request POST `{{base_url}}/api/auth/reset-password`
2. Thêm body JSON với token và password mới
3. Gửi request và kiểm tra response

### Bước 4: Test Upload Avatar
1. Tạo request POST `{{base_url}}/api/upload/avatar`
2. Thêm header `Authorization: Bearer {{jwt_token}}`
3. Chuyển sang tab Body → form-data
4. Thêm key `avatar` với type `File`
5. Chọn file ảnh và gửi request

### Bước 5: Test Delete Avatar
1. Tạo request DELETE `{{base_url}}/api/upload/avatar`
2. Thêm header `Authorization: Bearer {{jwt_token}}`
3. Gửi request và kiểm tra response

---

## Screenshots cần chụp:

1. **Form Forgot Password + email nhận token**:
   - Giao diện form quên mật khẩu
   - Email nhận được với link reset password

2. **Giao diện đổi mật khẩu bằng token reset**:
   - Form reset password với token từ email
   - Thông báo thành công sau khi reset

3. **Upload Avatar: chọn ảnh + cập nhật thành công**:
   - Giao diện upload avatar
   - Hiển thị ảnh preview trước khi upload
   - Thông báo upload thành công

4. **Postman test API**:
   - Test `/forgot-password` endpoint
   - Test `/reset-password` endpoint
   - Test `/upload/avatar` endpoint
   - Test DELETE `/upload/avatar` endpoint

---

## Lưu ý:

### Cấu hình Email:
- Cần cấu hình SMTP trong `server.env`:
  ```
  EMAIL_HOST=smtp.gmail.com
  EMAIL_PORT=587
  EMAIL_USER=your-email@gmail.com
  EMAIL_PASS=your-app-password
  ```

### Cấu hình Cloudinary:
- Cần cấu hình Cloudinary trong `server.env`:
  ```
  CLOUDINARY_CLOUD_NAME=your-cloud-name
  CLOUDINARY_API_KEY=your-api-key
  CLOUDINARY_API_SECRET=your-api-secret
  ```

### Cài đặt Dependencies:
```bash
# Backend
cd backend
npm install

# Frontend
cd frontend
npm install
```

### Chạy ứng dụng:
```bash
# Backend
cd backend
npm start

# Frontend
cd frontend
npm start
```

Sau khi chạy:
- Backend: `http://localhost:3000`
- Frontend: `http://localhost:3001`

---

## Test Flow hoàn chỉnh:

1. **Đăng ký/Đăng nhập** → Lấy JWT token
2. **Test Forgot Password** → Gửi email reset
3. **Kiểm tra email** → Lấy reset token
4. **Test Reset Password** → Đặt lại mật khẩu
5. **Đăng nhập lại** → Với mật khẩu mới
6. **Test Upload Avatar** → Upload ảnh đại diện
7. **Test Delete Avatar** → Xóa ảnh đại diện
8. **Test Frontend** → Kiểm tra giao diện hoạt động





