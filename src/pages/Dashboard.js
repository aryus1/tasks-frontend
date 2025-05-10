import { useState } from "react";
import Header from "../components/Header";
import Navbar from "../components/Navbar";
import WorkspaceKanban from "../components/WorkspaceKanban";
import WorkspaceToDo from "../components/WorkspaceToDo";

export default function Dashboard() {
    const [activeTab, setActiveTab] = useState("kanban");

    const handleTabChange = (tab) => {
        setActiveTab(tab);
    };

    return (
        <div>
            <Header />
            <Navbar onTabChange={handleTabChange} activeTab={activeTab} />
            <div className="p-4">
                {activeTab === "kanban" && <WorkspaceKanban />}
                {activeTab === "toDo" && <WorkspaceToDo />}
            </div>
        </div>
    );
}
