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
} from './CreateFeedbackStyles';
import Select from '~/components/Unform/Select/Select';
import UserService from '~/services/api/User';
import { useSelector } from 'react-redux';
import FeedbackService from '~/services/api/Feedback';

function CreateFeedback({ title, visible, getCreatedFeedbacks, handleClose }) {
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

  async function handleSubmit(data, { reset }) {
    try {
      // Remove all previous errors
      formRef.current.setErrors({});

      // Schema to validate the form
      const schema = Yup.object({
        points_to_improve: Yup.string().required(
          'Is necessary insert the points to improve'
        ),
        points_to_keep: Yup.string().required(
          'Is necessary insert the points to keep'
        ),
        suggestions: Yup.string().required('Is necessary insert suggestions'),
        final_feedback: Yup.string().required(
          'Is necessary insert the final feedback'
        ),
        user_creator_id: Yup.number().required(
          'Is necessary insert the creator'
        ),
        user_receiver_id: Yup.number().required(
          'Is necessary select the receiver user'
        ),
      });

      data.user_creator_id = Number(loggedUserId);
      data.user_receiver_id = Number(data.user_receiver_id);

      await schema.validate(data, {
        abortEarly: false,
      });

      await FeedbackService.create(data);
      await getCreatedFeedbacks();
      reset();
      message.success('Feedback created successfully');
    } catch (error) {
      // Showing validation errors on
      const validationErrors = {};
      if (error instanceof Yup.ValidationError) {
        error.inner.forEach((error) => {
          validationErrors[error.path] = error.message;
        });
        formRef.current.setErrors(validationErrors);
      } else {
        message.error(error.message); //'Failed when trying to login!');
      }
    }
  }

  return (
    <>
      <Modal
        visible={visible}
        title={title}
        footer={null}
        onCancel={handleClose}
      >
        <Form ref={formRef} name="updatePost" onSubmit={handleSubmit}>
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
          <StyledCreateButton
            style={{ display: 'flex', margin: '0 auto' }}
            type="submit"
          >
            Send
          </StyledCreateButton>
        </Form>
      </Modal>
    </>
  );
}

export default CreateFeedback;
