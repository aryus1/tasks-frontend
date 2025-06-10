import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { IoIosList } from "react-icons/io";
import { MdOutlineSpaceDashboard } from "react-icons/md";
import Header from "./Header";
import Lists from "./Lists";
import api from "../services/axios";

export default function Dashboard() {
    const [activeWorkspace, setActiveWorkspace] = useState("todo");
    const [countWorkspaces, setCountWorkspaces] = useState(0);
    const [pendingTasks, setPendingTasks] = useState(0);
    const [doneTasks, setDoneTasks] = useState(0);

    const fetchFlow = async () => {
        try {
            const response = await api.get("api/flow-todo")
            setCountWorkspaces(response.data.length);
        } catch (error) {
            console.error("Erro ao buscar quantidade de listas:", error);
        }
    }

    const fetchPendingTasks = async () => {
        try {
            const response = await api.get("api/tasks-todo")
            const pendentes = response.data.filter(task => !task.completed);
            setPendingTasks(pendentes.length);
        } catch (error) {
            console.error("Erro ao buscar tarefas pendentes:", error);
        }
    }

    const fetchDoneTasks = async () => {
        try {
            const response = await api.get("api/tasks-todo")
            const concluidas = response.data.filter(task => task.completed);
            setDoneTasks(concluidas.length);
        } catch (error) {
            console.error("Erro ao buscar tarefas concluídas:", error);
        }
    }

    useEffect(() => {
        fetchFlow();
        fetchPendingTasks();
        fetchDoneTasks();
    }, [])

    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <div className="flex flex-col lg:flex-row pt-16 flex-grow">
                <aside className="px-4 py-4 flex flex-col gap-4 bg-stone-950 border-b lg:border-b-0 lg:border-r border-stone-800 w-full lg:w-72">
                    <Lists />
                </aside>
                <main className="px-6 pt-2 flex-1 flex flex-col bg-stone-900">
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
                                
                            </div>

                            

                        <div className="bg-stone-800 rounded-lg p-6 border border-stone-700">
                            <h2 className="text-xl font-bold text-white mb-4">Estatísticas</h2>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div className="bg-stone-700 rounded-lg p-4">
                                    <h3 className="text-sm text-gray-400 mb-1">Total de Listas</h3>
                                    <p className="text-2xl font-bold text-white">{countWorkspaces}</p>
                                </div>
                                <div className="bg-stone-700 rounded-lg p-4">
                                    <h3 className="text-sm text-gray-400 mb-1">Tarefas Pendentes</h3>
                                    <p className="text-2xl font-bold text-white">{pendingTasks}</p>
                                </div>
                                <div className="bg-stone-700 rounded-lg p-4">
                                    <h3 className="text-sm text-gray-400 mb-1">Tarefas Concluídas</h3>
                                    <p className="text-2xl font-bold text-white">{doneTasks}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                </main>
            </div>
        </div>
    );
}

