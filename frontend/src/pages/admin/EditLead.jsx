import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import AdminLayout from "../../components/admin/AdminLayout";
import { getLead , updateLead } from "../../services/leadService";

const EditLead = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [lead, setLead] = useState({
    parent_name: "",
    child_name: "",
    phone: "",
    email: "",
    status: "",
    notes: "",
  });

  useEffect(() => {
    fetchLead();
  }, []);

  const fetchLead = async () => {
    try {
      const data = await getLead(id);
      setLead(data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    await updateLead(id, lead);

    alert("Lead updated successfully.");

    navigate("/admin/leads");
  } catch (error) {
    console.error(error);
    alert("Failed to update lead.");
  }
};

  return (
    <AdminLayout>
      <h2 className="text-3xl font-bold mb-8">
        Edit Lead
      </h2>

      <form onSubmit={handleSubmit}className="bg-white rounded-xl shadow p-8 grid grid-cols-2 gap-6">

        <div>
          <label className="block mb-2 font-semibold">
            Parent Name
          </label>

          <input
            type="text"
            value={lead.parent_name}
            className="w-full border rounded-lg p-3"
            readOnly
          />
        </div>

        <div>
          <label className="block mb-2 font-semibold">
            Child Name
          </label>

          <input
            type="text"
            value={lead.child_name}
            className="w-full border rounded-lg p-3"
            readOnly
          />
        </div>

        <div>
          <label className="block mb-2 font-semibold">
            Phone
          </label>

          <input
            type="text"
            value={lead.phone}
            className="w-full border rounded-lg p-3"
            readOnly
          />
        </div>

        <div>
          <label className="block mb-2 font-semibold">
            Email
          </label>

          <input
            type="email"
            value={lead.email}
            className="w-full border rounded-lg p-3"
            readOnly
          />
        </div>

        <div>
          <label className="block mb-2 font-semibold">
            Status
          </label>

          <select
            className="w-full border rounded-lg p-3"
            value={lead.status}
            onChange={(e) =>
                setLead({
                    ...lead,
                    status: e.target.value,
                })
                }
          >
            <option>New</option>
            <option>Contacted</option>
            <option>Demo Scheduled</option>
            <option>Demo Completed</option>
            <option>Converted</option>
            <option>Lost</option>
          </select>
        </div>

        <div>
          <label className="block mb-2 font-semibold">
            Notes
          </label>

          <textarea
            rows="4"
            className="w-full border rounded-lg p-3"
            value={lead.notes}
            onChange={(e) =>
              setLead({ ...lead, notes: e.target.value })
            }
          />
        </div>

        <div className="col-span-2 flex justify-end gap-4">

          <button
            type="button"
            onClick={() => navigate("/admin/leads")}
            className="bg-gray-500 text-white px-6 py-3 rounded-lg"
          >
            Cancel
          </button>

          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-3 rounded-lg"
          >
            Save Changes
          </button>

        </div>

      </form>
    </AdminLayout>
  );
};

export default EditLead;