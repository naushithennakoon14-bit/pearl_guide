import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

const DEMO_USERS = {
  traveler: {
    id: "usr_101",
    name: "Elena Rostova",
    email: "elena.travels@example.com",
    role: "traveler",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
    country: "Switzerland",
    joinedDate: "January 2026",
    travelCredits: 120,
    tripsCompleted: 2,
  },
  admin: {
    id: "adm_999",
    name: "Chaminda Silva",
    email: "admin@pearlguide.lk",
    role: "admin",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
    title: "Senior Destination Director",
    joinedDate: "October 2024",
    travelCredits: 0,
    tripsCompleted: 0,
  }
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('pearl_user');
    return saved ? JSON.parse(saved) : DEMO_USERS.traveler; // Default logged-in with demo traveler for smooth previewing
  });

  const [isAuthenticated, setIsAuthenticated] = useState(() => !!user);

  useEffect(() => {
    if (user) {
      localStorage.setItem('pearl_user', JSON.stringify(user));
      setIsAuthenticated(true);
    } else {
      localStorage.removeItem('pearl_user');
      setIsAuthenticated(false);
    }
  }, [user]);

  const login = (email, password, role = 'traveler') => {
    const targetUser = role === 'admin' ? DEMO_USERS.admin : {
      ...DEMO_USERS.traveler,
      email: email || DEMO_USERS.traveler.email,
    };
    setUser(targetUser);
    return { success: true, user: targetUser };
  };

  const register = (userData) => {
    const newUser = {
      id: `usr_${Date.now()}`,
      name: userData.name || "Explorer",
      email: userData.email,
      role: "traveler",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
      country: userData.country || "Global Traveler",
      joinedDate: "Just now",
      travelCredits: 50,
      tripsCompleted: 0,
    };
    setUser(newUser);
    return { success: true, user: newUser };
  };

  const logout = () => {
    setUser(null);
  };

  const switchDemoRole = (role) => {
    if (role === 'admin') {
      setUser(DEMO_USERS.admin);
    } else if (role === 'traveler') {
      setUser(DEMO_USERS.traveler);
    } else {
      setUser(null);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        isAdmin: user?.role === 'admin',
        login,
        register,
        logout,
        switchDemoRole,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
