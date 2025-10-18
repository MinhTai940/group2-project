import React from 'react';

export default function UserList({ users, onEdit, onDelete }) {
  return (
    <div>
      <h2>Danh sách Users</h2>
      {users.length === 0 ? (
        <p>(Chưa có user nào)</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Id</th>
              <th>Name</th>
              <th>Email</th>
              <th>Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {users.map(u => (
              <tr key={u.id}>
                <td>{u.id}</td>
                <td>{u.name}</td>
                <td>{u.email}</td>
                <td>
                  <button onClick={() => onEdit(u)}>Sửa</button>
                  <button onClick={() => onDelete(u.id)}>Xóa</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
