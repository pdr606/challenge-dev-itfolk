import React, { useContext } from "react";
import styles from "./Product.module.css";
import Select from "../Hooks/Select";
import { useParams } from "react-router-dom";
import { GlobalContext } from "../Context/GlobalContext";
import useFetch from "../Hooks/useFetch";
import loadingGif2 from "../img/loadingGif2.gif";

const Product = () => {
  const { id } = useParams();
  const { request, loading, error, data } = useFetch();
  const [quantidade, setQuantidade] = React.useState();
  const [notify, setNotify] = React.useState(null);
  const { totalAmount, setTotalAmount } = React.useContext(GlobalContext);
  const { storage, setStorage } = useContext(GlobalContext);

  function handleClick(e) {
    e.preventDefault();

    if (quantidade > 0) {
      setNotify(true);
    }
    setTimeout(() => {
      setNotify(null);
    }, 1000);

    const { id, produto, image, preço } = data;
    if (quantidade === undefined || quantidade === "0") return null;

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
    async function fetchData() {
      const { response, json } = await request(
        `https://my-json-server.typicode.com/pdr606/api-test/products/${id}`
      );
    }
    fetchData();
  }, [request, id, data]);

  if (loading)
    return (
      <p className={styles.loading}>
        Carregando... <img src={loadingGif2} alt="Gif de Carregamento" />
      </p>
    );
  if (data)
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
            {notify ? (
              <h4 className={styles.notify}>
                Pedido adicionado ao carrinho ✔{" "}
              </h4>
            ) : null}
            <button id={data.id} onClick={(e) => handleClick(e)}>
              Adicionar ao carrinho
            </button>
          </div>
        </div>
      </div>
    );
};

export default Product;
