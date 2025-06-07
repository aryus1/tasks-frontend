import { useEffect, useState } from "react";
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

  const fetchLists = async () => {
    try {
      const [workspacesRes, flowsRes] = await Promise.all([
        api.get('api/workspace-todo'),
        api.get('api/flow-todo'),
      ]);
      const flows = flowsRes.data;

      // Para cada flow, busque as tarefas
      const listsWithTasks = await Promise.all(
        workspacesRes.data.map(async (list) => {
          const flow = flows.find(f => f.workspace_id === list.id);
          let tasks = [];
          if (flow) {
            // Supondo que você tenha esse endpoint:
            const tasksRes = await api.get(`api/tasks-todo?flow_id=${flow.id}`);
            tasks = tasksRes.data;
          }
          return {
            ...list,
            tasks,
            flow_id: flow ? flow.id : null,
          };
        })
      );

      setLists(listsWithTasks);
    } catch (error) {
      console.error("Erro ao buscar as listas", error);
    }
  };

  useEffect(() => {
    fetchLists()
  }, [])

  const handleCreateList = async (newList) => {
    try {
      const workspaceRes = await api.post("api/workspace-todo", newList);
      const workspace = workspaceRes.data;
      // Cria o flow relacionado
      const flowRes = await api.post("api/flow-todo", {
        workspace_id: workspace.id,
        title: workspace.name
      });
      const flow = flowRes.data;
      const createdList = { ...workspace, tasks: [], flow_id: flow.id };
      setLists([...lists, createdList]);
    } catch (error) {
      console.error("Erro ao criar a lista To-Do", error);
      alert("Erro ao criar a lista. Tente novamente mais tarde!");
    }
  };

  const handleAddTask = async (list, newTask) => {
    try {
      await api.post('api/tasks-todo', {
        ...newTask,
        flow_id: list.flow_id
      });
      await fetchLists(); // <-- Atualiza as listas e tarefas do backend
    } catch (error) {
      if (error.response) {
        console.error("Erro de validação da API:", error.response.data);
        alert(`Erro ao adicionar tarefa: ${JSON.stringify(error.response.data)}`);
      } else {
        console.error("Erro desconhecido:", error);
        alert("Erro ao adicionar a tarefa, tente novamente mais tarde!");
      }
    }
  };


  const handleDeleteList = async (listId) => {
    try {
      await api.delete(`api/workspace-todo/${listId}`)
      setLists(lists.filter((list) => list.id !== listId))
      if (activeList === listId) {
        setActiveList(null)
      }
    } catch (error) {
      console.error("Erro ao deletar lista:", error)
      alert("Erro ao deletar a lista. Tente novamente mais tarde!")
    }
  };

  const handleDeleteTask = async (listId, taskId) => {
    try {
      await api.delete(`api/tasks-todo/${taskId}`)
      setLists(
        lists.map((list) =>
          list.id === listId
            ? {
              ...list,
              tasks: list.tasks.filter((task) => task.id !== taskId),
            }
            : list
        )
      )
    } catch (error) {
      console.error("Erro ao deletar tarefa:", error)
      alert("Erro ao deletar tarefa. Tente novamente mais tarde!")
    }
  };

  const handleUpdateTask = async (list, updatedTask) => {
    try {
      await api.put(`api/tasks-todo/${updatedTask.id}`, updatedTask);
      await fetchLists();
    } catch (error) {
      alert("Erro ao atualizar a tarefa.");
      console.error(error);
    }
  };

  const workspaceContent = (
    <div className="flex flex-col h-full">
      <Header />
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-white">Minhas Listas</h1>
        <Link
          to="/dashboard"
          className="px-4 py-2 bg-stone-800 text-white rounded-lg hover:bg-stone-700"
        >
          Voltar para Dashboard
        </Link>
      </div>

      {/* Lista vazia */}
      {lists.length === 0 && (
        <div className="flex flex-col items-center justify-center flex-grow">
          <p className="text-gray-400 mb-4">Você ainda não tem listas criadas</p>
          <CreateList onCreateList={handleCreateList} />
        </div>
      )}

      {/* Lista com itens */}
      {lists.length > 0 && (
        <div className="flex gap-4 h-full">
          <div className="w-1/3 overflow-auto pr-4">
            <div className="mb-4">
              <CreateList onCreateList={handleCreateList} />
            </div>
            <div className="space-y-2">
              {lists.map((list) => (
                <div
                  key={list.id}
                  className={`p-4 rounded-lg cursor-pointer border ${activeList === list.id ? "bg-stone-800 border-[#90E528]" : "bg-stone-800 border-stone-700"
                    }`}
                  onClick={() => setActiveList(list.id)}
                >
                  <div className="flex justify-between items-center">
                    <h3 className="font-medium text-white">{list.name}</h3>
                    <span className="text-sm text-gray-400">
                      {(list.tasks?.length) ?? 0} tarefas
                    </span>
                  </div>
                  <div className="flex gap-2 mt-2">
                    {list.category && (
                      <span className="bg-lime-500/70 text-lime-950 px-2 py-1 text-xs font-medium rounded-xl">
                        {list.category}
                      </span>
                    )}
                    <button
                      className="text-red-500 hover:text-red-400"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteList(list.id);
                      }}
                    >
                      <GoTrash />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="w-2/3 bg-stone-800 rounded-lg p-6">
            {activeList !== null ? (
              <ToDoList
                list={lists.find(list => list.id === activeList)}
                onAddTask={handleAddTask}
                onDeleteTask={handleDeleteTask}
                onUpdateTask={handleUpdateTask}
              />
            ) : (
              <div className="flex flex-col items-center justify-center h-full">
                <p className="text-gray-400">Selecione uma lista para visualizar as tarefas</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );

  // Quando usado como página completa (rota /workspace-to-do)
  return (
    <div className="h-screen flex flex-col">
      <Header />
      <div className="flex flex-1">
        <aside className="px-4 pt-20 flex flex-col gap-4 bg-stone-950 border-r border-stone-800 w-72">
          <Lists />
        </aside>
        <main className="px-6 pt-20 flex flex-col w-full bg-stone-900">
          {workspaceContent}
        </main>
      </div>
    </div>
  );
}