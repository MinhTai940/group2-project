import React from 'react';
import { UserProvider } from './contexts/UserContext';
import UserList from './components/UserList';
import AddUser from './components/AddUser';
import AppContent from './components/AppContent';

function App() {
  return (
    <UserProvider>
      <div style={{ padding: 20 }}>
        <h1 style={{ 
          textAlign: 'center', 
          color: '#333', 
          marginBottom: '30px',
          fontSize: '2.5rem',
          fontWeight: 'bold'
        }}>
          🚀 Quản lý User
        </h1>
        <AppContent />
      </div>
    </UserProvider>
  );
}

export default App;
