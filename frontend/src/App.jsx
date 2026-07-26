import { Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import EditLead from "./pages/admin/EditLead";

import Dashboard from "./pages/admin/Dashboard";
import UserDashboard from "./pages/user/UserDashboard";
import Leads from "./pages/admin/Leads";
import Followups from "./pages/admin/Followups";
import ViewLead from "./pages/admin/ViewLead";
import ArchivedLeads from "./pages/admin/ArchivedLeads";

import NotFound from "./pages/NotFound";

function App() {
  return (
<Routes>
  <Route path="/" element={<Login />} />

  <Route path="/admin/dashboard" element={<Dashboard />} />
  <Route path="/user/dashboard" element={<UserDashboard />} />
  <Route path="/admin/leads" element={<Leads />} />
  <Route path="/admin/followups" element={<Followups />} />
  <Route path="/admin/leads/edit/:id" element={<EditLead />} />
  <Route path="/admin/leads/view/:id" element={<ViewLead />} />
  <Route path="/admin/archived-leads"element={<ArchivedLeads />}/>

  <Route path="*" element={<NotFound />} />
</Routes>
  );
}

export default App;