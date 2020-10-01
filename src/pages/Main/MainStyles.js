// Styled componetns imports
import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 87vh;
  justify-content: center;
`;

export const FeedbacksWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  width: 49%;
`;

export const ContentSeparator = styled.div`
  border-left: 4px solid #30cb7e;
  height: 100%;
  margin: 0 auto;
`;

export const ContentTitle = styled.h1`
  display: flex;
  margin: 0 auto;
  font-family: 'Bungee Inline', cursive;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: row;
  width: 95vw;
  height: 90%;
  margin: 0 auto;
  border: 0.5px solid #30cb7e;
  border-radius: 5px;
`;

export const FeedbackList = styled.div`
  display: flex;
  flex-direction: column;
  height: 90%;
  width: 90%;
  border: 0.5px solid #30cb7e;
  border-radius: 5px;
  margin: 0 auto;
  overflow: auto;
`;

export const FeedbackItem = styled.div`
  display: flex;
  flex-direction: column;
  height: 60px;
  width: 90%;
  border: 0.5px solid #30cb7e;
  border-radius: 5px;
  margin: 1vh auto 1vh auto;

  &:hover {
    cursor: pointer;
    opacity: 0.5;
  }
`;

export const From = styled.span`
  display: flex;
  font-weight: 500;
`;

export const NewFeedbackButton = styled.button`
  height: 55px;
  width: 160px;
  color: white;
  background-color: #30cb7e;
  border: none;
  outline: none;
  border-radius: 5px;
  margin: 1.5vh auto;
  font-family: 'Bungee Inline', cursive;

  &:hover {
    cursor: pointer;
    opacity: 0.5;
  }
`;

export const ItemTopSection = styled.div`
  display: flex;
  justify-content: space-between;
`;
