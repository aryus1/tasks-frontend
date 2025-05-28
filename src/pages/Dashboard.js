import { useState } from "react";
import { Link } from "react-router-dom";
import { IoIosList } from "react-icons/io";
import { MdOutlineSpaceDashboard } from "react-icons/md";
import Header from "./Header";
import Lists from "./Lists";

export default function Dashboard() {
    const [activeWorkspace, setActiveWorkspace] = useState("todo"); // "todo" ou "kanban"

    return (
        <div className="h-screen flex flex-col">
            <div className="flex flex-1 pt-16">
            <Header />
                <aside className="px-4 flex flex-col gap-4 bg-stone-950 border-r border-stone-800 w-72">
                    <Lists />
                </aside>
                <main className="px-6 pt-2 flex flex-col w-full bg-stone-900">
                    <div className="flex flex-col h-full">
                        <div className="flex justify-between items-center mb-6">
                            <h1 className="text-2xl font-bold text-white">Dashboard</h1>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                            <div className="bg-stone-800 rounded-lg p-6 border border-stone-700">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="w-10 h-10 rounded-full bg-[#D6F2B3] flex items-center justify-center">
                                        <IoIosList className="text-xl text-[#5B8C00]" />
                                    </div>
                                    <h2 className="text-xl font-bold text-white">Listas To-Do</h2>
                                </div>
                                <p className="text-gray-400 mb-6">
                                    Gerencie suas tarefas diárias, semanais e mensais com listas organizadas por categorias.
                                </p>
                                <Link
                                    to="/workspace-to-do"
                                    className="inline-block px-4 py-2 bg-[#90E528] hover:bg-[#7bc824] text-lime-950 font-medium rounded-lg"
                                >
                                    Acessar Listas
                                </Link>
                                <div className="mt-4">
                                    <span className="text-sm text-gray-400">Listas recentes: 2</span>
                                </div>
                            </div>
                            
                            <div className="bg-stone-800 rounded-lg p-6 border border-stone-700">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center">
                                        <MdOutlineSpaceDashboard className="text-xl text-gray-400" />
                                    </div>
                                    <h2 className="text-xl font-bold text-white">Quadros Kanban</h2>
                                </div>
                                <p className="text-gray-400 mb-6">
                                    Visualize o fluxo das suas tarefas com quadros Kanban personalizáveis e arraste tarefas entre colunas.
                                </p>
                                <button
                                    className="inline-block px-4 py-2 bg-stone-700 text-gray-300 font-medium rounded-lg cursor-not-allowed"
                                    disabled
                                >
                                    Em breve
                                </button>
                                <div className="mt-4">
                                    <span className="text-sm text-gray-400">Disponível na próxima versão</span>
                                </div>
                            </div>
                        </div>
                        
                        <div className="bg-stone-800 rounded-lg p-6 border border-stone-700">
                            <h2 className="text-xl font-bold text-white mb-4">Estatísticas</h2>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div className="bg-stone-700 rounded-lg p-4">
                                    <h3 className="text-sm text-gray-400 mb-1">Total de Listas</h3>
                                    <p className="text-2xl font-bold text-white">2</p>
                                </div>
                                <div className="bg-stone-700 rounded-lg p-4">
                                    <h3 className="text-sm text-gray-400 mb-1">Tarefas Pendentes</h3>
                                    <p className="text-2xl font-bold text-white">5</p>
                                </div>
                                <div className="bg-stone-700 rounded-lg p-4">
                                    <h3 className="text-sm text-gray-400 mb-1">Tarefas Concluídas</h3>
                                    <p className="text-2xl font-bold text-white">8</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}