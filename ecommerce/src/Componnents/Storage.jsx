import React from "react";
import { GlobalContext } from "../Context/GlobalContext";
import styles from "./Storage.module.css";
import badIcon from "../img/badIcon.png";
import Modal from "../Hooks/Modal";
import loadingGif from "../img/loadingGif.gif";

const Storage = () => {
  const { storage, setStorage } = React.useContext(GlobalContext);
  const { totalPay, setTotalPay } = React.useContext(GlobalContext);
  const { totalAmount, setTotalAmount } = React.useContext(GlobalContext);
  const [openModal, setOpenModal] = React.useState(false);

  const deleteItem = React.useCallback(
    (item) => {
      const newStorage = storage.filter((obj) => obj !== item);
      localStorage.setItem("storage", JSON.stringify(newStorage));
      setStorage(newStorage);
    },
    [storage, setStorage]
  );

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
  }, [storage, totalPay, totalAmount, setTotalAmount, setTotalPay]);

  React.useEffect(() => {
    if (openModal) {
      setTimeout(() => {
        setStorage([]);
        setOpenModal(false);
      }, 4000);
    }
    deleteItem();
  }, [openModal, setStorage, deleteItem]);

  return (
    <div>
      {totalPay > 0 ? (
        <div className={styles.container}>
          <h1 className={styles.titulo}>Carrinho de compras:</h1>
          {storage.map((item) => (
            <div key={item.id} className={styles.containerStorage}>
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
              Subtotal ({totalAmount} itens): <span>R$ {totalPay}</span>
            </h2>
            <button onClick={() => setOpenModal(!openModal)}>Finalizar</button>

            <Modal
              text="Obrigado pela preferência, seu pedido está sendo finalizado"
              className={styles.modal}
              isOpen={openModal}
              src={loadingGif}
            />
          </div>
        </div>
      ) : (
        <div className={styles.storageZero}>
          <img src={badIcon} alt="Icone de um rosto triste" />
          <p>Seu carrinho ainda está vazio.</p>
        </div>
      )}
    </div>
  );
};

export default Storage;
