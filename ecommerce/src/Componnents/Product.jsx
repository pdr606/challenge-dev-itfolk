import React, { useContext } from "react";
import styles from "./Product.module.css";
import Select from "../Hooks/Select";
import { useParams } from "react-router-dom";
import { GlobalContext } from "../Context/GlobalContext";

const Product = () => {
  const { id } = useParams();
  const [dataLocal, setDataLocal] = React.useState(null);
  const [quantidade, setQuantidade] = React.useState();
  const [notify, setNotify] = React.useState(null);
  const { totalAmount, setTotalAmount, data } = React.useContext(GlobalContext);
  const { storage, setStorage } = useContext(GlobalContext);

  function handleClick(e) {
    e.preventDefault();

    if (quantidade > 0) {
      setNotify(true);
    }
    setTimeout(() => {
      setNotify(null);
    }, 1000);

    const { id, produto, image, preço } = dataLocal;

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

    localStorage.setItem(
      "storage",
      JSON.stringify([...storage, filterStorage])
    );
    setStorage([...storage, filterStorage]);
  }

  React.useEffect(() => {
    function sum() {
      const totalToPay = storage.reduce((a, o) => a + +o.quantidade, 0);
      setTotalAmount(totalToPay);
    }

    sum();
  }, [storage, totalAmount, setTotalAmount]);

  React.useEffect(() => {
    const filterData = data.filter((item) => item.id === +id);
    setDataLocal(filterData[0]);
  }, [id, data]);

  if (dataLocal === null) return null;
  return (
    <div>
      <div className={styles.container}>
        <div className={styles.left}>
          <img src={dataLocal.image} alt="Imagem telefone" />
        </div>
        <div className={styles.right}>
          <h1>{dataLocal.produto}</h1>
          <h2>Confira esse preço imbátivel</h2>
          <p>
            <span>R$</span>
            {dataLocal.preço}
          </p>
          <div className={styles.about}>
            <p>Sobre este item: </p>
            <ul>
              {dataLocal.descricao.map((item) => (
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
          {notify ? (
            <h4 className={styles.notify}>Pedido adicionado ao carrinho ✔ </h4>
          ) : null}
          <button id={dataLocal.id} onClick={(e) => handleClick(e)}>
            Adicionar ao carrinho
          </button>
        </div>
      </div>
    </div>
  );
};

export default Product;