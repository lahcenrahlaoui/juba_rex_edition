// context/UserContext.js

import React, { createContext, useContext, useState } from 'react';

// Create a Context
export const UserContext = createContext();

// Create a Provider component
export const UserProvider = ({ children }) => {
  const [userExists, setUserExists] = useState(false);

  const login = (x) => {
    setUserExists(x);
  };

 

  return (
    <UserContext.Provider value={{ userExists, login }}>
      {children}
    </UserContext.Provider>
  );
};

// Custom hook for using the context
export const useUser = () => {
  return useContext(UserContext);
};
