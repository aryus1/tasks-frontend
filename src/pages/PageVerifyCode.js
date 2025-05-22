import { useRef, useState } from "react"
import { IoIosArrowForward } from "react-icons/io";
import { useLocation, useNavigate } from "react-router-dom";
import api from "../services/axios";

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

    const location = useLocation();
    const email = location.state?.email;

    const handleNavigate = async () => {
        const allFilled = inputsRef.current.every(input => input && input.value !== "");

        if (!email) {
            alert("Email não encontrado. Volte e insira seu email novamente.");
            return;
        }

        if (allFilled) {
            const codeValue = inputsRef.current.map(input => input.value).join("");

            try {
                const response = await api.post("/auth/verify-code", {
                    email: email.trim(),
                    code: codeValue,
                });

                alert("Login realizado com sucesso!");
                navigate('/dashboard');
            } catch (error) {
                console.error(error);
                alert("Código inválido ou expirado. Tente novamente.");
            }
        } else {
            alert("Preencha todos os campos!");
        }
    };

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
            <div className="mt-60 md:hidden">
                <img src="/assets/group.png" alt="decor" />
            </div>
        </div>
    )
}