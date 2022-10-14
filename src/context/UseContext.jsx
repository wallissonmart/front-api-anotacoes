import { createContext, useState } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
  const [updateNotes, setUpdateNotes] = useState(false);

  return (
    <AuthContext.Provider value={{ updateNotes, setUpdateNotes }}>
      {children}
    </AuthContext.Provider>
  );
};

