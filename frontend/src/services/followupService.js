import axiosInstance from "./axiosInstance";

export const getTodayFollowups = async () => {
  const token = localStorage.getItem("access");

  const response = await axiosInstance.get("followups/today/", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};
export const completeFollowup = async (id, data) => {
  const token = localStorage.getItem("access");

  const response = await axiosInstance.patch(
    `leads/${id}/followup/`,
    data,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};