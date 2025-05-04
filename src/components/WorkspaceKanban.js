import { useState } from "react";
import { FiLogIn } from "react-icons/fi";
import { GoTrash } from "react-icons/go";
import { IoIosAddCircleOutline, IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { IoCloseCircleOutline } from "react-icons/io5";
import { MdOutlineViewKanban } from "react-icons/md";

export default function WorkspaceKanban() {
    const [modalOpen, setModalOpen] = useState(false);

    const handleModalOpen = () => {
        setModalOpen(true);
    }
    
    return (
        <div className="p-4 md:p-8 lg:px-24 lg:py-12 flex flex-col gap-6">
            <div className="bg-[#EAF7D5] p-6 rounded-xl text-gray-600 text-sm md:text-base">
                <p>
                    Kan Ban é um quadro de etapas para suas tarefas.
                    Coloque suas tarefas em cartões e mova-os entre colunas
                    de etapas (como "A Fazer", "Fazendo", "Feito") conforme o progresso.
                    Crie seu primeiro quadro!
                </p>
            </div>

            <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
                <div className="flex justify-center gap-4 items-center">
                    <button className="border border-[#90E528] text-[#5B8C00] px-4 py-2 rounded-xl">Filtrar</button>
                    <div className="flex items-center text-[#5B8C00] gap-2">
                        <button className="text-[#5B8C00] px-2 py-2 rounded-xl">Criação</button>
                        <IoIosArrowUp />
                    </div>
                    <span className="text-[#5B8C00] px-3 py-1 rounded-xl">Categoria</span>
                    <span className="bg-[#D6F2B3] text-[#5B8C00] px-3 py-1 rounded-xl">Estudos</span>
                </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
                <div className="bg-[#D0E3FF] p-4 rounded-xl">
                    <div className="flex gap-4 items-center">
                        <div className="text-2xl bg-[#2865AA] text-white p-2 rounded-xl">
                            <MdOutlineViewKanban />
                        </div>
                        <h3 className="text-[#2865AA] font-semibold">Trabalhos faculdade</h3>
                        <div className="ml-auto text-[#2865AA] text-xl cursor-pointer">
                            <IoIosArrowDown />
                        </div>
                    </div>
                </div>

                <div className="bg-[#F7D6D9] p-4 rounded-xl">
                    <div className="flex gap-4 items-center">
                        <div className="text-2xl bg-[#AA2851] text-white p-2 rounded-xl">
                            <MdOutlineViewKanban />
                        </div>
                        <h3 className="text-[#AA2851] font-semibold">Cursos online</h3>
                        <div className="ml-auto text-[#AA2851] text-xl cursor-pointer">
                            <IoIosArrowDown />
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex justify-center items-center">
                <button onClick={handleModalOpen} className="flex items-center justify-center gap-4 bg-[#90E528] hover:bg-[#7cc91f] font-semibold px-6 py-4 rounded-xl border border-black border-b-4 mt-16">
                    <div className="text-2xl">
                        <IoIosAddCircleOutline />
                    </div>
                    Criar novo quadro
                </button>
            </div>

            {modalOpen && (
                <div className="fixed inset-0 flex items-center justify-center flex-col bg-black bg-opacity-50">

                    <div className="border-2 border-[#90E528] rounded-2xl">
                        <div className="flex gap-4 items-center justify-between bg-[#90E528] p-4 rounded-t-xl">
                            <h2 className="text-xl font-semibold">Seu novo quadro</h2>
                            <button onClick={() => setModalOpen(false)} className="text-2xl">
                                <IoCloseCircleOutline />
                            </button>
                        </div>
                        <div className="bg-white p-4 rounded-b-xl shadow-lg w-full max-w-md">
                            <form>
                                <div className="flex items-center gap-4">
                                    <p className="text-lg font-semibold">Título:</p>
                                    <input type="text" placeholder="Criar título" className="p-2 rounded" />
                                </div>

                                <div className="flex items-center gap-4">
                                    <p className="text-lg font-semibold">Data de vencimento:</p>
                                    <input type="text" placeholder="Nenhuma" className="p-2 rounded" />
                                </div>

                                <div className="flex items-center gap-6">
                                    <p className="text-lg font-semibold">Categoria:</p>
                                    <input type="text" placeholder="Criar categoria" className="p-2 rounded" />
                                </div>

                                <div className="flex items-center gap-6">
                                    <p className="text-lg font-semibold">Cor do quadro:</p>
                                    <div className="flex gap-4 mt-2">
                                        <div className="bg-[#74CF4A] w-8 h-8 rounded-full"></div>
                                        <div className="bg-[#FFC91A] w-8 h-8 rounded-full"></div>
                                        <div className="bg-[#DD4A4A] w-8 h-8 rounded-full"></div>
                                        <div className="bg-[#CB298A] w-8 h-8 rounded-full"></div>
                                    </div>
                                </div>
                            </form>
                            <hr className="mt-8"></hr>

                            <div className="flex justify-between items-center mt-4">
                                <button onClick={() => setModalOpen(false)}>
                                    <div className="flex items-center gap-4 bg-[#DF2D2D]/15 text-[#DF2D2D] font-semibold px-6 py-2 rounded-2xl mt-8">
                                        <div className="font-bold text-xl">
                                            <GoTrash />
                                        </div>
                                        <p>Cancelar</p>
                                    </div>
                                </button>

                                <button>
                                    <div>
                                        <div className="flex items-center gap-4 bg-[#CFF5A4] text-[#3D5536] font-semibold px-6 py-2 rounded-2xl mt-8">
                                            <div className="font-bold text-xl">
                                                <FiLogIn />
                                            </div>
                                            <p>Criar quadro</p>
                                        </div>
                                    </div>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}