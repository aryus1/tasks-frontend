import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import VerifyCodeLogin from "./pages/VerifyCodeLogin";
import VerifyCodeRegister from "./pages/VerifyCodeRegister";
import SetUsername from "./pages/SetUsername";
import WorkspaceToDo from "./pages/WorkspaceToDo";
import KanBan from "./pages/KanBan"; 

export default function Rotas() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/auth/verify-code" element={<VerifyCodeLogin />} />
          <Route path="/auth/verify-code-register" element={<VerifyCodeRegister />} />
          <Route path="/set-username" element={<SetUsername />} />
          <Route path="/workspace-to-do" element={<WorkspaceToDo />} />
          <Route path="/kanban" element={<KanBan />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}