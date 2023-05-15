import React from "react";
import { GlobalContext } from "../Context/GlobalContext";

const useFetch = () => {
  const { data, setData } = React.useContext(GlobalContext);
  const [error, setError] = React.useState(null);
  const [loading, setLoading] = React.useState(null);

  const request = React.useCallback(
    async (url, options) => {
      let response;
      let json;
      try {
        setError(null);
        setLoading(true);
        response = await fetch(url, options);
        json = await response.json();
      } catch (erro) {
        json = null;
        setError("Falha no carregamento");
      } finally {
        setLoading(false);
        setData(json);
        return { response, json };
      }
    },
    [setData]
  );

  return {
    data,
    error,
    loading,
    request,
  };
};

export default useFetch;
