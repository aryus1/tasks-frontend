import { HiOutlinePencil } from "react-icons/hi";
import { RiArrowGoBackFill } from "react-icons/ri";
import { useNavigate, useParams } from "react-router-dom";

export default function NavBarWorkspace() {
    const { title } = useParams()
    const navigate = useNavigate()

    return (
        <div className="flex justify-between items-center p-4">
            <div className="bg-[#90E528] p-2 rounded-xl" onClick={() => navigate(-1)}>
                <RiArrowGoBackFill />
            </div>

            <h1 className="font-semibold text-lg">{decodeURIComponent(title)}</h1>

            <HiOutlinePencil />
        </div>
    )
}