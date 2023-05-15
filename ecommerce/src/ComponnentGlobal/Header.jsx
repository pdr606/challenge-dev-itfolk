import React from "react";
import styles from "./Header.module.css";
import logoAmazon from "../img/Amazon.png";
import { Link } from "react-router-dom";
import shopingCart from "../img/shoppingCart.jpg";
import { GlobalContext } from "../Context/GlobalContext";

const Header = () => {
  const { totalAmount } = React.useContext(GlobalContext);

  return (
    <header>
      <div className={styles.container}>
        <div className={styles.containerImg}>
          <Link className={styles.Link} to="/">
            <img src={logoAmazon} alt="Logo Amazon" />
          </Link>
          <Link to="/shoppingCart">
            <img src={shopingCart} alt="Carrinho de compras" />
          </Link>
          <p className={styles.totalAmount}>{totalAmount}</p>
        </div>
      </div>
    </header>
  );
};

export default Header;
