const axios = require("axios");
const get = require("lodash/get");
const dotenv = require("dotenv");

dotenv.config();

const makeCoinspotAxiosInstance = (options: any) => {
  const coinspotApi = axios.create(options);

  return coinspotApi;
};

const api = {
  userService: makeCoinspotAxiosInstance({
    baseURL: process.env.USER_SERVICE_URL,
    headers: {
      secretkey: process.env.USER_SERVICE_SECRET_KEY,
      appid: process.env.USER_SERVICE_APP_ID,
      internalkey: process.env.INTERNAL_KEY,
    },
  }),
};

export default api;
