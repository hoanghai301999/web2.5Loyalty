import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';
const API_URL = "http://44.204.105.120:3001/api/";


class AuthService {
  login(username, password) {
    return axios
      .post(API_URL + "login", 
      {
        "username":username,
        "password":password
      })
      .then(response => {
        console.log("aaaaaaa:"+response.data);
        AsyncStorage.setItem("user", JSON.stringify(response.data.data));
        return response.data;
      });
  }

  logout() {
    AsyncStorage.removeItem("user");
  }
  logoutAuth() {
    AsyncStorage.removeItem("userAuth");
  }
  register(username, password) {
    return axios.post(API_URL + "register", {
      "username":username,
      "password":password
    }).then(response => {
      
        AsyncStorage.setItem("user", JSON.stringify(response.data.data
          ));
      return response.data;
    });
  }
  setCurrentUser(user) {
    AsyncStorage.setItem("userAuth", JSON.stringify(user));
  }
  async getCurrentUser() {
    const user = await AsyncStorage.getItem('user');
    if(user){
      return JSON.parse(user);
    }else{
      return null;
    }
  }
  
  setCurrentAuthUser(user) {
    AsyncStorage.setItem("userAuth", JSON.stringify(user));
  }
  async getCurrentAuthUser() {
    const user = await AsyncStorage.getItem('userAuth');
    if(user){
      
      return JSON.parse(user);
    }else{
      return null;
    }
  }
    
}

export default new AuthService();