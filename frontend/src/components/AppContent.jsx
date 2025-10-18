import React from 'react';
import { useUser } from '../contexts/UserContext';
import UserList from './UserList';
import AddUser from './AddUser';

function AppContent() {
  const {
    users,
    loading,
    error,
    editUser,
    createUser,
    updateUser,
    deleteUser,
    setEditUser,
    clearEditUser,
    clearError
  } = useUser();

  const handleCreateOrUpdate = async (payload) => {
    try {
      if (editUser) {
        await updateUser(editUser.id, payload);
      } else {
        await createUser(payload);
      }
    } catch (err) {
      console.error('Create/Update error:', err);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Bạn có chắc muốn xóa user này?')) return;
    try {
      await deleteUser(id);
    } catch (err) {
      console.error('Delete error:', err);
    }
  };

  const handleEdit = (user) => setEditUser(user);
  const cancelEdit = () => clearEditUser();

  return (
    <>
      {error && (
        <div style={{ 
          backgroundColor: '#ffebee', 
          color: '#c62828', 
          padding: '15px', 
          borderRadius: '8px',
          marginBottom: '20px',
          border: '1px solid #f44336',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <span>⚠️ {error}</span>
          <button 
            onClick={clearError}
            style={{
              background: 'none',
              border: 'none',
              color: '#c62828',
              fontSize: '18px',
              cursor: 'pointer',
              padding: '0',
              marginLeft: '10px'
            }}
          >
            ✕
          </button>
        </div>
      )}
      
      {loading && (
        <div style={{ 
          backgroundColor: '#e3f2fd', 
          color: '#1565c0', 
          padding: '15px', 
          borderRadius: '8px',
          marginBottom: '20px',
          border: '1px solid #2196f3',
          textAlign: 'center'
        }}>
          <span>⏳ Đang xử lý...</span>
        </div>
      )}
      
      <AddUser 
        onCreate={handleCreateOrUpdate} 
        editUser={editUser} 
        onCancelEdit={cancelEdit}
        loading={loading}
      />
      
      <div style={{ margin: '20px 0' }}>
        <hr style={{ border: 'none', borderTop: '2px solid #e0e0e0' }} />
      </div>
      
      <UserList 
        users={users} 
        onEdit={handleEdit} 
        onDelete={handleDelete}
        loading={loading}
      />
    </>
  );
}

export default AppContent;
