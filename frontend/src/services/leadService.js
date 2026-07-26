import axiosInstance from "./axiosInstance";

// Get all leads
export const getLeads = async () => {
  const token = localStorage.getItem("access");

  const response = await axiosInstance.get("leads/", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

// Create a new lead
export const createLead = async (leadData) => {
  const token = localStorage.getItem("access");

  const response = await axiosInstance.post("leads/", leadData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

// Update an existing lead
export const updateLead = async (id, leadData) => {
  const token = localStorage.getItem("access");

  const response = await axiosInstance.put(
    `leads/${id}/`,
    leadData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};

// Archive (soft delete) a lead
export const archiveLead = async (id) => {
  const token = localStorage.getItem("access");

  const response = await axiosInstance.delete(`leads/${id}/`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

export const getLead = async (id) => {
  const token = localStorage.getItem("access");

  const response = await axiosInstance.get(`leads/${id}/`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

export const restoreLead = async (id) => {
  const token = localStorage.getItem("access");

  const response = await axiosInstance.post(
    `leads/${id}/restore/`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};

export const getArchivedLeads = async () => {
  const token = localStorage.getItem("access");

  const response = await axiosInstance.get(
    "leads/archived/",
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};



export const exportCSV = async () => {
  const token = localStorage.getItem("access");

  const response = await axiosInstance.get("export-csv/", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    responseType: "blob",
  });

  return response.data;
};