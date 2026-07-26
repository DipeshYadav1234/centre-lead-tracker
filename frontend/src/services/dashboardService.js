import axiosInstance from "./axiosInstance";

export const getDashboardStats = async () => {
  const token = localStorage.getItem("access");

  const response = await axiosInstance.get("dashboard/", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};


export const getUserDashboard = async () => {
  const token = localStorage.getItem("access");

  const response = await axiosInstance.get("dashboard/user/", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};