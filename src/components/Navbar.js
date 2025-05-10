import { MdOutlineViewKanban } from "react-icons/md";
import { IoIosList } from "react-icons/io";

export default function Navbar({ onTabChange, activeTab }) {
    return (
        <div className="flex gap-4 justify-center items-center p-6">
            <div
                onClick={() => onTabChange("kanban")}
                className={`flex gap-4 py-4 px-8 rounded-xl shadow-lg cursor-pointer transition-colors ${
                    activeTab === "kanban"
                        ? "bg-[#90E528]/30"
                        : "bg-white"
                }`}
            >
                <MdOutlineViewKanban className="text-2xl" />
                <h2>Kanban</h2>
            </div>

            <div
                onClick={() => onTabChange("toDo")}
                className={`flex gap-4 py-4 px-8 rounded-xl shadow-lg cursor-pointer transition-colors ${
                    activeTab === "toDo"
                        ? "bg-[#90E528]/30"
                        : "bg-white"
                }`}
            >
                <IoIosList className="text-2xl" />
                <h2>To Do</h2>
            </div>
        </div>
    );
}