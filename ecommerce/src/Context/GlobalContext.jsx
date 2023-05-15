import React, { createContext } from "react";

export const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
  const [storage, setStorage] = React.useState([]);
  const [totalPay, setTotalPay] = React.useState(null);
  const [totalAmount, setTotalAmount] = React.useState(null);
  const [data, setData] = React.useState(null);
  const [globalData, setGlobalData] = React.useState(null);
  return (
    <GlobalContext.Provider
      value={{
        globalData,
        setGlobalData,
        storage,
        setStorage,
        totalPay,
        setTotalPay,
        totalAmount,
        setTotalAmount,
        data,
        setData,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
