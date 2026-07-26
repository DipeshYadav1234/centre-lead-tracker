import React, { useEffect, useState } from "react";
import { getDashboardStats } from "../../services/dashboardService";
import AdminLayout from "../../components/admin/AdminLayout";

const Dashboard = () => {
  const [stats, setStats] = useState({
    total_leads: 0,
    overdue: 0,
    demo_scheduled: 0,
    converted: 0,
  });

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      const data = await getDashboardStats();
      setStats(data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <AdminLayout>

      <h2 className="text-3xl font-bold mb-8">
        Dashboard
      </h2>

      <div className="grid grid-cols-4 gap-6">

        <div className="bg-white rounded-xl shadow p-6">
          <h3 className="text-gray-500">Total Leads</h3>
          <p className="text-4xl font-bold text-blue-600">
            {stats.total_leads}
          </p>
        </div>

        <div className="bg-white rounded-xl shadow p-6">
          <h3 className="text-gray-500">Overdue</h3>
          <p className="text-4xl font-bold text-red-500">
            {stats.overdue}
          </p>
        </div>

        <div className="bg-white rounded-xl shadow p-6">
          <h3 className="text-gray-500">Demo Scheduled</h3>
          <p className="text-4xl font-bold text-yellow-500">
            {stats.demo_scheduled}
          </p>
        </div>

        <div className="bg-white rounded-xl shadow p-6">
          <h3 className="text-gray-500">Converted</h3>
          <p className="text-4xl font-bold text-green-600">
            {stats.converted}
          </p>
        </div>

      </div>

    </AdminLayout>
  );
};

export default Dashboard;