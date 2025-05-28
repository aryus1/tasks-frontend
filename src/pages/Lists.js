import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { IoIosList } from "react-icons/io";
import { MdOutlineSpaceDashboard } from "react-icons/md";
import { AiOutlineHome } from "react-icons/ai";

export default function Lists() {
  const location = useLocation();
  
  // Determina qual aba está ativa com base na URL atual
  const isActiveDashboard = location.pathname === "/dashboard";
  const isActiveToDo = location.pathname === "/workspace-to-do";

  return (
    <div className="flex flex-col py-2 h-full">
      <div className="mb-6">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-medium text-white mb-4">Navegação</h2>
        </div>
        <div className="flex flex-col gap-2">
          <Link
            to="/dashboard"
            className={`flex items-center gap-2 px-4 py-2 rounded-lg ${
              isActiveDashboard
                ? "bg-[#90E528] text-lime-950 font-medium"
                : "bg-stone-800 text-gray-400 hover:bg-stone-700"
            }`}
          >
            <AiOutlineHome />
            <span>Área de tarefas</span>
          </Link>
          
          <Link
            to="/workspace-to-do"
            className={`flex items-center gap-2 px-4 py-2 rounded-lg ${
              isActiveToDo
                ? "bg-[#90E528] text-lime-950 font-semibold"
                : "bg-stone-800 text-gray-400 hover:bg-stone-700"
            }`}
          >
            <IoIosList />
            <span>To-Do</span>
          </Link>
          
          <button
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-stone-800 text-gray-400 opacity-70 cursor-not-allowed"
            disabled
          >
            <Link
            to="/KanBan"
            className={`flex items-center gap-2 px-4 py-2 rounded-lg ${
              isActiveToDo
                ? "bg-[#90E528] text-lime-950 font-semibold"
                : "bg-stone-800 text-gray-400 hover:bg-stone-700"
            }`}
          >
            <MdOutlineSpaceDashboard />
            <span>Kanban</span>
            </Link>
          </button>
        </div>
      </div>
      
    
      
      <div className="mt-auto">
        <div className="bg-stone-800/20 rounded-lg p-4">
          <h3 className="font-medium text-white mb-2">Dica</h3>
          <p className="text-sm text-gray-400">
            Organize suas tarefas criando listas e quadros para diferentes contextos. 
            Use cores para definir a importância das tarefas.
          </p>
        </div>
      </div>
    </div>
  );
}