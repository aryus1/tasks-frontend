import { useState } from "react";
import { IoIosAddCircleOutline, IoIosArrowUp, IoIosArrowDown } from "react-icons/io";
import { IoCloseCircleOutline } from "react-icons/io5";

export default function CreateList({ list, onCreateList }) {
  const [isCreating, setIsCreating] = useState(false);
  const [listName, setListName] = useState("");
  const [category, setCategory] = useState("");
  
  const categoryOptions = ["Diário", "Semanal", "Quinzenal", "Mensal", "Projeto"];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (listName.trim()) {
      onCreateList({
        name: listName,
        category: category,
      });
      setListName("");
      setCategory("");
      setIsCreating(false);
    }
  };

  if (!isCreating) {
    return (
      <button
        onClick={() => setIsCreating(true)}
        className="w-80 flex items-center justify-center gap-2 py-3 bg-[#90E528] hover:bg-[#7bc824] text-lime-950 font-medium rounded-lg transition-all"
      >
        <IoIosAddCircleOutline className="text-xl" />
        <span>Nova Lista</span>
      </button>
    );
  }

  return (
    <div className="bg-stone-800 rounded-lg p-4 border border-stone-700">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-medium text-white">Nova Lista</h3>
        <button
          onClick={() => setIsCreating(false)}
          className="text-gray-400 hover:text-white"
        >
          <IoCloseCircleOutline className="text-xl" />
        </button>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block w-96 text-sm text-gray-400 mb-1">Nome da Lista</label>
          <input
            type="text"
            value={listName}
            onChange={(e) => setListName(e.target.value)}
            className="w-full bg-stone-700 text-white border border-stone-600 rounded-lg p-2 focus:outline-none focus:border-[#90E528]"
            placeholder="Digite o nome da lista"
            autoFocus
          />
        </div>

        <div className="mb-6">
          <label className="block text-sm text-gray-400 mb-1">Recorrência</label>
          <div className="grid grid-cols-2 gap-2">
            {categoryOptions.map((option) => (
              <div 
                key={option}
                onClick={() => setCategory(option)}
                className={`px-3 py-2 rounded-lg cursor-pointer text-center active:font-bold transition-all ${
                  category === option 
                    ? "bg-lime-300/50 text-lime-950 font-semibold" 
                    : "bg-stone-700 text-gray-300 hover:bg-stone-600"
                }`}
              >
                {option}
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="button"
            onClick={() => setIsCreating(false)}
            className="px-4 py-2 text-gray-300 hover:text-white mr-2"
          >
            Cancelar
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-[#90E528] hover:bg-[#7bc824] text-lime-950 font-medium rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={!listName.trim()}
          >
            Criar Lista
          </button>
        </div>
      </form>
    </div>
  );
}