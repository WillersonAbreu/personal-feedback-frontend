import styled from 'styled-components';

export const SelectWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

export const StyledInputLabel = styled.label`
  &:hover {
    cursor: pointer;
    opacity: 0.8;
  }
`;

export const StyledCreateButton = styled.button`
  display: flex;
  height: 4vh;
  margin: 1vh auto;
  color: white;
  font-weight: bolder;
  outline: none;
  background-color: #1f804f;
  border: none;
  border-radius: 5px;
  text-align: center;
  &:hover {
    cursor: pointer;
    opacity: 0.7;
  }
`;
