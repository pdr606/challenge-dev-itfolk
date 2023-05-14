import React, { useContext, useState } from "react";
import styles from "./Product.module.css";
import { useParams } from "react-router-dom";
import Select from "../Hooks/Select";
import { GlobalContext } from "../Context/GlobalContext";

const Product = () => {
  const { id } = useParams();
  const [data, setData] = React.useState(null);
  const [quantidade, setQuantidade] = useState();

  const { storage, setStorage } = useContext(GlobalContext);

  function handleClick(e) {
    const { id, produto, image, preço } = data;

    if (quantidade === undefined) return null;
    let total = +preço.replace(".", "") * quantidade;

    const filterStorage = {
      id,
      produto,
      image,
      preço,
      quantidade,
      total,
    };

    setStorage([...storage, filterStorage]);
    console.log(storage);
  }

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
            <ul>
              {data.descricao.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
          <div className={styles.quantidade}>
            <h4>Quantidade: </h4>
            <Select
              text="0"
              value={quantidade}
              setValue={setQuantidade}
              options={["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"]}
            />
          </div>
          <button id={data.id} onClick={(e) => handleClick(e)}>
            Adicionar ao carrinho
          </button>
        </div>
      </div>
    </div>
  );
};

export default Product;
