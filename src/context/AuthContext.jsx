import React, { createContext, useState, useEffect, useContext } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check backend session or local storage mock fallback
  useEffect(() => {
    const checkSession = async () => {
      try {
        const res = await fetch('/auth/session');
        if (res.ok) {
          const data = await res.json();
          if (data && data.user) {
            setUser(data.user);
            setLoading(false);
            return;
          }
        }
      } catch (err) {
        console.warn('Backend session check failed, using cache fallback', err);
      }

      // Check LocalStorage mock fallback
      const cached = localStorage.getItem('matai_mock_user');
      if (cached) {
        setUser(JSON.parse(cached));
      }
      setLoading(false);
    };

    checkSession();
  }, []);

  const loginWithGoogle = () => {
    // Navigate to Flask oauth endpoint
    window.location.href = '/login';
  };

  const loginMockUser = (mockData = {
    name: 'Adept Solver',
    picture: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=150&q=80',
    email: 'adept@matai.edu'
  }) => {
    setUser(mockData);
    localStorage.setItem('matai_mock_user', JSON.stringify(mockData));
  };

  const logout = async () => {
    try {
      await fetch('/logout');
    } catch (err) {
      console.warn('Backend logout failed');
    }
    setUser(null);
    localStorage.removeItem('matai_mock_user');
    window.location.href = '/';
  };

  return (
    <AuthContext.Provider value={{ user, loading, loginWithGoogle, loginMockUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
