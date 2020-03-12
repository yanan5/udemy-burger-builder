import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import registerServiceWorker from "./registerServiceWorker";
import axios from "axios";

const requestInterceptor = axios.interceptors.request.use(
  request => {
    console.log("request",request);
    return request;
  },
  err => {
    console.log(err);
    return Promise.reject(err);
  }
);
// axios.interceptors.request.eject(requestInterceptor);

const responseInterceptor = axios.interceptors.response.use(
  response => {
    console.log("response", response);
    return response;
  },
  err => {
    console.log(err);
    return Promise.reject(err);
  }
);
// axios.interceptors.response.eject(responseInterceptor);
ReactDOM.render(<App />, document.getElementById("root"));
registerServiceWorker();
