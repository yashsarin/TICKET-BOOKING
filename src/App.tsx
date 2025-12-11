import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import HomePage from './pages/HomePage';
import AdminPage from './pages/AdminPage';
import BookingPage from './pages/BookingPage';
import { AuthProvider, useAuth } from './context/AuthContext';
import { ShowProvider } from './context/ShowContext';

const Nav = () => {
  const { auth, loginAsAdmin, loginAsUser, logout } = useAuth();
  return (
    <nav style={{display:'flex',gap:12,padding:12,borderBottom:'1px solid #ddd'}}>
      <Link to="/">Home</Link>
      <Link to="/admin">Admin</Link>
      <div style={{marginLeft:'auto'}}>
        {auth?.user ? (
          <>
            <span>{auth.user.name} ({auth.user.role})</span>
            <button onClick={logout} style={{marginLeft:8}}>Logout</button>
          </>
        ) : (
          <>
            <button onClick={loginAsUser}>Login User</button>
            <button onClick={loginAsAdmin} style={{marginLeft:8}}>Login Admin</button>
          </>
        )}
      </div>
    </nav>
  );
};

export default function App(){
  return (
    <BrowserRouter>
      <AuthProvider>
        <ShowProvider>
          <Nav />
          <main>
            <Routes>
              <Route path="/" element={<HomePage/>} />
              <Route path="/admin" element={<AdminPage/>} />
              <Route path="/booking/:id" element={<BookingPage/>} />
            </Routes>
          </main>
        </ShowProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}
