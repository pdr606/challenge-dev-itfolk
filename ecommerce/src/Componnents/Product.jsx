import React from "react";
import { useParams } from "react-router-dom";

const Product = () => {
  const { id } = useParams();
  const [data, setData] = React.useState(null);

  React.useEffect(() => {
    async function restAPI() {
      const response = await fetch(
        `https://my-json-server.typicode.com/pdr606/api-test/products/${id}`
      );
      const json = await response.json();
      setData(json);
    }

    restAPI();
  }, []);

  if (data === null) return null;
  console.log(data);

  return (
    <div>
      <p>{data.produto}</p>
    </div>
  );
};

export default Product;
