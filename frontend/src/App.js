import React, { useEffect, useState } from 'react';
import api from './api';
import UserList from './components/UserList';
import AddUser from './components/AddUser';

function App() {
  const [users, setUsers] = useState([]);
  const [editUser, setEditUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await api.get('/users');
      setUsers(res.data);
    } catch (err) {
      console.error('Fetch users failed', err);
      setError('Không thể lấy danh sách user');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleCreateOrUpdate = async (payload) => {
    try {
      setLoading(true);
      setError(null);
      
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
      setError('Lỗi khi lưu user. Kiểm tra console.');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Bạn có chắc muốn xóa user này?')) return;
    try {
      setLoading(true);
      setError(null);
      await api.delete(`/users/${id}`);
      setUsers(users.filter(u => u.id !== id));
    } catch (err) {
      console.error(err);
      setError('Xóa thất bại');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (user) => setEditUser(user);
  const cancelEdit = () => setEditUser(null);

  return (
    <div style={{ padding: 20 }}>
      <h1>Quản lý User</h1>
      
      {error && (
        <div style={{ 
          backgroundColor: '#ffebee', 
          color: '#c62828', 
          padding: '10px', 
          borderRadius: '4px',
          marginBottom: '20px'
        }}>
          {error}
        </div>
      )}
      
      {loading && (
        <div style={{ 
          backgroundColor: '#e3f2fd', 
          color: '#1565c0', 
          padding: '10px', 
          borderRadius: '4px',
          marginBottom: '20px'
        }}>
          Đang xử lý...
        </div>
      )}
      
      <AddUser 
        onCreate={handleCreateOrUpdate} 
        editUser={editUser} 
        onCancelEdit={cancelEdit}
        loading={loading}
      />
      <hr />
      <UserList 
        users={users} 
        onEdit={handleEdit} 
        onDelete={handleDelete}
        loading={loading}
      />
    </div>
  );
}

export default App;
