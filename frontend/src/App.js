import React, { useEffect, useState } from 'react';
import api from './api';
import UserList from './components/UserList';
import AddUser from './components/AddUser';

function App() {
  const [users, setUsers] = useState([]);
  const [editUser, setEditUser] = useState(null);

  const fetchUsers = async () => {
    try {
      const res = await api.get('/users');
      setUsers(res.data);
    } catch (err) {
      console.error('Fetch users failed', err);
      alert('Không thể lấy danh sách user (xem console)');
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleCreateOrUpdate = async (payload) => {
    try {
      if (editUser) {
        // PUT chỉnh sửa
        const res = await api.put(`/users/${editUser.id}`, payload);
        setUsers(users.map(u => u.id === editUser.id ? res.data : u));
        setEditUser(null);
      } else {
        // POST thêm mới
        const res = await api.post('/users', payload);
        setUsers(prev => [...prev, res.data]);
      }
    } catch (err) {
      console.error(err);
      alert('Lỗi khi lưu user. Kiểm tra console.');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Bạn có chắc muốn xóa user này?')) return;
    try {
      await api.delete(`/users/${id}`);
      setUsers(users.filter(u => u.id !== id));
    } catch (err) {
      console.error(err);
      alert('Xóa thất bại');
    }
  };

  const handleEdit = (user) => setEditUser(user);
  const cancelEdit = () => setEditUser(null);

  return (
    <div style={{ padding: 20 }}>
      <h1>Quản lý User</h1>
      <AddUser onCreate={handleCreateOrUpdate} editUser={editUser} onCancelEdit={cancelEdit} />
      <hr />
      <UserList users={users} onEdit={handleEdit} onDelete={handleDelete} />
    </div>
  );
}

export default App;
