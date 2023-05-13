import React from "react";
import styles from "./Products.module.css";
import { Link } from "react-router-dom";

const Products = () => {
  const [data, setData] = React.useState(null);

  React.useEffect(() => {
    async function restAPI() {
      const response = await fetch(
        "https://my-json-server.typicode.com/pdr606/api-test/products"
      );
      const json = await response.json();
      setData(json);
    }

    restAPI();
  }, []);

  if (data === null) return null;

  console.log(data);

  return (
    <main>
      <div className={styles.container}>
        {data.map((item) => (
          <div key={item.id} className={styles.containerDiv}>
            <Link
              className={styles.link}
              to={`product/${item.id}`}
              key={item.id}
            >
              <img src={item.image} alt="imagem produto" />
              <h2>{item.produto}</h2>
            </Link>
            <p>
              <span>R$</span> {item.preço}
            </p>
          </div>
        ))}
      </div>
    </main>
  );
};

export default Products;
