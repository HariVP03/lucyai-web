import client from "axios";
import { auth } from "../firebase/config";

export function axios() {
  const instance = client.create({
    baseURL: process.env.API_URL || "http://localhost:3000",
    // baseURL: process.env.API_URL || "https://lucyai-api.harivishnu.com",
  });

  console.log({
    baseURL: process.env.API_URL || "http://localhost:3000",
    // baseURL: process.env.API_URL || "https://lucyai-api.harivishnu.com",
  });

  instance.interceptors.request.use(
    (config) => {
      // Do something before request is sent
      config.headers["user"] = auth.currentUser?.email;
      config.headers["content-type"] = "application/json";
      config.headers["accept"] = "application/json";

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
