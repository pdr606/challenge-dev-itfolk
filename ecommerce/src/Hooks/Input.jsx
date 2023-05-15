import React from "react";

function Input({ id, label, value, onChange, setValue, ...props }) {
  return (
    <>
      <label htmlFor={id}>{label}</label>
      <input
        type="text"
        id={id}
        name={id}
        value={value}
        onChange={onChange}
        {...props}
      ></input>
    </>
  );
}

export default Input;
