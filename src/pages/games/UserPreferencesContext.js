import React, { createContext, useState } from 'react';

const UserPreferencesContext = createContext();

const UserPreferencesProvider = ({ children }) => {
  const [themeColor, setThemeColor] = useState('blue');
  const contextValues = {
    themeColor,
    setThemeColor: (color) => setThemeColor(color),
  };
  return (
    <UserPreferencesContext.Provider value={contextValues}>
      {children}
    </UserPreferencesContext.Provider>
  );
};

export { UserPreferencesProvider, UserPreferencesContext };
