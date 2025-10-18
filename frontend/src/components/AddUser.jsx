import React, { useState, useEffect } from 'react';
import { useUser } from '../contexts/UserContext';

export default function AddUser({ onCreate, editUser, onCancelEdit, loading }) {
  const { clearError } = useUser();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (editUser) {
      setName(editUser.name || '');
      setEmail(editUser.email || '');
    } else {
      setName('');
      setEmail('');
    }
    setErrors({});
    clearError(); // Clear any previous errors when switching modes
  }, [editUser, clearError]);

  const validateForm = () => {
    const newErrors = {};
    
    // Validation cho name
    if (!name.trim()) {
      newErrors.name = 'Name không được để trống';
    } else if (name.trim().length < 2) {
      newErrors.name = 'Name phải có ít nhất 2 ký tự';
    } else if (name.trim().length > 50) {
      newErrors.name = 'Name không được quá 50 ký tự';
    }

    // Validation cho email
    if (!email.trim()) {
      newErrors.email = 'Email không được để trống';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Email không hợp lệ';
    } else if (email.length > 100) {
      newErrors.email = 'Email không được quá 100 ký tự';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    try {
      setIsSubmitting(true);
      const payload = { 
        name: name.trim(), 
        email: email.trim().toLowerCase() 
      };
      await onCreate(payload);
      
      // Reset form nếu không phải đang edit
      if (!editUser) {
        setName('');
        setEmail('');
      }
      setErrors({});
    } catch (err) {
      console.error('Submit error:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
    // Clear error khi user bắt đầu nhập
    if (errors.name) {
      setErrors(prev => ({ ...prev, name: '' }));
    }
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    // Clear error khi user bắt đầu nhập
    if (errors.email) {
      setErrors(prev => ({ ...prev, email: '' }));
    }
  };

  return (
    <div style={{ 
      border: '1px solid #ddd', 
      padding: '20px', 
      borderRadius: '8px',
      backgroundColor: '#f9f9f9',
      marginBottom: '20px',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
    }}>
      <h2 style={{ 
        marginTop: 0, 
        color: '#333',
        display: 'flex',
        alignItems: 'center',
        gap: '10px'
      }}>
        {editUser ? '✏️ Sửa User' : '➕ Thêm User'}
      </h2>
      
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        <div>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
            Tên: <span style={{ color: 'red' }}>*</span>
          </label>
          <input 
            type="text"
            value={name} 
            onChange={handleNameChange}
            disabled={loading || isSubmitting}
            style={{
              width: '100%',
              padding: '8px',
              border: errors.name ? '2px solid #f44336' : '1px solid #ccc',
              borderRadius: '4px',
              fontSize: '14px',
              backgroundColor: loading || isSubmitting ? '#f5f5f5' : 'white',
              transition: 'border-color 0.3s ease'
            }}
            placeholder="Nhập tên người dùng"
          />
          {errors.name && (
            <div style={{ color: '#f44336', fontSize: '12px', marginTop: '5px' }}>
              {errors.name}
            </div>
          )}
        </div>
        
        <div>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
            Email: <span style={{ color: 'red' }}>*</span>
          </label>
          <input 
            type="email"
            value={email} 
            onChange={handleEmailChange}
            disabled={loading || isSubmitting}
            style={{
              width: '100%',
              padding: '8px',
              border: errors.email ? '2px solid #f44336' : '1px solid #ccc',
              borderRadius: '4px',
              fontSize: '14px',
              backgroundColor: loading || isSubmitting ? '#f5f5f5' : 'white',
              transition: 'border-color 0.3s ease'
            }}
            placeholder="Nhập email người dùng"
          />
          {errors.email && (
            <div style={{ color: '#f44336', fontSize: '12px', marginTop: '5px' }}>
              {errors.email}
            </div>
          )}
        </div>
        
        <div style={{ display: 'flex', gap: '10px' }}>
          <button 
            type="submit" 
            disabled={loading || isSubmitting}
            style={{
              padding: '10px 20px',
              backgroundColor: editUser ? '#ff9800' : '#4caf50',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: loading || isSubmitting ? 'not-allowed' : 'pointer',
              fontSize: '14px',
              fontWeight: 'bold',
              opacity: loading || isSubmitting ? 0.6 : 1,
              transition: 'opacity 0.3s ease'
            }}
          >
            {isSubmitting ? '⏳ Đang xử lý...' : (editUser ? '🔄 Cập nhật' : '✅ Thêm')}
          </button>
          
          {editUser && (
            <button 
              type="button" 
              onClick={onCancelEdit}
              disabled={loading || isSubmitting}
              style={{
                padding: '10px 20px',
                backgroundColor: '#f44336',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: loading || isSubmitting ? 'not-allowed' : 'pointer',
                fontSize: '14px',
                fontWeight: 'bold',
                opacity: loading || isSubmitting ? 0.6 : 1,
                transition: 'opacity 0.3s ease'
              }}
            >
              ❌ Hủy
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
