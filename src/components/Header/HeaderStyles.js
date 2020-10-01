// Styled componetns imports
import styled from 'styled-components';

const StyledHeader = styled.header`
  top: 0;
  right: 0;
  left: 0;
  z-index: 1;
  display: flex;
  position: fixed;
  width: 100%;
  height: 80px;
  background-color: #30cb7e;
  border: 1px solid #30cb7e;
  -webkit-box-shadow: 0px -7px 8px 7px rgba(138, 138, 138, 1);
  -moz-box-shadow: 0px -7px 8px 7px rgba(138, 138, 138, 1);
  box-shadow: 0px -7px 8px 7px rgba(138, 138, 138, 1);
`;

export const LogoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  font-family: 'Bungee Inline', cursive;

  h1 {
    padding-top: 5%;
  }
`;

export const RightContainer = styled.div`
  margin: 1vh auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: absolute;
  right: 5vw;
  border-radius: 5px;
  width: 12vh;
  height: 10vh;

  h3 {
    font-weight: 700;

    &:hover {
      cursor: pointer;
      transition: all 0.5s;
      color: white;
    }
  }
`;

export default StyledHeader;
