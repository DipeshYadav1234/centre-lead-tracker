import React from "react";

const Dashboard = () => {
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
                120
              </p>

            </div>

            <div className="bg-white rounded-xl shadow p-6">

              <h3 className="text-gray-500">
                Overdue
              </h3>

              <p className="text-4xl font-bold text-red-500">
                15
              </p>

            </div>

            <div className="bg-white rounded-xl shadow p-6">

              <h3 className="text-gray-500">
                Demo Scheduled
              </h3>

              <p className="text-4xl font-bold text-yellow-500">
                32
              </p>

            </div>

            <div className="bg-white rounded-xl shadow p-6">

              <h3 className="text-gray-500">
                Converted
              </h3>

              <p className="text-4xl font-bold text-green-600">
                41
              </p>

            </div>

          </div>

        </main>

      </div>

    </div>
  );
};

export default Dashboard;