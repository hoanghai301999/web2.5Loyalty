import axios from 'axios';
import authHeader from './auth.header';

const API_URL = 'http://44.204.105.120:3001/api/';

class UserService {
  getPublicContent() {
    return axios.get(API_URL + 'all');
  }

  async getUserBoard(username) {
    return await (await axios.get(API_URL + 'accounts?username='+username , {})).data.data;
  }
  async getUserTransaction(address) {
    return await (await axios.get(API_URL + 'transactions?address='+address , {})).data.data;
  }
  async getUserHistory(address) {
    return await (await axios.get(API_URL + 'history?address='+address , {})).data.data;
  }
  async sendTransaction(sender,reveicer, amount) {
    return await axios.post(API_URL + "withdrawal", {
      sender:sender,
      recipient:reveicer,
      amount:amount
    });
  }
  getModeratorBoard() {
    return axios.get(API_URL + 'mod', { headers: authHeader() });
  }

  getAdminBoard() {
    return axios.get(API_URL + 'admin', { headers: authHeader() });
  }
}

export default new UserService();