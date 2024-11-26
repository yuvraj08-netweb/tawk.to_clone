import { Navigate, Route, Routes } from "react-router-dom";
import PublicLayout from "./layouts/PublicLayout";
import Signup from "./pages/Signup";
import "./index.css";
import PrivateLayout from "./layouts/PrivateLayout";
import Dashboard from "./pages/Dashboard";
import { Toaster } from "sonner";

function App() {
  return (
    <>
    <Toaster richColors/>
      <Routes>
        <Route path="/" element={<Navigate to="/signup" />} />
        <Route element={<PublicLayout />}>
          <Route path="/signup" element={<Signup />} />
        </Route>
        <Route element={<PrivateLayout/>}>
          <Route path="/dashboard" element={<Dashboard/>} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
