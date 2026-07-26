import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaEye } from "react-icons/fa";

import AdminLayout from "../../components/admin/AdminLayout";
import AddLeadModal from "../../components/admin/AddLeadModal";

import {
  getLeads,
  archiveLead,
} from "../../services/leadService";

const Leads = () => {
  const navigate = useNavigate();

  const [leads, setLeads] = useState([]);
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    fetchLeads(page);
  }, [page]);

  const fetchLeads = async (pageNo = 1) => {
    try {
      const data = await getLeads(pageNo);

      setLeads(data.results);
      setTotalPages(Math.ceil(data.count / 10));
      setPage(pageNo);

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

      alert("Lead archived successfully.");

      fetchLeads(page);

    } catch (error) {
      console.error(error);
      alert("Failed to archive lead.");
    }
  };

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

        <button
          onClick={() => setShowModal(true)}
          className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700"
        >
          + Add Lead
        </button>

      </div>

      {/* Search */}

      <div className="mb-6">

        <input
          type="text"
          placeholder="Search by parent, child or phone..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

      </div>

      {/* Table */}

      <div className="bg-white rounded-xl shadow overflow-hidden">

        <table className="w-full">

          <thead className="bg-slate-100">

            <tr>
              <th className="p-4 text-left">Parent</th>
              <th className="p-4 text-left">Child</th>
              <th className="p-4 text-left">Phone</th>
              <th className="p-4 text-left">Status</th>
              <th className="p-4 text-left">Assigned To</th>
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

                  <td className="p-4">
                    {lead.parent_name}
                  </td>

                  <td className="p-4">
                    {lead.child_name}
                  </td>

                  <td className="p-4">
                    {lead.phone}
                  </td>

                  <td className="p-4">
                    {lead.status}
                  </td>

                  <td className="p-4">
                    {lead.assigned_owner_name || "-"}
                  </td>

                  <td className="p-4 flex items-center gap-4">

                    <button
                      onClick={() =>
                        navigate(`/admin/leads/view/${lead.id}`)
                      }
                      className="text-gray-600 hover:text-blue-600"
                      title="View"
                    >
                      <FaEye size={18} />
                    </button>

                    <button
                      onClick={() =>
                        navigate(`/admin/leads/edit/${lead.id}`)
                      }
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

      {/* Pagination */}

      <div className="flex justify-center items-center gap-4 mt-6">

        <button
          disabled={page === 1}
          onClick={() => fetchLeads(page - 1)}
          className={`px-4 py-2 rounded-lg ${
            page === 1
              ? "bg-gray-300 cursor-not-allowed"
              : "bg-blue-600 text-white hover:bg-blue-700"
          }`}
        >
          Previous
        </button>

        <span className="font-semibold">
          Page {page} of {totalPages}
        </span>

        <button
          disabled={page === totalPages}
          onClick={() => fetchLeads(page + 1)}
          className={`px-4 py-2 rounded-lg ${
            page === totalPages
              ? "bg-gray-300 cursor-not-allowed"
              : "bg-blue-600 text-white hover:bg-blue-700"
          }`}
        >
          Next
        </button>

      </div>

      {/* Modal */}

      {showModal && (

        <AddLeadModal
          onClose={() => setShowModal(false)}
          refreshLeads={() => fetchLeads(page)}
        />

      )}

    </AdminLayout>
  );
};

export default Leads;