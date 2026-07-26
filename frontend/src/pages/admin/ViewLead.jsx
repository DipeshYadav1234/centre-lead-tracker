
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AdminLayout from "../../components/admin/AdminLayout";
import { getLead } from "../../services/leadService";

const ViewLead = () => {
  const { id } = useParams();

  const [lead, setLead] = useState({});

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

  return (
    <AdminLayout>
      <h2 className="text-3xl font-bold mb-8">
        Lead Details
      </h2>

      <div className="bg-white rounded-xl shadow p-8">

        <div className="grid grid-cols-2 gap-6">

          <div>
            <h4 className="font-semibold">Parent Name</h4>
            <p>{lead.parent_name}</p>
          </div>

          <div>
            <h4 className="font-semibold">Child Name</h4>
            <p>{lead.child_name}</p>
          </div>

          <div>
            <h4 className="font-semibold">Child Age</h4>
            <p>{lead.child_age}</p>
          </div>

          <div>
            <h4 className="font-semibold">Phone</h4>
            <p>{lead.phone}</p>
          </div>

          <div>
            <h4 className="font-semibold">Email</h4>
            <p>{lead.email}</p>
          </div>

          <div>
            <h4 className="font-semibold">Preferred Centre</h4>
            <p>{lead.preferred_centre}</p>
          </div>

          <div>
            <h4 className="font-semibold">Source</h4>
            <p>{lead.source}</p>
          </div>

          <div>
            <h4 className="font-semibold">Status</h4>
            <p>{lead.status}</p>
          </div>

          <div>
            <h4 className="font-semibold">Assigned Owner</h4>
            <p>{lead.assigned_owner_name}</p>
          </div>

          <div>
            <h4 className="font-semibold">Next Follow-up</h4>
            <p>{lead.next_followup}</p>
          </div>

          <div className="col-span-2">
            <h4 className="font-semibold">Notes</h4>
            <p>{lead.notes}</p>
          </div>

        </div>

      </div>
    </AdminLayout>
  );
};

export default ViewLead;