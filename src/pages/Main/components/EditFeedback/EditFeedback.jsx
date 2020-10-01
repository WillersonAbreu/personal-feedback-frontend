import React, { useEffect, useState, useRef, useCallback } from 'react';

// Ant design imports
import { Modal, message } from 'antd';

// Unform imports
import { Form } from '@unform/web';

// Yup
import * as Yup from 'yup';

// Components imports
import TextArea from '~/components/Unform/TextArea/TextArea';

import {
  StyledCreateButton,
  StyledInputLabel,
  SelectWrapper,
  ButtonsWrapper,
  StyledDeleteButton,
} from './EditFeedbackStyles';

import Select from '~/components/Unform/Select/Select';
import UserService from '~/services/api/User';
import { useSelector } from 'react-redux';
import FeedbackService from '~/services/api/Feedback';

function EditFeedback({
  title,
  visible,
  getCreatedFeedbacks,
  selectedFeedbackToEdit,
  handleClose,
}) {
  const [users, setUsers] = useState([]);
  const loggedUserId = useSelector(({ user }) => user.id);
  const formRef = useRef(null);

  const getUsers = useCallback(async () => {
    try {
      let response = await UserService.getAll();
      const newUsers = [];
      response.map((user) => {
        if (user.id !== loggedUserId) {
          newUsers.push({ value: user.id, label: user.name });
        }
        return true;
      });
      setUsers(newUsers);
    } catch (error) {
      console.log(error);
    }
  }, [loggedUserId]);

  useEffect(() => {
    getUsers();
  }, [loggedUserId, getUsers]);

  async function handleSubmit(data) {
    try {
      // Remove all previous errors
      formRef.current.setErrors({});

      // Schema to validate the form
      const schema = Yup.object({
        points_to_improve: Yup.string(),
        points_to_keep: Yup.string(),
        suggestions: Yup.string(),
        final_feedback: Yup.string(),
        user_creator_id: Yup.number(),
        user_receiver_id: Yup.number(),
      });

      data.user_creator_id = Number(loggedUserId);
      data.user_receiver_id = Number(data.user_receiver_id);

      await schema.validate(data, {
        abortEarly: false,
      });

      await FeedbackService.update(data);
      await getCreatedFeedbacks();
      handleClose();
      message.success('Feedback updated successfully');
    } catch (error) {
      // Showing validation errors on
      const validationErrors = {};
      if (error instanceof Yup.ValidationError) {
        error.inner.forEach((error) => {
          validationErrors[error.path] = error.message;
        });
        formRef.current.setErrors(validationErrors);
      } else {
        message.error(error.message);
      }
    }
  }

  async function handleDelete(feedbackId) {
    try {
      await FeedbackService.delete(feedbackId);
      handleClose();
      getCreatedFeedbacks();
    } catch (error) {
      message.error(error.message);
    }
  }

  const initialData = {
    user_creator_id: selectedFeedbackToEdit.creator
      ? selectedFeedbackToEdit.creator.id
      : '',
    user_receiver_id: selectedFeedbackToEdit.creator
      ? selectedFeedbackToEdit.receiver.id
      : '',
    points_to_improve: selectedFeedbackToEdit.creator
      ? selectedFeedbackToEdit.points_to_improve
      : '',
    points_to_keep: selectedFeedbackToEdit.creator
      ? selectedFeedbackToEdit.points_to_keep
      : '',
    suggestions: selectedFeedbackToEdit.creator
      ? selectedFeedbackToEdit.suggestions
      : '',
    final_feedback: selectedFeedbackToEdit.creator
      ? selectedFeedbackToEdit.final_feedback
      : '',
  };

  return (
    <>
      <Modal
        visible={visible}
        title={title}
        footer={null}
        onCancel={handleClose}
      >
        <Form initialData={initialData} ref={formRef} onSubmit={handleSubmit}>
          <SelectWrapper>
            <StyledInputLabel>Send to</StyledInputLabel>
            <Select name="user_receiver_id" options={users}>
              Send To
            </Select>
          </SelectWrapper>
          <SelectWrapper>
            <StyledInputLabel>Points to improve</StyledInputLabel>
            <TextArea name="points_to_improve" />
          </SelectWrapper>
          <SelectWrapper>
            <StyledInputLabel>Points to keep</StyledInputLabel>
            <TextArea name="points_to_keep" />
          </SelectWrapper>
          <SelectWrapper>
            <StyledInputLabel>Suggestions</StyledInputLabel>
            <TextArea name="suggestions" />
          </SelectWrapper>
          <SelectWrapper>
            <StyledInputLabel>Final feedback</StyledInputLabel>
            <TextArea name="final_feedback" />
          </SelectWrapper>
          <ButtonsWrapper>
            <StyledCreateButton type="submit">Update</StyledCreateButton>
            <StyledDeleteButton
              onClick={() => handleDelete(selectedFeedbackToEdit.id)}
            >
              Delete
            </StyledDeleteButton>
          </ButtonsWrapper>
        </Form>
      </Modal>
    </>
  );
}

export default EditFeedback;
