// src/app/authcontext/page.jsx
'use client'; // 클라이언트 사이드 컴포넌트

import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext();

// AuthProvider 컴포넌트 정의
export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [role, setRole] = useState(''); // 관리자 여부 확인

  const login = (role) => {
    setIsAuthenticated(true);
    setRole(role);
  };

  const logout = () => {
    setIsAuthenticated(false);
    setRole('');
    localStorage.removeItem('jwtToken');  // 로컬 스토리지에서 토큰 삭제
  };

  // 로컬 스토리지에서 토큰 정보 및 사용자 역할을 확인
  useEffect(() => {
    const token = localStorage.getItem('jwtToken');
    const savedRole = localStorage.getItem('role');
    if (token && savedRole) {
      login(savedRole);  // 자동으로 관리자로 로그인
    }
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, role, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
