import React, { Children } from "react";
import "./Board.scss";

const Board = ({title, children}) => {
  return <div className="board">
    <h3>{title}</h3>

    {children}
  </div>;
};

export default Board;
