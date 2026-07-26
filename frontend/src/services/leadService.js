import axiosInstance from "./axiosInstance";

// ==============================
// Get Leads (with pagination)
// ==============================
export const getLeads = async (page = 1) => {
  const response = await axiosInstance.get(`leads/?page=${page}`);
  return response.data;
};

// ==============================
// Get Single Lead
// ==============================
export const getLead = async (id) => {
  const response = await axiosInstance.get(`leads/${id}/`);
  return response.data;
};

// ==============================
// Create Lead
// ==============================
export const createLead = async (leadData) => {
  const response = await axiosInstance.post("leads/", leadData);
  return response.data;
};

// ==============================
// Update Lead
// ==============================
export const updateLead = async (id, leadData) => {
  const response = await axiosInstance.put(
    `leads/${id}/`,
    leadData
  );

  return response.data;
};

// ==============================
// Archive Lead
// ==============================
export const archiveLead = async (id) => {
  const response = await axiosInstance.delete(
    `leads/${id}/`
  );

  return response.data;
};

// ==============================
// Restore Lead
// ==============================
export const restoreLead = async (id) => {
  const response = await axiosInstance.post(
    `leads/${id}/restore/`,
    {}
  );

  return response.data;
};

// ==============================
// Archived Leads
// ==============================
export const getArchivedLeads = async () => {
  const response = await axiosInstance.get(
    "leads/archived/"
  );

  return response.data;
};

// ==============================
// Export CSV
// ==============================
export const exportCSV = async () => {
  const response = await axiosInstance.get(
    "export-csv/",
    {
      responseType: "blob",
    }
  );

  return response.data;
};