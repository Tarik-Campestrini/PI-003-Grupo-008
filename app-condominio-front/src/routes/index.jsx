import  {BrowserRouter, Route, Routes}  from "react-router-dom";
import Index from "../pages/Index";
import Home from "../pages/Home";

import { Fragment } from "react";

// eslint-disable-next-line no-unused-vars
const Private = ({Item}) => {
  const index = true;
  return index > 0 ? <Item /> : <Index />
}

const RoutesApp = () => {
  return (
    <BrowserRouter>
      <Fragment>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/home" element={<Private Item={Home} />} />
         
        </Routes>
      </Fragment>
    </BrowserRouter>
  );
};

export default RoutesApp;