import React from "react";
import * as C from "./style";

const Button = ({ Text, onClick, Type = "button" }) => {

  return (<C.Button Type={Type} onClick={onClick}>
    {Text}
  </C.Button>
  );
};
export default Button;