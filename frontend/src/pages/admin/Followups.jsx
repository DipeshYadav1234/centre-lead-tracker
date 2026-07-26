import { useEffect, useState } from "react";
import AdminLayout from "../../components/admin/AdminLayout";
import {
  getTodayFollowups,
  completeFollowup,
} from "../../services/followupService";

const Followups = () => {
  const [followups, setFollowups] = useState([]);
  const [loading, setLoading] = useState(true);

  const [showModal, setShowModal] = useState(false);
  const [selectedLead, setSelectedLead] = useState(null);

  const [status, setStatus] = useState("");
  const [notes, setNotes] = useState("");
  const [nextFollowup, setNextFollowup] = useState("");

  useEffect(() => {
    loadFollowups();
  }, []);

  const loadFollowups = async () => {
    try {
      const data = await getTodayFollowups();
      setFollowups(data);
    } catch (error) {
      console.error(error);
      alert("Unable to load follow-ups.");
    } finally {
      setLoading(false);
    }
  };

  const openModal = (lead) => {
    setSelectedLead(lead);

    setStatus(lead.status);
    setNotes(lead.notes || "");

    setNextFollowup(
      lead.next_followup
        ? lead.next_followup.slice(0, 16)
        : ""
    );

    setShowModal(true);
  };

  const handleComplete = async () => {
    try {
      console.log("Selected Lead:", selectedLead);
      console.log("Lead ID:", selectedLead?.id);
      await completeFollowup(selectedLead.id, {
        status,
        notes,
        next_followup: nextFollowup,
      });

      alert("Follow-up updated successfully.");

      setShowModal(false);
      setSelectedLead(null);

      loadFollowups();

    } catch (error) {
      console.error(error);
      console.log("Status:", error.response.status);
      console.log("Response:", error.response.data);
      alert("Failed to update follow-up.");
    }
  };

  return (
    <AdminLayout>
      <div className="p-8 bg-slate-100 min-h-screen">

        <h1 className="text-4xl font-bold mb-8">
          Follow-ups
        </h1>

        <div className="bg-white rounded-xl shadow overflow-hidden">

          {loading ? (

            <div className="p-8 text-center">
              Loading...
            </div>

          ) : followups.length === 0 ? (

            <div className="p-8 text-center text-gray-500">
              No follow-ups scheduled for today.
            </div>

          ) : (

            <table className="w-full">

              <thead className="bg-gray-50">

                <tr className="border-b">

                  <th className="p-4 text-left">Parent</th>

                  <th className="p-4 text-left">Child</th>

                  <th className="p-4 text-left">Phone</th>

                  <th className="p-4 text-left">Follow-up</th>

                  <th className="p-4 text-left">Status</th>

                  <th className="p-4 text-left">Assigned To</th>

                  <th className="p-4 text-center">Action</th>

                </tr>

              </thead>

              <tbody>

                {followups.map((lead) => (

                  <tr
                    key={lead.id}
                    className="border-b hover:bg-gray-50 transition"
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
                      {new Date(lead.next_followup).toLocaleString()}
                    </td>

                    <td className="p-4">
                      <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-sm">
                        {lead.status}
                      </span>
                    </td>

                    <td className="p-4">
                      {lead.assigned_owner_name}
                    </td>

                    <td className="p-4 text-center">

                      <button
                        onClick={() => openModal(lead)}
                        className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition"
                      >
                        Complete
                      </button>

                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          )}

        </div>

        {/* Complete Follow-up Modal */}

        {showModal && (

          <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

            <div className="bg-white rounded-xl shadow-xl w-[600px] p-8">

              <h2 className="text-2xl font-bold mb-6">
                Complete Follow-up
              </h2>

              <div className="space-y-5">

                <div>

                  <label className="block mb-2 font-semibold">
                    Status
                  </label>

                  <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    className="w-full border rounded-lg p-3"
                  >
                    <option value="New">New</option>
                    <option value="Contacted">Contacted</option>
                    <option value="Demo Scheduled">Demo Scheduled</option>
                    <option value="Demo Completed">Demo Completed</option>
                    <option value="Converted">Converted</option>
                    <option value="Lost">Lost</option>
                  </select>

                </div>

                <div>

                  <label className="block mb-2 font-semibold">
                    Notes
                  </label>

                  <textarea
                    rows="4"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className="w-full border rounded-lg p-3"
                  />

                </div>

                <div>

                  <label className="block mb-2 font-semibold">
                    Next Follow-up
                  </label>

                  <input
                    type="datetime-local"
                    value={nextFollowup}
                    onChange={(e) => setNextFollowup(e.target.value)}
                    className="w-full border rounded-lg p-3"
                  />

                </div>

                <div className="flex justify-end gap-4">

                  <button
                    onClick={() => {
                      setShowModal(false);
                      setSelectedLead(null);
                    }}
                    className="bg-gray-500 text-white px-6 py-3 rounded-lg"
                  >
                    Cancel
                  </button>

                  <button
                    onClick={handleComplete}
                    className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg"
                  >
                    Save
                  </button>

                </div>

              </div>

            </div>

          </div>

        )}

      </div>
    </AdminLayout>
  );
};

export default Followups;