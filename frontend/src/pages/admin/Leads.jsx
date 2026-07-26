import React, { useEffect, useState } from "react";
import AdminLayout from "../../components/admin/AdminLayout";
import { getLeads,archiveLead, } from "../../services/leadService";
import { useNavigate } from "react-router-dom";
import { FaEye } from "react-icons/fa";
import AddLeadModal from "../../components/admin/AddLeadModal";


const Leads = () => {
  const [leads, setLeads] = useState([]);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetchLeads();
  }, []);

  const fetchLeads = async () => {
    try {
      const data = await getLeads();
      setLeads(data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleArchive = async (id) => {
  const confirmDelete = window.confirm(
    "Are you sure you want to archive this lead?"
  );

  if (!confirmDelete) return;

  try {
    await archiveLead(id);

    // Reload the leads list
    fetchLeads();

    alert("Lead archived successfully.");

  } catch (error) {
    console.error(error);
    alert("Failed to archive lead.");
  }
};


  // Search Filter
  const filteredLeads = leads.filter((lead) => {
    const keyword = search.toLowerCase();

    return (
      lead.parent_name.toLowerCase().includes(keyword) ||
      lead.child_name.toLowerCase().includes(keyword) ||
      lead.phone.includes(keyword)
    );
  });

  return (
    <AdminLayout>

      {/* Header */}
      <div className="flex justify-between items-center mb-6">

        <h2 className="text-3xl font-bold">
          Leads
        </h2>

        <button onClick={() => setShowModal(true)} className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700">
          + Add Lead
        </button>

      </div>

      {/* Search Bar */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search by parent, child or phone..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Leads Table */}
      <div className="bg-white rounded-xl shadow overflow-hidden">

        <table className="w-full">

          <thead className="bg-slate-100">

            <tr>
              <th className="p-4 text-left">Parent</th>
              <th className="p-4 text-left">Child</th>
              <th className="p-4 text-left">Phone</th>
              <th className="p-4 text-left">Status</th>
              <th className="p-4 text-left">Assigned to</th>
              <th className="p-4 text-left">Actions</th>
            </tr>

          </thead>

          <tbody>

            {filteredLeads.length > 0 ? (

              filteredLeads.map((lead) => (

                <tr
                  key={lead.id}
                  className="border-t hover:bg-slate-50"
                >

                  <td className="p-4">{lead.parent_name}</td>

                  <td className="p-4">{lead.child_name}</td>

                  <td className="p-4">{lead.phone}</td>

                  <td className="p-4">{lead.status}</td>

                  <td className="p-4">{lead.assigned_owner_name || "-"}</td>

<td className="p-4 flex items-center gap-4">

  <button
    onClick={() => navigate(`/admin/leads/view/${lead.id}`)}
    className="text-gray-600 hover:text-blue-600"
    title="View"
  >
    <FaEye size={18} />
  </button>

  <button
    onClick={() => navigate(`/admin/leads/edit/${lead.id}`)}
    className="text-blue-600 hover:text-blue-800"
  >
    Edit
  </button>

  <button
    onClick={() => handleArchive(lead.id)}
    className="text-red-600 hover:text-red-800"
  >
    Archive
  </button>

</td>

                </tr>

              ))

            ) : (

              <tr>

                <td
                  colSpan="6"
                  className="text-center py-8 text-gray-500"
                >
                  No leads found.
                </td>

              </tr>

            )}

          </tbody>

        </table>

      </div>

      {
        showModal && (
        <AddLeadModal
            onClose={() => setShowModal(false)}
            refreshLeads={fetchLeads}
        />
)
}

    </AdminLayout>
  );
};



export default Leads;