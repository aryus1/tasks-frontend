import { useRef } from "react"
import { IoIosArrowForward } from "react-icons/io";
import { useNavigate } from "react-router-dom";

export default function PageVerifyCode() {
    const inputsRef = useRef([]);
    const navigate = useNavigate()

    const handleChange = (e, index) => {
        const value = e.target.value

        if (/^[0-9]$/.test(value)) {
            if (index < inputsRef.current.length - 1) {
                inputsRef.current[index + 1].focus()
            }
        } else {
            e.target.value = ""
        }
    }

    const handleNavigate = () => {
        const allFilled = inputsRef.current.every(input => input && input.value !== "");

        if (!allFilled) {
            alert('Preencha o código fornecido.');
            return;
        }

        navigate('/dashboard');
    }

    return (
        <div>
            <div className="flex justify-center items-center mt-10">
                <img src="/assets/logo.png" alt="Logo Dasky" />
            </div>

            <section className="flex flex-col justify-center items-center mt-20 space-y-6">
                <h1 className="font-bold text-2xl text-[#203309] text-center">Confirme o código</h1>

                <div className="flex justify-center items-center gap-3 mt-6">
                    {[...Array(4)].map((_, index) => (
                        <input
                            key={index}
                            type="text"
                            maxLength="1"
                            inputMode="numeric"
                            pattern="[0-9]*"
                            ref={(el) => (inputsRef.current[index] = el)}
                            onChange={(e) => handleChange(e, index)}
                            className="w-20 h-12 text-center text-xl border-2 border-green-200 rounded-lg outline-none focus:border-green-500 focus:ring-2 focus:ring-green-300"
                        />
                    ))}
                </div>

                <div
                    className="flex items-center w-fit px-16 py-2 bg-[#A0FF2C] border-b-2 border-b-black rounded-xl cursor-pointer hover:scale-110 transition"
                    onClick={handleNavigate}
                >
                    <button className="text-[#203309] font-bold">Entrar</button>
                    <IoIosArrowForward />
                </div>
            </section>
            <div className="mt-20 md:hidden">
                <img src="/assets/group.png" alt="decor" />
            </div>
        </div>
    )
}