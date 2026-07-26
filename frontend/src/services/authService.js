import axiosInstance from "./axiosInstance";

export const loginUser = async (username, password) => {
  const response = await axiosInstance.post("token/", {
    username,
    password,
  });

  return response.data;
};

export const getCurrentUser = async () => {
  const token = localStorage.getItem("access");

  const response = await axiosInstance.get("me/", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

export const registerUser = async (data) => {
  const response = await axiosInstance.post("register/", data);
  return response.data;
};