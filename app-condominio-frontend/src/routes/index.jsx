import  {BrowserRouter, Route, Routes}  from "react-router-dom";
import Index from "../pages/Index";
import Home from "../pages/Home";
import Cadastrar from "../pages/cadastrar";
import Entregas from "../pages/entregas";
import useAuth from "../hooks/useAuth";

import { Fragment } from "react";

// eslint-disable-next-line no-unused-vars
const Private = ({Item}) => {
  const index = useAuth;
  return index > 0 ? <Item /> : <Index />
}

const RoutesApp = () => {
  return (
    <BrowserRouter>
      <Fragment>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/home" element={<Home />} />
          <Route path="/cadastrar" element={<Cadastrar />} />
          <Route path="/entregas" element={<Entregas />} />
         
        </Routes>
      </Fragment>
    </BrowserRouter>
  );
};

export default RoutesApp;