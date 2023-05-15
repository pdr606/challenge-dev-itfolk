import React from "react";
import styles from "./Products.module.css";
import { Link } from "react-router-dom";
import Select from "../Hooks/Select";
import Input from "../Hooks/Input";
import { GlobalContext } from "../Context/GlobalContext";

const Products = () => {
  const [category, setCategory] = React.useState("Todas");
  const [product, setProduct] = React.useState("");
  const [data, setData] = React.useState(null);
  const { totalAmount, setTotalAmount } = React.useContext(GlobalContext);
  const { storage, setStorage } = React.useContext(GlobalContext);

  React.useEffect(() => {
    if (localStorage.length > 0) {
      const takeLocalStorage = localStorage.getItem("storage");
      let parsedItem = JSON.parse(takeLocalStorage);
      setStorage(parsedItem);
    }
  }, [setStorage]);

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
