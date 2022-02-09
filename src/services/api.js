import axios from "axios";

const baseURL = "http://localhost:8080";

export function getApplications() {
  return axios
    .get(`${baseURL}/apps`)
    .then(res => res.data)
    .catch(({ status }) => {
      console.log(status);
      return [];
    });
}

export function getApplication(name) {
  return axios
    .get(`${baseURL}/apps/${name}`)
    .then(res => res.data)
    .catch(({ status }) => {
      console.log(status);
      return [];
    });
}

export function addApplication(app) {
  return axios
    .post(`${baseURL}/apps/${app.name}`, app)
    .then(res => res.data)
    .catch(({ status }) => {
      console.log(status);
      return [];
    });
}

export function updateApplication(app) {
  return axios
    .put(`${baseURL}/apps/${app.id}`, app)
    .then(res => res.data)
    .catch(({ status }) => {
      console.log(status);
      return [];
    });
}

export function addTrace(name) {
  return axios
    .post(`${baseURL}/traces/${name}`)
    .then(res => res.data)
    .catch(({ status }) => {
      console.log(status);
      return [];
    });
}

export function deleteTrace(name) {
  return axios
    .delete(`${baseURL}/traces/${name}`)
    .then(res => res.data)
    .catch(({ status }) => {
      console.log(status);
      return [];
    });
}

export function deleteApplication(name) {
  return axios
    .delete(`${baseURL}/apps/${name}`)
    .then(res => res.data)
    .catch(({ status }) => {
      console.log(status);
      return [];
    });
}

export function getRetrace(name, id) {
  return axios
    .get(`${baseURL}/retrace/${name}/${id}`)
    .then(res => res.data)
    .catch(({ status }) => {
      console.log(status);
      return [];
    });
}

export function addRetrace(name, id) {
  return axios
    .post(`${baseURL}/retrace/${name}/${id}`)
    .then(res => res.data)
    .catch(({ status }) => {
      console.log(status);
      return [];
    });
}

export function getDump(name, frame) {
  return axios
    .get(`${baseURL}/dumps/${name}/${frame}`)
    .then(res => res.data)
    .catch(({ status }) => {
      console.log(status);
      return [];
    });
}

export function getTrace(name) {
  return axios
    .get(`${baseURL}/traces/${name}`)
    .then(res => res.data)
    .catch(({ status }) => {
      console.log(status);
      return [];
    });
}
