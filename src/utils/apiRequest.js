import axiosAPI from "./axios";
import axios from "axios";

const getInfoWithURL = (url) => {
  return axios.get(url).then((response) => response.data);
};

const getPeople = ({ id, params }) => {
  return axiosAPI
    .get(id ? `/people/${id}/` : params ? `/people/${params}` : `/people`)
    .then((response) => response.data);
};

export default {
  getInfoWithURL,
  getPeople,
};
