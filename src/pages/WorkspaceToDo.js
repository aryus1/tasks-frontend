import { useState } from "react";
import { Link } from "react-router-dom";
import CreateList from "./CreateList";
import ToDoList from "./ToDoList";
import Header from "./Header";
import Lists from "./Lists";
import { GoTrash } from "react-icons/go";

export default function WorkspaceToDo() {
  const [lists, setLists] = useState([]);
  const [activeList, setActiveList] = useState(null);

  const handleCreateList = (newList) => {
    const listWithTasks = { ...newList, tasks: [] };
    setLists([...lists, listWithTasks]);
  };

  const handleAddTask = (listId, newTask) => {
    setLists(
      lists.map((list) => {
        if (list.id === listId) {
          return {
            ...list,
            tasks: [...list.tasks, newTask],
          };
        }
        return list;
      })
    );
  };

  const handleDeleteList = (listId) => {
    setLists(lists.filter((list) => list.id !== listId));
    if (activeList === listId) {
      setActiveList(null);
    }
  };

  const handleDeleteTask = (listId, taskId) => {
    setLists(
      lists.map((list) => {
        if (list.id === listId) {
          return {
            ...list,
            tasks: list.tasks.filter((task) => task.id !== taskId),
          };
        }
        return list;
      })
    );
  };

  // Conteúdo principal do workspace
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
                  className={`p-4 rounded-lg cursor-pointer border ${
                    activeList === list.id ? "bg-stone-800 border-[#90E528]" : "bg-stone-800 border-stone-700"
                  }`}
                  onClick={() => setActiveList(list.id)}
                >
                  <div className="flex justify-between items-center">
                    <h3 className="font-medium text-white">{list.name}</h3>
                    <span className="text-sm text-gray-400">
                      {list.tasks.length} tarefas
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