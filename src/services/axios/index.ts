import axios from "axios";
import { auth } from "../firebase/config";

export function createAxios() {
  const instance = axios.create({
    baseURL: process.env.API_URL,
  });

  instance.interceptors.request.use(
    (config) => {
      // Do something before request is sent
      config.headers["user"] = auth.currentUser?.email;
      return config;
    },
    (error) => {
      // Do something with request error
      return Promise.reject(error);
    }
  );

  instance.interceptors.response.use(
    (response) => {
      // Do something with response data
      return response;
    },
    (error) => {
      // Do something with response error
      return Promise.reject(error);
    }
  );

  return instance;
}
