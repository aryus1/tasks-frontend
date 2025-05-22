import { IoIosAddCircleOutline, IoIosArrowForward } from "react-icons/io";
import Header from "../components/Header";
import NavBarWorkspace from "../components/NavBarWorkspace";
import { MdOutlineViewKanban } from "react-icons/md";
import { useState } from "react";
import { IoCloseCircleOutline } from "react-icons/io5";
import { GoTrash } from "react-icons/go";
import { FiLogIn } from "react-icons/fi";

export default function InternWorkspaceKanban() {
    const [modalOpen, setModalOpen] = useState(false)

    const handleModalOpen = () => {
        setModalOpen(true)
    }

    return (
        <div>
            <Header />
            <NavBarWorkspace />

            <div className="p-4 space-y-6">
                <div className="bg-[#FFC91A]/30 rounded-xl text-[#CCA114]">
                    <div className="flex items-center gap-6 p-4">
                        <MdOutlineViewKanban className="text-2xl" />
                        <h2 className="font-semibold">A fazer</h2>
                        <div className="ml-auto">
                            <IoIosArrowForward />
                        </div>
                    </div>
                </div>

                <div className="bg-[#CB298A]/20 rounded-xl text-[#CB298A]">
                    <div className="flex items-center gap-6 p-4">
                        <MdOutlineViewKanban className="text-2xl" />
                        <h2 className="font-semibold">Em andamento</h2>
                        <div className="ml-auto">
                            <IoIosArrowForward />
                        </div>
                    </div>
                </div>

                <div className="bg-[#3577DB]/20 rounded-xl text-[#3577DB]">
                    <div className="flex items-center gap-6 p-4">
                        <MdOutlineViewKanban className="text-2xl" />
                        <h2 className="font-semibold">Concluído</h2>
                        <div className="ml-auto">
                            <IoIosArrowForward />
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex justify-center items-center">
                <button onClick={handleModalOpen} className="flex items-center justify-center gap-4 bg-[#90E528] hover:bg-[#7cc91f] font-semibold px-6 py-4 rounded-xl border border-black border-b-4 mt-16">
                    <div className="text-2xl">
                        <IoIosAddCircleOutline />
                    </div>
                    Criar nova etapa
                </button>
            </div>

            {modalOpen && (
                <div className="fixed inset-0 flex items-center justify-center flex-col bg-black bg-opacity-50">

                    <div className="border-2 border-[#90E528] rounded-2xl">
                        <div className="flex gap-4 items-center justify-between bg-[#90E528] p-4 rounded-t-xl">
                            <h2 className="text-xl font-semibold">Nova etapa</h2>
                            <button onClick={() => setModalOpen(false)} className="text-2xl">
                                <IoCloseCircleOutline />
                            </button>
                        </div>
                        <div className="bg-white p-4 rounded-b-xl shadow-lg w-full max-w-md">
                            <form>
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
                                            <p>Criar etapa</p>
                                        </div>
                                    </div>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}