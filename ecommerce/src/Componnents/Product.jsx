import React from "react";
import styles from "./Product.module.css";
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
  }, [id]);

  if (data === null) return null;
  console.log(data);

  return (
    <div>
      <div className={styles.container}>
        <div className={styles.left}>
          <img src={data.image} alt="Imagem telefone" />
        </div>
        <div className={styles.right}>
          <h1>{data.produto}</h1>
          <h2>Confira esse preço imbátivel</h2>
          <p>
            <span>R$</span>
            {data.preço}
          </p>
          <div className={styles.about}>
            <p>Sobre este item: </p>
            {data.descricao.map((item) => (
              <ul>
                <li key={item}>{item}</li>
              </ul>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
