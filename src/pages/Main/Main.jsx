import React, { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { getFeedbackDay } from '~/helpers/DateFormatterHelper';
import FeedbackService from '~/services/api/Feedback';

// Modals
import CreateFeedback from './components/CreateFeedback/CreateFeedback';
import EditFeedback from './components/EditFeedback/EditFeedback';
import ReadFeedback from './components/ReadFeedback/ReadFeedback';

import {
  Container,
  Content,
  ContentSeparator,
  ContentTitle,
  FeedbacksWrapper,
  FeedbackList,
  FeedbackItem,
  NewFeedbackButton,
  From,
  ItemTopSection,
} from './MainStyles';

function Main() {
  const [createModalState, setCreateModalState] = useState(false);
  const [readModalState, setReadModalState] = useState(false);
  const [editModalState, setEditModalState] = useState(false);
  const [createdFeedbacks, setCreatedFeedbacks] = useState([]);
  const [receivedFeedbacks, setReceivedFeedbacks] = useState([]);
  const [selectedFeedbackToRead, setSelectedFeedbackToRead] = useState({});
  const [selectedFeedbackToEdit, setSelectedFeedbackToEdit] = useState({});
  const loggedUserId = useSelector(({ user }) => user.id);

  useEffect(() => {
    getCreatedFeedbacks();
    getReceivedFeedbacks();
  }, [loggedUserId]);

  const getCreatedFeedbacks = useCallback(async () => {
    try {
      const response = await FeedbackService.getCreatedFeedbacks(loggedUserId);
      setCreatedFeedbacks(response);
    } catch (error) {
      console.log(error);
    }
  });

  const getReceivedFeedbacks = useCallback(async () => {
    try {
      const response = await FeedbackService.getReceivedFeedbacks(loggedUserId);
      setReceivedFeedbacks(response);
    } catch (error) {
      console.log(error);
    }
  });

  const openReadModal = (feedbackData) => {
    setSelectedFeedbackToRead(feedbackData);
    setReadModalState(true);
  };

  const openEditModal = (feedbackData) => {
    setSelectedFeedbackToEdit(feedbackData);
    setEditModalState(true);
  };

  return (
    <Container>
      <NewFeedbackButton onClick={() => setCreateModalState(true)}>
        New Feedback
      </NewFeedbackButton>
      <Content>
        <FeedbacksWrapper>
          <ContentTitle>Created Feedbacks</ContentTitle>
          <FeedbackList>
            {createdFeedbacks.length <= 0 && 'No received feedbacks found'}
            {createdFeedbacks.map((feedback) => {
              return (
                <FeedbackItem
                  key={feedback.id}
                  onClick={() => openEditModal(feedback)}
                >
                  <ItemTopSection>
                    <From>{`De: ${feedback.creator.name}`}</From>
                    <span>{getFeedbackDay(feedback.createdAt)}</span>
                  </ItemTopSection>
                  <From>{`Para: ${feedback.receiver.name}`}</From>
                </FeedbackItem>
              );
            })}
          </FeedbackList>
        </FeedbacksWrapper>
        <ContentSeparator />
        <FeedbacksWrapper>
          <ContentTitle>Received Feedbacks</ContentTitle>
          <FeedbackList>
            {receivedFeedbacks.length <= 0 && 'No received feedbacks found'}
            {receivedFeedbacks.map((feedback) => {
              return (
                <FeedbackItem
                  key={feedback.id}
                  onClick={() => openReadModal(feedback)}
                >
                  <ItemTopSection>
                    <From>{`De: ${feedback.creator.name}`}</From>
                    <span>{getFeedbackDay(feedback.createdAt)}</span>
                  </ItemTopSection>
                  <From>{`Para: ${feedback.receiver.name}`}</From>
                </FeedbackItem>
              );
            })}
          </FeedbackList>
        </FeedbacksWrapper>
      </Content>
      <CreateFeedback
        title="New Feedback"
        visible={createModalState}
        getCreatedFeedbacks={getCreatedFeedbacks}
        handleClose={() => setCreateModalState(false)}
      />

      <EditFeedback
        title="Update Feedback"
        visible={editModalState}
        selectedFeedbackToEdit={selectedFeedbackToEdit}
        getCreatedFeedbacks={getCreatedFeedbacks}
        handleClose={() => setEditModalState(false)}
      />

      <ReadFeedback
        title="Read Feedback"
        visible={readModalState}
        selectedFeedbackToRead={selectedFeedbackToRead}
        handleClose={() => setReadModalState(false)}
      />
    </Container>
  );
}

export default Main;
