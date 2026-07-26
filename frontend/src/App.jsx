import { Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Leads from "./pages/Leads";
import Followups from "./pages/Followups";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />

      <Route path="/dashboard" element={<Dashboard />} />

      <Route path="/leads" element={<Leads />} />

      <Route path="/followups" element={<Followups />} />

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;