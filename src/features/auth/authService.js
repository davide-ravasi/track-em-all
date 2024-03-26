import axios from "axios";

const actualHost = process.env.REACT_APP_EXPRESS_ENDPOINT;

//const actualHost =
//("https://8888-davideravasi-trackemall-mclb840f9og.ws-eu110.gitpod.io/.netlify/functions/express");

const register = async (data) => {
  if (data) {
    return await axios.post(actualHost + "/user/register", data, {
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
};

const login = async (data) => {
  if (data) {
    const response = await axios.post(actualHost + "/user/login", data, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.data) {
      localStorage.setItem("tea-token", response.data.token);
      return response;
    }
  }
};

const authService = {
  register,
  login,
};

export default authService;
