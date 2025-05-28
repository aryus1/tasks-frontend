import { useState } from "react";
import { GoTrash } from "react-icons/go";
import { IoIosAddCircleOutline } from "react-icons/io";

export default function ToDoList({ list, onAddTask, onDeleteTask }) {
  const [taskName, setTaskName] = useState("");
  const [priority, setPriority] = useState("normal");
  const [isAdding, setIsAdding] = useState(false);

  if (!list) return null;

  const handleAddTask = () => {
    if (taskName.trim()) {
      onAddTask(list.id, {
        id: Date.now().toString(),
        name: taskName,
        priority,
        completed: false,
        createdAt: new Date(),
      });
      setTaskName("");
      setPriority("normal");
      setIsAdding(false);
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "low":
        return "bg-blue-100 text-blue-800";
      case "normal":
        return "bg-gray-100 text-gray-800";
      case "high":
        return "bg-orange-100 text-orange-800";
      case "urgent":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getPriorityLabel = (priority) => {
    switch (priority) {
      case "low":
        return "Baixa";
      case "normal":
        return "Normal";
      case "high":
        return "Alta";
      case "urgent":
        return "Urgente";
      default:
        return "Normal";
    }
  };

  return (
    <div className="h-full flex flex-col">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-xl font-bold text-white">{list.name}</h2>
          {list.category && (
            <span className="bg-lime-300/50 text-lime-950 px-3 py-1 text-xs rounded-xl inline-block mt-1">
              {list.category}
            </span>
          )}
        </div>
        
        {!isAdding && (
          <button
            onClick={() => setIsAdding(true)}
            className="flex items-center gap-2 px-4 py-2 bg-[#90E528] hover:bg-[#7bc824] text-lime-950 font-medium rounded-lg"
          >
            <IoIosAddCircleOutline className="text-xl" />
            <span>Nova Tarefa</span>
          </button>
        )}
      </div>

      {isAdding && (
        <div className="bg-stone-700 rounded-lg p-4 mb-6">
          <h3 className="font-medium text-white mb-4">Nova Tarefa</h3>
          <div className="mb-4">
            <label className="block text-sm text-gray-400 mb-1">Nome da Tarefa</label>
            <input
              type="text"
              value={taskName}
              onChange={(e) => setTaskName(e.target.value)}
              className="w-full bg-stone-600 text-white border border-stone-500 rounded-lg p-2 focus:outline-none focus:border-[#90E528]"
              placeholder="Digite o nome da tarefa"
              autoFocus
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm text-gray-400 mb-1">Prioridade</label>
            <div className="grid grid-cols-4 gap-2">
              {["low", "normal", "high", "urgent"].map((option) => (
                <div 
                  key={option}
                  onClick={() => setPriority(option)}
                  className={`px-3 py-2 rounded-lg cursor-pointer text-center transition-all ${
                    priority === option 
                      ? `${getPriorityColor(option)} font-medium` 
                      : "bg-stone-600 text-gray-300 hover:bg-stone-500"
                  }`}
                >
                  {getPriorityLabel(option)}
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-end">
            <button
              type="button"
              onClick={() => setIsAdding(false)}
              className="px-4 py-2 text-gray-300 hover:text-white mr-2"
            >
              Cancelar
            </button>
            <button
              onClick={handleAddTask}
              className="px-4 py-2 bg-[#90E528] hover:bg-[#7bc824] text-lime-950 font-medium rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={!taskName.trim()}
            >
              Adicionar
            </button>
          </div>
        </div>
      )}

      <div className="flex-grow overflow-auto">
        {list.tasks.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full">
            <p className="text-gray-400">Você ainda não tem tarefas nesta lista</p>
            
          </div>
        ) : (
          <div className="space-y-2">
            {list.tasks.map((task) => (
              <div 
                key={task.id}
                className="flex items-center justify-between p-4 bg-stone-900 rounded-lg"
              >
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={() => {
                      onAddTask(list.id, { ...task, completed: !task.completed });
                    }}
                    className="h-5 w-5 rounded border-gray-500 text-[#90E528] focus:ring-[#90E528]"
                  />
                  <span className={`${task.completed ? "line-through text-gray-400" : "text-white"}`}>
                    {task.name}
                  </span>
                  <span className={`px-2 py-1 text-xs rounded-full ${getPriorityColor(task.priority)}`}>
                    {getPriorityLabel(task.priority)}
                  </span>
                </div>
                <button
                  onClick={() => onDeleteTask(list.id, task.id)}
                  className="text-red-500 hover:text-red-400"
                >
                  <GoTrash />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}