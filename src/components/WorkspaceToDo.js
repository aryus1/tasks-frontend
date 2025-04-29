export default function ToDoContent() {
    return (
        <div className="p-4 flex flex-col gap-6">
            <div className="bg-[#EAF7D5] p-4 rounded-xl text-gray-600">
                <p>
                    To Do é como um bloco de notas para suas tarefas.
                    Crie listas para adicionar, editar e marcar suas tarefas como concluídas.
                    Crie sua primeira lista!
                </p>
            </div>

            <div className="flex gap-4 items-center">
                <button className="border border-[#90E528] text-[#90E528] px-4 py-2 rounded-xl">Filtrar</button>
                <button className="border border-[#90E528] text-[#90E528] px-4 py-2 rounded-xl">Criação ⬆</button>
                <button className="border border-[#90E528] text-[#90E528] px-4 py-2 rounded-xl">Recorrência</button>
                <span className="bg-[#D6F2B3] text-[#5B8C00] px-3 py-1 rounded-xl">Quinzenal</span>
            </div>

            <div className="flex flex-col gap-4">
                <div className="bg-[#FFE7C4] p-4 rounded-xl">
                    <h3 className="flex items-center gap-2 text-orange-700 font-semibold">
                        📝 Coisas de casa
                    </h3>
                    <ul className="mt-2 space-y-2">
                        <li className="flex items-center gap-2 text-sm">
                            <input type="checkbox" defaultChecked />
                            <span className="line-through">Arrumar casa</span>
                        </li>
                        <li className="flex items-center gap-2 text-sm">
                            <input type="checkbox" />
                            Tirar lixo pra fora
                        </li>
                        <li className="flex items-center gap-2 text-sm">
                            <input type="checkbox" />
                            Preparar marmitas da semana
                        </li>
                        <li className="flex items-center gap-2 text-sm">
                            <input type="checkbox" />
                            Comprar pilhas pro controle da TV
                        </li>
                    </ul>
                </div>

                <div className="bg-[#F7D6D9] p-4 rounded-xl">
                    <h3 className="flex items-center gap-2 text-red-700 font-semibold">
                        📝 Lista de compras
                    </h3>
                </div>
            </div>

            <button className="bg-[#90E528] hover:bg-[#7cc91f] text-white px-6 py-3 rounded-xl mt-6">
                Criar nova lista
            </button>
        </div>
    );
}
