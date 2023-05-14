import React from "react";
import { GlobalContext } from "../Context/GlobalContext";
import styles from "./Storage.module.css";

const Storage = () => {
  const { storage, setStorage } = React.useContext(GlobalContext);
  const [totalPay, setTotalPay] = React.useState(null);
  const [totalAmount, setTotalAmount] = React.useState(null);

  function deleteItem(item) {
    const newStorage = storage.filter((obj) => obj !== item);
    setStorage(newStorage);
  }

  React.useEffect(() => {
    function sum() {
      const totalToAmount = storage.reduce(
        (a, o) => a + Number(o.quantidade),
        0
      );
      const totalToPay = storage.reduce((a, o) => a + o.total, 0);
      setTotalAmount(totalToAmount);
      setTotalPay(totalToPay);
    }

    sum();
  }, [storage, totalPay, totalAmount]);

  return (
    <div>
      <div className={styles.container}>
        <h1 className={styles.titulo}>Carrinho de compras:</h1>
        {storage.map((item) => (
          <div className={styles.containerStorage}>
            <div className={styles.containerStorageImg}>
              <div className={styles.img}>
                <img src={item.image} alt="Imagem Produto" />
              </div>
            </div>
            <div className={styles.containerInfo}>
              <h2>{item.produto}</h2>
              <p>Preço: R$ {item.preço}</p>
              <p>Quantidade: {item.quantidade}</p>
              <p>Total: R$ {item.total}</p>
              <button
                onClick={() => deleteItem(item)}
                className={styles.button}
              >
                Excluir
              </button>
            </div>
          </div>
        ))}
        <div className={styles.finishBuy}>
          <h2>
            Subtotal ({totalAmount} itens): R$ {totalPay}
          </h2>
        </div>
      </div>
    </div>
  );
};

export default Storage;
