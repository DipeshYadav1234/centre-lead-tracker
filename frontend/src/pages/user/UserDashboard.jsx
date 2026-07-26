import { useEffect, useState } from "react";
import { getDashboardStats } from "../../services/dashboardService";
import { updateLead } from "../../services/leadService";

const UserDashboard = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {
    try {
      const res = await getDashboardStats();
      setData(res);
    } catch (err) {
      console.log(err);
    }
  };

  const handleStatusChange = async (id, status) => {
    try {
      const lead = data.leads.find((l) => l.id === id);

      await updateLead(id, {
        ...lead,
        status,
      });

      await loadDashboard();

      alert("Status updated successfully.");
    } catch (err) {
      console.error(err);
      alert("Failed to update status.");
    }
  };

  if (!data) {
    return (
      <div className="flex items-center justify-center h-screen">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100">

      {/* Navbar */}
      <nav className="bg-blue-700 text-white h-16 flex justify-between items-center px-8">
        <h1 className="text-2xl font-bold">
          Centre Lead Tracker
        </h1>

        <button className="bg-white text-blue-700 px-4 py-2 rounded-lg">
          Logout
        </button>
      </nav>

      <div className="p-8">

        <h1 className="text-3xl font-bold">
          Welcome User 👋
        </h1>

        <p className="text-gray-600 mt-2">
          Here are your assigned leads.
        </p>

        {/* Dashboard Cards */}
        <div className="grid grid-cols-3 gap-6 mt-8">

          <div className="bg-white rounded-xl shadow p-6">
            <h2 className="text-gray-500">Total Leads</h2>
            <p className="text-4xl font-bold text-blue-600">
              {data.total_leads}
            </p>
          </div>

          <div className="bg-white rounded-xl shadow p-6">
            <h2 className="text-gray-500">Converted</h2>
            <p className="text-4xl font-bold text-green-600">
              {data.converted}
            </p>
          </div>

          <div className="bg-white rounded-xl shadow p-6">
            <h2 className="text-gray-500">Pending</h2>
            <p className="text-4xl font-bold text-red-600">
              {data.pending}
            </p>
          </div>

        </div>

        {/* Leads Table */}
        <div className="bg-white mt-10 rounded-xl shadow p-6">

          <h2 className="text-xl font-bold mb-4">
            My Leads
          </h2>

          <table className="w-full">

            <thead>
              <tr className="border-b">
                <th className="text-left p-2">Parent</th>
                <th className="text-left p-2">Child</th>
                <th className="text-left p-2">Phone</th>
                <th className="text-left p-2">Status</th>
              </tr>
            </thead>

            <tbody>

              {data.leads.map((lead) => (
                <tr key={lead.id} className="border-b">

                  <td className="p-2">
                    {lead.parent_name}
                  </td>

                  <td className="p-2">
                    {lead.child_name}
                  </td>

                  <td className="p-2">
                    {lead.phone}
                  </td>

                  <td className="p-2">
                    <select
                      value={lead.status}
                      onChange={(e) =>
                        handleStatusChange(
                          lead.id,
                          e.target.value
                        )
                      }
                      className="border rounded-lg px-3 py-2 w-full"
                    >
                      <option value="New">New</option>
                      <option value="Contacted">Contacted</option>
                      <option value="Demo Scheduled">
                        Demo Scheduled
                      </option>
                      <option value="Demo Completed">
                        Demo Completed
                      </option>
                      <option value="Converted">
                        Converted
                      </option>
                      <option value="Lost">
                        Lost
                      </option>
                    </select>
                  </td>

                </tr>
              ))}

            </tbody>

          </table>

        </div>

      </div>

    </div>
  );
};

export default UserDashboard;