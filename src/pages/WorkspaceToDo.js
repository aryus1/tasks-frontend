import { useEffect, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import CreateList from "./CreateList";
import ToDoList from "./ToDoList";
import Header from "./Header";
import Lists from "./Lists";
import { GoTrash } from "react-icons/go";
import api from "../services/axios";

export default function WorkspaceToDo() {
  const [lists, setLists] = useState([]);
  const [activeList, setActiveList] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Função para buscar listas com memoização
  const fetchLists = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);

      const [workspacesRes, flowsRes] = await Promise.all([
        api.get('api/workspace-todo'),
        api.get('api/flow-todo'),
      ]);

      const workspaces = workspacesRes.data || [];
      const flows = flowsRes.data || [];

      // Para cada workspace, busque as tarefas relacionadas
      const listsWithTasks = await Promise.all(
        workspaces.map(async (workspace) => {
          try {
            const flow = flows.find(f => f.workspace_id === workspace.id);
            let tasks = [];
            
            if (flow?.id) {
              const tasksRes = await api.get(`api/tasks-todo?flow_id=${flow.id}`);
              tasks = tasksRes.data || [];
            }
            
            return {
              ...workspace,
              tasks,
              flow_id: flow?.id || null,
            };
          } catch (taskError) {
            console.error(`Erro ao buscar tarefas para workspace ${workspace.id}:`, taskError);
            return {
              ...workspace,
              tasks: [],
              flow_id: null,
            };
          }
        })
      );

      setLists(listsWithTasks);
    } catch (error) {
      console.error("Erro ao buscar as listas:", error);
      setError("Erro ao carregar as listas. Tente novamente.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchLists();
  }, [fetchLists]);

  // Criar nova lista
  const handleCreateList = async (newList) => {
    try {
      if (!newList?.name?.trim()) {
        alert("Nome da lista é obrigatório!");
        return;
      }

      const workspaceRes = await api.post("api/workspace-todo", newList);
      const workspace = workspaceRes.data;
      
      // Criar o flow relacionado
      const flowRes = await api.post("api/flow-todo", {
        workspace_id: workspace.id,
        title: workspace.name
      });
      
      const flow = flowRes.data;
      const createdList = { 
        ...workspace, 
        tasks: [], 
        flow_id: flow.id 
      };
      
      setLists(prevLists => [...prevLists, createdList]);
    } catch (error) {
      console.error("Erro ao criar a lista:", error);
      const errorMessage = error.response?.data?.message || "Erro ao criar a lista. Tente novamente!";
      alert(errorMessage);
    }
  };

  // Adicionar tarefa
  const handleAddTask = async (list, newTask) => {
    try {
      if (!newTask?.title?.trim()) {
        alert("Título da tarefa é obrigatório!");
        return;
      }

      if (!list?.flow_id) {
        alert("Lista não possui um flow válido!");
        return;
      }

      await api.post('api/tasks-todo', {
        ...newTask,
        flow_id: list.flow_id
      });
      
      // Atualizar apenas a lista específica para melhor performance
      await fetchLists();
    } catch (error) {
      console.error("Erro ao adicionar tarefa:", error);
      const errorMessage = error.response?.data?.message || 
                          JSON.stringify(error.response?.data) || 
                          "Erro ao adicionar a tarefa. Tente novamente!";
      alert(`Erro ao adicionar tarefa: ${errorMessage}`);
    }
  };

  // Deletar lista
  const handleDeleteList = async (listId) => {
    if (!window.confirm("Tem certeza que deseja deletar esta lista e todas as suas tarefas?")) {
      return;
    }

    try {
      await api.delete(`api/workspace-todo/${listId}`);
      setLists(prevLists => prevLists.filter(list => list.id !== listId));
      
      if (activeList === listId) {
        setActiveList(null);
      }
    } catch (error) {
      console.error("Erro ao deletar lista:", error);
      alert("Erro ao deletar a lista. Tente novamente!");
    }
  };

  // Deletar tarefa
  const handleDeleteTask = async (listId, taskId) => {
    if (!window.confirm("Tem certeza que deseja deletar esta tarefa?")) {
      return;
    }

    try {
      await api.delete(`api/tasks-todo/${taskId}`);
      setLists(prevLists =>
        prevLists.map(list =>
          list.id === listId
            ? {
                ...list,
                tasks: list.tasks.filter(task => task.id !== taskId),
              }
            : list
        )
      );
    } catch (error) {
      console.error("Erro ao deletar tarefa:", error);
      alert("Erro ao deletar tarefa. Tente novamente!");
    }
  };

  // Atualizar tarefa
  const handleUpdateTask = async (list, updatedTask) => {
    try {
      if (!updatedTask?.id) {
        alert("ID da tarefa é obrigatório para atualização!");
        return;
      }

      await api.put(`api/tasks-todo/${updatedTask.id}`, updatedTask);
      await fetchLists();
    } catch (error) {
      console.error("Erro ao atualizar tarefa:", error);
      alert("Erro ao atualizar a tarefa. Tente novamente!");
    }
  };

  // Estado de loading
  if (isLoading) {
    return (
      <div className="h-screen flex flex-col">
        <Header />
        <div className="flex flex-1">
          <aside className="hidden lg:block px-4 pt-20 flex flex-col gap-4 bg-stone-950 border-r border-stone-800 w-72">
            <Lists />
          </aside>
          <main className="px-4 lg:px-6 pt-20 flex flex-col w-full bg-stone-900">
            <div className="flex items-center justify-center h-full">
              <div className="text-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-lime-500 mx-auto mb-4"></div>
                <p className="text-gray-400">Carregando listas...</p>
              </div>
            </div>
          </main>
        </div>
      </div>
    );
  }

  // Estado de erro
  if (error) {
    return (
      <div className="h-screen flex flex-col">
        <Header />
        <div className="flex flex-1">
          <aside className="hidden lg:block px-4 pt-20 flex flex-col gap-4 bg-stone-950 border-r border-stone-800 w-72">
            <Lists />
          </aside>
          <main className="px-4 lg:px-6 pt-20 flex flex-col w-full bg-stone-900">
            <div className="flex items-center justify-center h-full">
              <div className="text-center">
                <p className="text-red-400 mb-4">{error}</p>
                <button 
                  onClick={fetchLists}
                  className="px-4 py-2 bg-lime-600 text-white rounded-lg hover:bg-lime-700 transition-colors"
                >
                  Tentar Novamente
                </button>
              </div>
            </div>
          </main>
        </div>
      </div>
    );
  }

  // Conteúdo principal do workspace
  const workspaceContent = (
    <div className="flex flex-col h-full">
      {/* Header responsivo */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6 gap-4">
        <h1 className="text-xl sm:text-2xl font-bold text-white">Minhas Listas</h1>
        <Link
          to="/dashboard"
          className="px-4 py-2 bg-stone-800 text-white rounded-lg hover:bg-stone-700 transition-colors text-center"
        >
          Voltar para Dashboard
        </Link>
      </div>

      {/* Estado vazio */}
      {lists.length === 0 && (
        <div className="flex flex-col items-center justify-center flex-grow text-center px-4">
          <div className="max-w-md">
            <div className="w-16 h-16 mx-auto mb-4 bg-stone-800 rounded-full flex items-center justify-center">
              <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <p className="text-gray-400 mb-6 text-lg">Você ainda não tem listas criadas</p>
            <p className="text-gray-500 mb-6 text-sm">Crie sua primeira lista para começar a organizar suas tarefas</p>
            <CreateList onCreateList={handleCreateList} />
          </div>
        </div>
      )}

      {/* Layout com listas */}
      {lists.length > 0 && (
        <div className="flex flex-col lg:flex-row gap-4 h-full">
          {/* Sidebar das listas - responsiva */}
          <div className="w-full lg:w-1/3 lg:overflow-auto lg:pr-4">
            <div className="mb-4">
              <CreateList onCreateList={handleCreateList} />
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-2">
              {lists.map((list) => (
                <div
                  key={list.id}
                  className={`p-4 rounded-lg cursor-pointer border transition-all duration-200 ${
                    activeList === list.id 
                      ? "bg-stone-800 border-lime-500 shadow-lg" 
                      : "bg-stone-800 border-stone-700 hover:border-stone-600"
                  }`}
                  onClick={() => setActiveList(list.id)}
                >
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-medium text-white truncate pr-2 flex-1">
                      {list.name}
                    </h3>
                    <span className="text-sm text-gray-400 whitespace-nowrap">
                      {list.tasks?.length || 0} tarefas
                    </span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <div className="flex gap-2 flex-wrap">
                      {list.category && (
                        <span className="bg-lime-500/70 text-lime-950 px-2 py-1 text-xs font-medium rounded-xl">
                          {list.category}
                        </span>
                      )}
                    </div>
                    
                    <button
                      className="text-red-500 hover:text-red-400 p-1 rounded transition-colors"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteList(list.id);
                      }}
                      title="Deletar lista"
                    >
                      <GoTrash size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Área principal das tarefas */}
          <div className="w-full lg:w-2/3 bg-stone-800 rounded-lg p-4 sm:p-6 min-h-96">
            {activeList !== null ? (
              <ToDoList
                list={lists.find(list => list.id === activeList)}
                onAddTask={handleAddTask}
                onDeleteTask={handleDeleteTask}
                onUpdateTask={handleUpdateTask}
              />
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-center">
                <div className="w-12 h-12 mx-auto mb-4 bg-stone-700 rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                </div>
                <p className="text-gray-400 text-lg">Selecione uma lista</p>
                <p className="text-gray-500 text-sm mt-2">Escolha uma lista na lateral para visualizar e gerenciar suas tarefas</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );

  // Layout principal da página
  return (
    <div className="h-screen flex flex-col">
      <Header />
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar - oculta em telas pequenas */}
        <aside className="hidden lg:flex px-4 pt-20 flex-col gap-4 bg-stone-950 border-r border-stone-800 w-72">
          <Lists />
        </aside>
        
        {/* Conteúdo principal */}
        <main className="px-4 lg:px-6 pt-20 flex flex-col w-full bg-stone-900 overflow-auto">
          {workspaceContent}
        </main>
      </div>
    </div>
  );
}