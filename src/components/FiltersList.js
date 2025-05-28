import { useState } from "react";
import { FiLogIn } from "react-icons/fi";
import { GoTrash } from "react-icons/go";
import { IoIosAddCircleOutline, IoIosArrowUp, IoIosList } from "react-icons/io";
import { IoCloseCircleOutline } from "react-icons/io5";

export default function FiltersList() {

    return (

        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
            <div className="flex justify-center gap-4 items-center">
                <button className="border border-[#90E528] text-[#5B8C00] px-4 py-2 rounded-xl">Filtrar</button>
                <div className="flex items-center text-[#5B8C00] gap-2">
                    <button className="text-[#5B8C00] px-2 py-2 rounded-xl">Criação</button>
                    <IoIosArrowUp />
                </div>
                <span className="text-[#5B8C00] px-3 py-1 rounded-xl">Categoria</span>
                <span className="bg-[#D6F2B3] text-[#5B8C00] px-3 py-1 rounded-xl">Quinzenal</span>
            </div>
        </div>

    );
}
