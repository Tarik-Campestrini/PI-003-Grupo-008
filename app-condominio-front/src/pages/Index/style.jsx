import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  aling-items: center;
  justify-content: center;
  flex-dirction: column;
  gap 10px;
  higth: 100vh;


`;

export const Content = styled.div`
  gap:15px;
  display: flex;
  aling-items: center;
  justify-content: center;
  flex-dirction: column;
  width: 100%;
  box-shadow: 0 1px 2px #0003;
  backgroud-color: white;
  max-width: 350px;
  padding: 20px;
  border-radius: 5pa;

`;

export const Label = styled.label`
  font-size: 18px;
  font-weight: 600;
  color: #676767;

`;

export const LabelSignup = styled.label`
  font-size: 18px;
  color: #676767;

`;

export const LabelError = styled.label`
  font-size: 18px;
  color: red;

`;
export const Strong = styled.strong`
  cursor: pointer;
  a {text-decoration: none;
  color: #676767}

`;