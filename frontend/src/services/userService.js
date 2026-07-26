import axiosInstance from "./axiosInstance";

export const getUsers = async () => {
  const token = localStorage.getItem("access");

  const response = await axiosInstance.get("users/", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};