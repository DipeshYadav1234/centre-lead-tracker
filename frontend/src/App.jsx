import { Routes, Route } from "react-router-dom";

import Login from "./pages/Login";

import Dashboard from "./pages/admin/Dashboard";
import UserDashboard from "./pages/user/UserDashboard";
import Leads from "./pages/admin/Leads";
import Followups from "./pages/admin/Followups";

import NotFound from "./pages/NotFound";

function App() {
  return (
<Routes>
  <Route path="/" element={<Login />} />

  <Route path="/admin/dashboard" element={<Dashboard />} />
  <Route path="/user/dashboard" element={<UserDashboard />} />
  <Route path="/admin/leads" element={<Leads />} />
  <Route path="/admin/followups" element={<Followups />} />

  <Route path="*" element={<NotFound />} />
</Routes>
  );
}

export default App;