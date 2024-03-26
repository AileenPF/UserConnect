import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3001",
});

export const user = async () => {
  return await api.get("/user");
};

export const signup = async (userData) => {
  return await api.post("/register", userData);
};

export const signin = async (userData) => {
  return await api.post("/Signin", userData);
};
