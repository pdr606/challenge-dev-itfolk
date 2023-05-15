import React from "react";
import styles from "./Products.module.css";
import { Link } from "react-router-dom";
import Select from "../Hooks/Select";
import Input from "../Hooks/Input";
import useFetch from "../Hooks/useFetch";
import loadingGif2 from "../img/loadingGif2.gif";
import VerifyLocalStorage from "../Hooks/VerifyLocalStorage";
import { GlobalContext } from "../Context/GlobalContext";

const Products = () => {
  const [resultApi, setResultApi] = React.useState([]);
  const { verify } = VerifyLocalStorage();
  const { request, loading, error, data } = useFetch();
  const { totalAmount, setTotalAmount, storage } =
    React.useContext(GlobalContext);
  const [category, setCategory] = React.useState("Todas");
  const [product, setProduct] = React.useState("");

  React.useEffect(() => {
    verify();
  }, [verify]);

  React.useEffect(() => {
    if (data === null) {
      async function fetchData() {
        const { response, json } = await request(
          "https://my-json-server.typicode.com/pdr606/api-test/products"
        );
        setResultApi(response, json);
      }
      fetchData();
    }
  }, [request, data]);

  React.useEffect(() => {
    function sum() {
      const totalToPay = storage.reduce((a, o) => a + +o.quantidade, 0);
      setTotalAmount(totalToPay);
    }
    sum();
  }, [storage, totalAmount, setTotalAmount]);

  function handleChange({ target }) {
    setProduct(target.value);
  }

  const filterProduct =
    product.length > 0
      ? data.filter((item) =>
          item.produto.toLowerCase().includes(product.toLowerCase())
        )
      : [];

  const filterCategory =
    category !== "Todas"
      ? data.filter((item) => item.categoria === category)
      : [];

  const filteredItems = product.length > 0 ? filterProduct : filterCategory;
  const itemsToDisplay = filteredItems.length > 0 ? filteredItems : data;

  if (loading)
    return (
      <p className={styles.loading}>
        Carregando... <img src={loadingGif2} alt="Gif de Carregamento" />
      </p>
    );
  if (data)
    return (
      <main>
        <form className={styles.containerInput}>
          <div className={styles.containerInputBox}>
            <Select
              text="Todas"
              className={styles.inputSelect}
              options={["Samsung", "Apple", "Xiaomi"]}
              value={category}
              setValue={setCategory}
            />
            <Input
              onChange={handleChange}
              className={styles.inputInput}
              placeholder="Pesquise o seu Produto"
              id="product"
              value={product}
              setValue={setProduct}
            />
          </div>
        </form>
        <div className={styles.container}>
          {itemsToDisplay.map((item) => (
            <div key={item.id} className={`${styles.containerDiv} animaLeft`}>
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
