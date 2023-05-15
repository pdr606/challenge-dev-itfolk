import React from "react";
import { GlobalContext } from "../Context/GlobalContext";

const VerifyLocalStorage = () => {
  const { setStorage } = React.useContext(GlobalContext);

  const verify = React.useCallback(() => {
    if (localStorage.length > 0) {
      const takeLocalStorage = localStorage.getItem("storage");
      let parsedItem = JSON.parse(takeLocalStorage);
      setStorage(parsedItem);
    }
  }, [setStorage]);

  return {
    verify,
  };
};

export default VerifyLocalStorage;
