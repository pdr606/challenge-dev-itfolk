import React from "react";
import styles from "./Header.module.css";
import logoAmazon from "../img/Amazon.png";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header>
      <div className={styles.container}>
        <div className={styles.containerImg}>
          <Link className={styles.Link} to="/">
            <img src={logoAmazon} alt="Logo Amazon" />
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
