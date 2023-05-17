import React from "react";
import styles from "./Modal.module.css";

const Modal = ({ isOpen, text, src }) => {
  if (isOpen) {
    return (
      <div className={styles.containerModal}>
        <div className={styles.components}>
          <p>{text}</p>
          <img src={src} alt="Loading Gif"></img>
        </div>
      </div>
    );
  }

  return null;
};

export default Modal;
