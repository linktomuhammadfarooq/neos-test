import { Route, Routes } from "react-router";
import Layout from "./components/layout/Layout";
import Classifications from "./pages/Classifications";
import Dashboard from "./pages/Dashboard";
import Data from "./pages/Data";
import Reports from "./pages/Reports";
import Territories from "./pages/Territories";
function App() {
  return (
    <Routes>
      <Route>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="territories" element={<Territories />} />
          <Route path="classifications" element={<Classifications />} />
          <Route path="data" element={<Data />} />
          <Route path="reports" element={<Reports />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
