import { IoMdMenu } from "react-icons/io";
import { CiUser } from "react-icons/ci";

export default function Header() {
    return (
        <header>
            <div className="flex justify-between items-center bg-[#90E528] p-6 rounded-b-xl shadow-lg">
                <IoMdMenu className="w-6 h-6"/>
                <h1 className="font-semibold">Usuário</h1>
                <CiUser className="w-6 h-6"/>
            </div>
        </header>
    )
}