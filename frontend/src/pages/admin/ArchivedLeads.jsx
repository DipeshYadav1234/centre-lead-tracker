import { useEffect, useState } from "react";
import AdminLayout from "../../components/admin/AdminLayout";
import {
  getArchivedLeads,
  restoreLead,
} from "../../services/leadService";

const ArchivedLeads = () => {
  const [leads, setLeads] = useState([]);

  useEffect(() => {
    fetchArchivedLeads();
  }, []);

  const fetchArchivedLeads = async () => {
    try {
      const data = await getArchivedLeads();
      setLeads(data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleRestore = async (id) => {
    const confirmRestore = window.confirm(
      "Restore this lead?"
    );

    if (!confirmRestore) return;

    try {
      await restoreLead(id);

      alert("Lead restored successfully.");

      fetchArchivedLeads();

    } catch (error) {
      console.error(error);

      alert("Failed to restore lead.");
    }
  };

  return (
    <AdminLayout>

      <h2 className="text-3xl font-bold mb-8">
        Archived Leads
      </h2>

      <div className="bg-white rounded-xl shadow overflow-hidden">

        <table className="w-full">

          <thead className="bg-slate-100">

            <tr>

              <th className="p-4 text-left">Parent</th>
              <th className="p-4 text-left">Child</th>
              <th className="p-4 text-left">Phone</th>
              <th className="p-4 text-left">Status</th>
              <th className="p-4 text-left">Owner</th>
              <th className="p-4 text-center">Action</th>

            </tr>

          </thead>

          <tbody>

            {leads.length > 0 ? (

              leads.map((lead) => (

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

                  <td className="p-4 text-center">

                    <button
                      onClick={() => handleRestore(lead.id)}
                      className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg"
                    >
                      Restore
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
                  No archived leads found.
                </td>

              </tr>

            )}

          </tbody>

        </table>

      </div>

    </AdminLayout>
  );
};

export default ArchivedLeads;