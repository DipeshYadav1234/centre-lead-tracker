
import React, { useEffect, useState } from "react";
import { getDashboardData } from "../services/dashboardService";

const Dashboard = () => {
  const [leads, setLeads] = useState([]);

useEffect(() => {
    fetchDashboard();
}, []);

const fetchDashboard = async () => {
    try {
        const data = await getDashboardData();
        setLeads(data);
    } catch (error) {
        console.error(error);
    }
};

const totalLeads = leads.length;

const converted = leads.filter(
    lead => lead.status === "Converted"
).length;

const demoScheduled = leads.filter(
    lead => lead.status === "Demo Scheduled"
).length;

const overdue = leads.filter(lead => {
    if (!lead.next_followup) return false;

    return new Date(lead.next_followup) < new Date();
}).length;

  return (
    <div className="min-h-screen bg-slate-100">

      {/* Navbar */}
      <nav className="bg-blue-700 text-white h-16 flex items-center justify-between px-8 shadow">

        <h1 className="text-2xl font-bold">
          Centre Lead Tracker
        </h1>

        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-white text-blue-700 flex items-center justify-center font-bold">
            D
          </div>
        </div>

      </nav>

      {/* Main */}

      <div className="flex">

        {/* Sidebar */}

        <aside className="w-64 bg-white shadow min-h-screen p-5">

          <ul className="space-y-4">

            <li className="bg-blue-600 text-white rounded-lg p-3">
              Dashboard
            </li>

            <li className="hover:bg-slate-100 rounded-lg p-3 cursor-pointer">
              Leads
            </li>

            <li className="hover:bg-slate-100 rounded-lg p-3 cursor-pointer">
              Follow-ups
            </li>

            <li className="hover:bg-slate-100 rounded-lg p-3 cursor-pointer">
              Export CSV
            </li>

          </ul>

        </aside>

        {/* Content */}

        <main className="flex-1 p-8">

          <h2 className="text-3xl font-bold mb-8">
            Dashboard
          </h2>

          <div className="grid grid-cols-4 gap-6">

            <div className="bg-white rounded-xl shadow p-6">

              <h3 className="text-gray-500">
                Total Leads
              </h3>

              <p className="text-4xl font-bold text-blue-600">
                {totalLeads}
              </p>

            </div>

            <div className="bg-white rounded-xl shadow p-6">

              <h3 className="text-gray-500">
                Overdue
              </h3>

              <p className="text-4xl font-bold text-red-500">
                {overdue}
              </p>

            </div>

            <div className="bg-white rounded-xl shadow p-6">

              <h3 className="text-gray-500">
                Demo Scheduled
              </h3>

              <p className="text-4xl font-bold text-yellow-500">
                {demoScheduled}
              </p>

            </div>

            <div className="bg-white rounded-xl shadow p-6">

              <h3 className="text-gray-500">
                Converted
              </h3>

              <p className="text-4xl font-bold text-green-600">
                {converted}
              </p>

            </div>

          </div>

        </main>

      </div>

    </div>
  );
};

export default Dashboard;