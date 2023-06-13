import React from "react";
import s from "./table.module.scss";

const Table = ({ children, tableTitle, tableText }) => {
  return (
    <div className={s.table}>
      <h2>{tableTitle}</h2>
      <p>{tableText}</p>
      <ul className={s.userinfoTable}>
      {children}
      </ul>
    </div>
  );
};

export default Table;
