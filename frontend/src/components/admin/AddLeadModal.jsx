import { useEffect, useState } from "react";
import { createLead } from "../../services/leadService";
import { getUsers } from "../../services/userService";

const AddLeadModal = ({ onClose, refreshLeads }) => {
  const [users, setUsers] = useState([]);

  const [formData, setFormData] = useState({
    parent_name: "",
    child_name: "",
    child_age: "",
    phone: "",
    email: "",
    preferred_centre: "",
    source: "",
    assigned_owner: "",
    next_followup: "",
    notes: "",
    status: "New",
  });

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const data = await getUsers();

      console.log("Users API:", data);

      // Supports both paginated and normal array responses
      if (Array.isArray(data)) {
        setUsers(data);
      } else if (Array.isArray(data.results)) {
        setUsers(data.results);
      } else {
        setUsers([]);
      }
    } catch (error) {
      console.error("Failed to load users:", error);
      setUsers([]);
    }
  };

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await createLead(formData);

      alert("Lead created successfully.");

      refreshLeads();

      onClose();
    } catch (error) {
      console.error(error);
      alert("Unable to create lead.");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
      <div className="bg-white rounded-xl shadow-xl w-[900px] p-8">

        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold">
            Add New Lead
          </h2>

          <button
            onClick={onClose}
            className="text-3xl hover:text-red-500"
          >
            ×
          </button>
        </div>

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-2 gap-5"
        >

          <input
            name="parent_name"
            placeholder="Parent Name"
            value={formData.parent_name}
            onChange={handleChange}
            className="border rounded-lg p-3"
            required
          />

          <input
            name="child_name"
            placeholder="Child Name"
            value={formData.child_name}
            onChange={handleChange}
            className="border rounded-lg p-3"
            required
          />

          <input
            type="number"
            name="child_age"
            placeholder="Child Age"
            value={formData.child_age}
            onChange={handleChange}
            className="border rounded-lg p-3"
          />

          <input
            name="phone"
            placeholder="Phone Number"
            value={formData.phone}
            onChange={handleChange}
            className="border rounded-lg p-3"
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="border rounded-lg p-3"
          />

          <input
            name="preferred_centre"
            placeholder="Preferred Centre"
            value={formData.preferred_centre}
            onChange={handleChange}
            className="border rounded-lg p-3"
          />

          <select
            name="source"
            value={formData.source}
            onChange={handleChange}
            className="border rounded-lg p-3"
          >
            <option value="">Lead Source</option>
            <option value="Walk In">Walk In</option>
            <option value="Facebook">Facebook</option>
            <option value="Instagram">Instagram</option>
            <option value="Google">Google</option>
            <option value="Referral">Referral</option>
            <option value="Website">Website</option>
          </select>

          <select
            name="assigned_owner"
            value={formData.assigned_owner}
            onChange={handleChange}
            className="border rounded-lg p-3"
            required
          >
            <option value="">Select Owner</option>

            {users.length > 0 ? (
              users.map((user) => (
                <option
                  key={user.id}
                  value={user.id}
                >
                  {user.username}
                </option>
              ))
            ) : (
              <option disabled>No users available</option>
            )}
          </select>

          <input
            type="datetime-local"
            name="next_followup"
            value={formData.next_followup}
            onChange={handleChange}
            className="border rounded-lg p-3 col-span-2"
          />

          <textarea
            rows="4"
            name="notes"
            placeholder="Notes..."
            value={formData.notes}
            onChange={handleChange}
            className="border rounded-lg p-3 col-span-2"
          />

          <div className="col-span-2 flex justify-end gap-4 mt-4">

            <button
              type="button"
              onClick={onClose}
              className="bg-gray-500 hover:bg-gray-600 text-white px-8 py-3 rounded-lg"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg"
            >
              Save Lead
            </button>

          </div>

        </form>
      </div>
    </div>
  );
};

export default AddLeadModal;