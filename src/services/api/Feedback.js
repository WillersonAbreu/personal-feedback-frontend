import axios from 'axios';
import AxiosConfig from './config/AxiosConfig';

export default class FeedbackService {
  static async getCreatedFeedbacks(userId) {
    try {
      const response = await axios.get(
        `/feedbacks/created/${userId}`,
        AxiosConfig.config
      );
      return response.data;
    } catch (error) {
      return error;
    }
  }

  static async getReceivedFeedbacks(userId) {
    try {
      const response = await axios.get(
        `/feedbacks/received/${userId}`,
        AxiosConfig.config
      );
      return response.data;
    } catch (error) {
      return error;
    }
  }

  static async create(data) {
    try {
      const response = await axios.post('/feedbacks', data, AxiosConfig.config);
      return response.data;
    } catch (error) {
      return error;
    }
  }

  static async update(data) {
    try {
      const response = await axios.put(
        `/feedbacks/${data}`,
        data,
        AxiosConfig.config
      );
      return response.data;
    } catch (error) {
      return error;
    }
  }

  static async delete(data) {
    try {
      const response = await axios.delete(
        `/feedbacks/${data}`,
        AxiosConfig.config
      );
      return response.data;
    } catch (error) {
      return error;
    }
  }
}
