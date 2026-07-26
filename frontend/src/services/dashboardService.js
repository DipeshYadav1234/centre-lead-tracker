import axiosInstance from "./axiosInstance";

export const getDashboardData = async () => {
    const response = await axiosInstance.get("leads/");
    return response.data;
};