import React, { useState } from 'react';
import CreateFeedback from './components/CreateFeedback/CreateFeedback';

import {
  Container,
  Content,
  ContentSeparator,
  ContentTitle,
  FeedbacksWrapper,
  FeedbackList,
  FeedbackItem,
  NewFeedbackButton,
} from './MainStyles';

function Main() {
  const [createModalState, setCreateModalState] = useState(false);

  return (
    <Container>
      <NewFeedbackButton onClick={() => setCreateModalState(true)}>
        New Feedback
      </NewFeedbackButton>
      <Content>
        <FeedbacksWrapper>
          <ContentTitle>Created Feedbacks</ContentTitle>
          <FeedbackList>
            <FeedbackItem>
              De: Willerson Para: Adriana Data: 30/09/2020
            </FeedbackItem>
          </FeedbackList>
        </FeedbacksWrapper>
        <ContentSeparator />
        <FeedbacksWrapper>
          <ContentTitle>Received Feedbacks</ContentTitle>
          <FeedbackList>
            <FeedbackItem>
              De: Adriana Para: Willerson Data: 30/09/2020
            </FeedbackItem>
          </FeedbackList>
        </FeedbacksWrapper>
      </Content>
      <CreateFeedback
        title="New Feedback"
        visible={createModalState}
        handleClose={() => setCreateModalState(false)}
      />
    </Container>
  );
}

export default Main;
