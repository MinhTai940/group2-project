import React, { useState, useEffect } from 'react';

export default function AddUser({ onCreate, editUser, onCancelEdit }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    if (editUser) {
      setName(editUser.name || '');
      setEmail(editUser.email || '');
    } else {
      setName('');
      setEmail('');
    }
  }, [editUser]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // basic validation
    if (!name.trim()) {
      alert('Name không được để trống');
      return;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      alert('Email không hợp lệ');
      return;
    }

    const payload = { name: name.trim(), email: email.trim() };
    await onCreate(payload);
    // reset form if not editing
    if (!editUser) {
      setName('');
      setEmail('');
    }
  };

  return (
    <div>
      <h2>{editUser ? 'Sửa User' : 'Thêm User'}</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Tên:</label>
          <input value={name} onChange={e => setName(e.target.value)} />
        </div>
        <div>
          <label>Email:</label>
          <input value={email} onChange={e => setEmail(e.target.value)} />
        </div>
        <div>
          <button type="submit">{editUser ? 'Cập nhật' : 'Thêm'}</button>
          {editUser && <button type="button" onClick={onCancelEdit}>Hủy</button>}
        </div>
      </form>
    </div>
  );
}
