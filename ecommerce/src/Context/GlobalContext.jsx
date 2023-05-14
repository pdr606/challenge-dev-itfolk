import React, { createContext } from "react";

export const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
  const [storage, setStorage] = React.useState([]);
  return (
    <GlobalContext.Provider value={{ storage, setStorage }}>
      {children}
    </GlobalContext.Provider>
  );
};
