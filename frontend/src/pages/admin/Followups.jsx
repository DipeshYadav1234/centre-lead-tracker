import React from "react";
import AdminLayout from "../../components/admin/AdminLayout";

const Followups = () => {
  return (
    <AdminLayout>

      <h2 className="text-3xl font-bold mb-6">
        Today's Follow-ups
      </h2>

      <div className="bg-white rounded-xl shadow p-6">

        <p className="text-gray-500">
          Follow-up list will appear here.
        </p>

      </div>

    </AdminLayout>
  );
};

export default Followups;