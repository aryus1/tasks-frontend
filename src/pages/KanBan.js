import React, { useState } from "react";
import CreateList from "./CreateList";
import ToDoList from "./ToDoList";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { IoIosArrowUp, IoIosArrowDown } from "react-icons/io";

const initialLists = [
  {
    id: "todo",
    name: "A Fazer",
    category: "Projeto",
    createdAt: new Date(),
    tasks: [
      { id: "1", name: "Implementar Drag and Drop", priority: "high", completed: false, createdAt: new Date() },
      { id: "2", name: "Criar novos componentes", priority: "normal", completed: false, createdAt: new Date() },
    ],
  },
  {
    id: "inprogress",
    name: "Em Progresso",
    category: "Projeto",
    createdAt: new Date(),
    tasks: [
      { id: "3", name: "Estilizar a página Kanban", priority: "normal", completed: false, createdAt: new Date() },
    ],
  },
  {
    id: "done",
    name: "Concluído",
    category: "Projeto",
    createdAt: new Date(),
    tasks: [
      { id: "4", name: "Configurar o React", priority: "low", completed: true, createdAt: new Date() },
    ],
  },
];

export default function KanBan() {
  const [lists, setLists] = useState(initialLists);

  const handleCreateList = (newList) => {
    setLists([...lists, { ...newList, tasks: [] }]);
  };

  const handleAddTask = (listId, newTask) => {
    setLists(
      lists.map((list) =>
        list.id === listId ? { ...list, tasks: [...list.tasks, newTask] } : list
      )
    );
  };

  const handleDeleteTask = (listId, taskId) => {
    setLists(
      lists.map((list) =>
        list.id === listId
          ? { ...list, tasks: list.tasks.filter((task) => task.id !== taskId) }
          : list
      )
    );
  };

  const onDragEnd = (result) => {
    const { destination, source, draggableId } = result;

    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    const startList = lists.find((list) => list.id === source.droppableId);
    const finishList = lists.find((list) => list.id === destination.droppableId);
    const draggableTask = startList.tasks.find((task) => task.id === draggableId);

    // Moving within the same list
    if (startList === finishList) {
      const newTasks = Array.from(startList.tasks);
      newTasks.splice(source.index, 1);
      newTasks.splice(destination.index, 0, draggableTask);

      const newList = {
        ...startList,
        tasks: newTasks,
      };

      setLists(
        lists.map((list) => (list.id === newList.id ? newList : list))
      );
      return;
    }

    // Moving between lists
    const startTasks = Array.from(startList.tasks);
    startTasks.splice(source.index, 1);
    const newStartList = {
      ...startList,
      tasks: startTasks,
    };

    const finishTasks = Array.from(finishList.tasks);
    finishTasks.splice(destination.index, 0, draggableTask);
    const newFinishList = {
      ...finishList,
      tasks: finishTasks,
    };

    setLists(
      lists.map((list) => {
        if (list.id === newStartList.id) {
          return newStartList;
        }
        if (list.id === newFinishList.id) {
          return newFinishList;
        }
        return list;
      })
    );
  };

  return (
    
    <div className="bg-stone-900 min-h-screen p-6">
      <h1 className="text-3xl font-bold text-white mb-8">Meu Kanban</h1>
      <div className="mb-8">
        <CreateList onCreateList={handleCreateList} />
      </div>



      <DragDropContext onDragEnd={onDragEnd}>
        <div className="flex gap-4 overflow-x-auto">
          {lists.map((list) => (
            <Droppable key={list.id} droppableId={list.id}>
              {(provided, snapshot) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className={`w-80 rounded-lg p-4 bg-stone-800 shadow-md flex flex-col ${
                    snapshot.isDraggingOver ? "bg-stone-700" : ""
                  }`}
                >
                  <ToDoList
                    list={list}
                    onAddTask={handleAddTask}
                    onDeleteTask={handleDeleteTask}
                  />
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          ))}
        </div>
      </DragDropContext>
    </div>
  );
}