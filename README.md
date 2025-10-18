Nhóm 2
Trần Nguyễn Phương Anh : vai trò frontend
Nguyễn Thanh Sơn : vai trò backend
Hồ Vủ Minh Tài : database

Dự Án Quản Lý Sản Phẩm

Giới thiệu
Dự án **Quản Lý Sản Phẩm** là ứng dụng web cho phép người dùng thực hiện các thao tác **CRUD (Create – Read – Update – Delete)** trên danh sách sản phẩm.  
Ứng dụng giúp quản lý dữ liệu dễ dàng, thao tác nhanh và hỗ trợ giao diện thân thiện.

---

Công nghệ sử dụng
Backend
- **Node.js (Express.js)** — Xây dựng RESTful API
- **MongoDB** — Lưu trữ dữ liệu
- **Mongoose** — ORM cho MongoDB
- **JWT Authentication** — Bảo mật người dùng

Frontend
- **ReactJS** — Giao diện người dùng
- **Axios** — Kết nối API
- **TailwindCSS** — Giao diện nhanh, hiện đại

Khác
- **Git / GitHub** — Quản lý mã nguồn
- **Postman** — Kiểm thử API
- **Docker** *(tùy chọn)* — Triển khai môi trường độc lập

---

Cấu trúc thư mục
project/
├── backend/
│ ├── src/
│ │ ├── controllers/
│ │ ├── models/
│ │ ├── routes/
│ │ └── server.js
│ └── package.json
├── frontend/
│ ├── src/
│ ├── public/
│ └── package.json
└── README.md

---

Cách chạy dự án

1 Yêu cầu hệ thống
- Node.js >= 18
- MongoDB hoặc Docker
- Git

2 Cài đặt
bash
# Clone dự án
git clone https://github.com/<tên-người-dùng>/<tên-repo>.git
cd <tên-repo>

Cài đặt backend
cd backend
npm install

Cài đặt frontend
cd ../frontend
npm install


