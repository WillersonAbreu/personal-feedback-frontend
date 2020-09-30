import React, { useEffect, useState } from 'react';

// Ant design imports
import { Modal, message } from 'antd';

// Unform imports
import { Form } from '@unform/web';

// Components imports
import TextArea from '~/components/Unform/TextArea/TextArea';

import {
  StyledCreateButton,
  StyledInputLabel,
  SelectWrapper,
} from './CreateFeedbackStyles';
import Select from '~/components/Unform/Select/Select';
import UserService from '~/services/api/User';

function CreateFeedback({ title, visible, setVisible, handleClose }) {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    getUsers();
  }, [users]);

  async function getUsers() {
    try {
      let response = await UserService.getAll();

      const newUsers = [];

      response.map((user) => {
        newUsers.push({ value: user.id, label: user.name });
      });

      setUsers(newUsers);
    } catch (error) {
      console.log(error);
    }
  }

  async function handleSubmit(data) {
    try {
      data.user_receiver_id = Number(data.user_receiver_id);

      console.log(data);
    } catch (error) {
      message.error(error.message);
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
        <Form name="updatePost" onSubmit={handleSubmit}>
          <SelectWrapper>
            <StyledInputLabel>Send to</StyledInputLabel>
            <Select name="user_receiver_id" options={users}>
              Send To
            </Select>
          </SelectWrapper>
          <StyledInputLabel>Points to improve</StyledInputLabel>
          <TextArea name="points_to_improve" />
          <StyledInputLabel>Points to keep</StyledInputLabel>
          <TextArea name="points_to_keep" />
          <StyledInputLabel>Suggestions</StyledInputLabel>
          <TextArea name="suggestions" />
          <StyledInputLabel>Final feedback</StyledInputLabel>
          <TextArea name="final_feedback" />
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
