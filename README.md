# Group2 Project - User Management System

## Cấu trúc dự án
- `backend/` - Node.js + Express + MongoDB API
- `frontend/` - React.js frontend application

## Cài đặt và chạy dự án

### Cách 1: Chạy tự động (Khuyến nghị)
```bash
# Cài đặt tất cả dependencies
npm run install-all

# Chạy cả backend và frontend cùng lúc
npm start
```

### Cách 2: Chạy thủ công

#### Chạy Backend (Port 5000)
```bash
cd backend
npm install
npm start
```

#### Chạy Frontend (Port 3000)
```bash
cd frontend
npm install
npm start
```

## Truy cập ứng dụng
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000

## Cấu hình MongoDB
- MongoDB Atlas connection string đã được cấu hình trong `backend/server.env`
- Database: groupDB
- Collection: users

## API Endpoints
- GET /users - Lấy danh sách users
- POST /users - Tạo user mới
- PUT /users/:id - Cập nhật user
- DELETE /users/:id - Xóa user

## Tính năng
- ✅ Thêm user mới
- ✅ Hiển thị danh sách users
- ✅ Sửa thông tin user
- ✅ Xóa user
- ✅ Validation form
- ✅ Responsive design