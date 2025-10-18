import React from 'react';

export default function UserList({ users, onEdit, onDelete, loading }) {
  if (loading && users.length === 0) {
    return (
      <div style={{ 
        textAlign: 'center', 
        padding: '40px',
        backgroundColor: '#f9f9f9',
        borderRadius: '8px',
        border: '1px solid #ddd'
      }}>
        <div style={{ fontSize: '18px', color: '#666' }}>
          Đang tải danh sách users...
        </div>
      </div>
    );
  }

  return (
    <div style={{ 
      border: '1px solid #ddd', 
      borderRadius: '8px',
      backgroundColor: 'white',
      overflow: 'hidden'
    }}>
      <div style={{ 
        backgroundColor: '#f5f5f5', 
        padding: '15px', 
        borderBottom: '1px solid #ddd' 
      }}>
        <h2 style={{ margin: 0, color: '#333' }}>
          Danh sách Users ({users.length})
        </h2>
      </div>
      
      {users.length === 0 ? (
        <div style={{ 
          textAlign: 'center', 
          padding: '40px',
          color: '#666'
        }}>
          <div style={{ fontSize: '18px', marginBottom: '10px' }}>
            📝 Chưa có user nào
          </div>
          <div style={{ fontSize: '14px' }}>
            Hãy thêm user đầu tiên bằng form phía trên
          </div>
        </div>
      ) : (
        <div style={{ overflowX: 'auto' }}>
          <table style={{ 
            width: '100%', 
            borderCollapse: 'collapse',
            fontSize: '14px'
          }}>
            <thead>
              <tr style={{ backgroundColor: '#f8f9fa' }}>
                <th style={{ 
                  padding: '12px', 
                  textAlign: 'left', 
                  borderBottom: '2px solid #dee2e6',
                  fontWeight: 'bold',
                  color: '#495057'
                }}>
                  ID
                </th>
                <th style={{ 
                  padding: '12px', 
                  textAlign: 'left', 
                  borderBottom: '2px solid #dee2e6',
                  fontWeight: 'bold',
                  color: '#495057'
                }}>
                  Tên
                </th>
                <th style={{ 
                  padding: '12px', 
                  textAlign: 'left', 
                  borderBottom: '2px solid #dee2e6',
                  fontWeight: 'bold',
                  color: '#495057'
                }}>
                  Email
                </th>
                <th style={{ 
                  padding: '12px', 
                  textAlign: 'center', 
                  borderBottom: '2px solid #dee2e6',
                  fontWeight: 'bold',
                  color: '#495057'
                }}>
                  Thao tác
                </th>
              </tr>
            </thead>
            <tbody>
              {users.map((u, index) => (
                <tr 
                  key={u.id}
                  style={{ 
                    backgroundColor: index % 2 === 0 ? 'white' : '#f8f9fa',
                    borderBottom: '1px solid #dee2e6'
                  }}
                >
                  <td style={{ 
                    padding: '12px', 
                    fontFamily: 'monospace',
                    fontSize: '12px',
                    color: '#6c757d'
                  }}>
                    {u.id}
                  </td>
                  <td style={{ padding: '12px', fontWeight: '500' }}>
                    {u.name}
                  </td>
                  <td style={{ padding: '12px', color: '#007bff' }}>
                    {u.email}
                  </td>
                  <td style={{ padding: '12px', textAlign: 'center' }}>
                    <div style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
                      <button 
                        onClick={() => onEdit(u)}
                        disabled={loading}
                        style={{
                          padding: '6px 12px',
                          backgroundColor: '#ffc107',
                          color: '#212529',
                          border: 'none',
                          borderRadius: '4px',
                          cursor: loading ? 'not-allowed' : 'pointer',
                          fontSize: '12px',
                          fontWeight: 'bold',
                          opacity: loading ? 0.6 : 1
                        }}
                      >
                        ✏️ Sửa
                      </button>
                      <button 
                        onClick={() => onDelete(u.id)}
                        disabled={loading}
                        style={{
                          padding: '6px 12px',
                          backgroundColor: '#dc3545',
                          color: 'white',
                          border: 'none',
                          borderRadius: '4px',
                          cursor: loading ? 'not-allowed' : 'pointer',
                          fontSize: '12px',
                          fontWeight: 'bold',
                          opacity: loading ? 0.6 : 1
                        }}
                      >
                        🗑️ Xóa
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
