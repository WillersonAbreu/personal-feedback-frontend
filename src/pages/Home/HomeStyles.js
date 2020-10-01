// Styled componetns imports
import styled from 'styled-components';

//Unform
import { Form } from '@unform/web';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 87vh;
  justify-content: center;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: row;
  width: 50vw;
  height: 70%;
  margin: 0 auto;
  border: 0.5px solid #30cb7e;
  border-radius: 5px;

  @media (max-width: 800px) {
    display: flex;
    flex-direction: row;
    width: 95vw;
    height: 70%;
    margin: 0 auto;
    border: 0.5px solid #30cb7e;
    border-radius: 5px;
  }
`;

export const FormsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 49%;
  height: 100%;
`;

export const FormSeparator = styled.div`
  border-left: 4px solid #30cb7e;
  height: 100%;
`;

export const OrDiv = styled.div`
  width: 4vw;
  height: 4vw;
  background-color: white;
  border: 4px solid #30cb7e;
  border-radius: 50%;
  overflow: hidden;
  position: relative;
  z-index: 1;
  margin: 12vh -4.6vh;
  font-family: 'Bungee Inline', cursive;
  text-align: center;

  @media (max-width: 800px) {
    width: 15vw;
    height: 15vw;
    background-color: white;
    border: 4px solid #30cb7e;
    border-radius: 50%;
    overflow: hidden;
    position: relative;
    z-index: 1;
    margin: 12vh 0 0 -4.5vh;
    font-family: 'Bungee Inline', cursive;
    text-align: center;
  }
`;

export const StyledForm = styled(Form)`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  justify-content: center;

  input {
    width: 80%;
    margin: 0 auto 5% auto;
  }

  h3 {
    font-family: 'Bungee Inline', cursive;
    margin: 0 auto;
  }

  .error {
    margin: -3vh auto 2vh auto;
    color: red;
    font-size: 1.2em;
  }
`;

export const StyledButton = styled.button`
  margin: 0 auto;
  width: 40%;
  color: white;
  background-color: #30cb7e;
  border: none;
  border-radius: 5px;

  &:hover {
    cursor: pointer;
    opacity: 0.7;
  }
`;
