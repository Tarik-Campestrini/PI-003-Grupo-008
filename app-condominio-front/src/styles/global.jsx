import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  * {
  margin: 0;
  padding: auto;
  box-sizing: border-box;
  font-family: "Poppins", serif;

}

body {
  min-height: 100vh;
  width: 100vw;
  backgroud-color: #f0f2f5;  
}
`;

export default GlobalStyle;
 
