import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import PageVerifyCode from "./pages/PageVerifyCode";
import WorkspaceToDo from "./components/WorkspaceToDo";

export default function Rotas() {
    return (
        <div>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/auth/verify-code" element={<PageVerifyCode />} />
                    <Route path="/workspace-to-do" element={<WorkspaceToDo />} />
                </Routes>
            </BrowserRouter>
        </div>
    )
}