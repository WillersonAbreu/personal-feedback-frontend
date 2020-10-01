import React from 'react';

// Ant design imports
import { Modal } from 'antd';

//Styles
import {
  HeaderContent,
  FeedbackContent,
  SectionTitle,
} from './ReadFeedbackStyles';
import { getFeedbackDay } from '~/helpers/DateFormatterHelper';

function CreateFeedback({
  title,
  visible,
  selectedFeedbackToRead,
  handleClose,
}) {
  return (
    <>
      <Modal
        visible={visible}
        title={title}
        footer={null}
        onCancel={handleClose}
      >
        {selectedFeedbackToRead.creator && (
          <>
            <HeaderContent>
              <div>
                <SectionTitle>De:</SectionTitle>
                {` ${selectedFeedbackToRead.creator.name}`}
              </div>
              <div>
                <SectionTitle>Para:</SectionTitle>
                {` ${selectedFeedbackToRead.receiver.name}`}
              </div>
              <div>
                <SectionTitle>Data:</SectionTitle>
                {` ${getFeedbackDay(selectedFeedbackToRead.createdAt)}`}
              </div>
            </HeaderContent>
            <SectionTitle>Points to improve:</SectionTitle>
            <FeedbackContent>
              {selectedFeedbackToRead.points_to_improve}
            </FeedbackContent>
            <SectionTitle>Points to keep:</SectionTitle>
            <FeedbackContent>
              {selectedFeedbackToRead.points_to_keep}
            </FeedbackContent>
            <SectionTitle>Suggestions:</SectionTitle>
            <FeedbackContent>
              {selectedFeedbackToRead.suggestions}
            </FeedbackContent>
            <SectionTitle>Final feedback:</SectionTitle>
            <FeedbackContent>
              {selectedFeedbackToRead.final_feedback}
            </FeedbackContent>
          </>
        )}
      </Modal>
    </>
  );
}

export default CreateFeedback;
