import { useState } from "react";
import { MdOutlineEmail } from "react-icons/md";
import { IoIosArrowForward } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");

    const handleNavigate = () => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
        if (!emailRegex.test(email.trim())) {
            alert("Por favor, insira um e-mail válido.");
            return;
        }
    
        navigate('/auth/verify-code');
    };

    return (
        <div>
            <div className="flex justify-center items-center mt-10">
                <img src="./assets/logo.png" alt="Logo Dasky" />
            </div>

            <section className="flex flex-col justify-center items-center mt-20 space-y-6">
                <h1 className="font-bold text-2xl text-[#203309] text-center">
                    Digite seu e-mail <br /> para entrar
                </h1>

                <div className="relative max-w-sm flex items-center">
                    <MdOutlineEmail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500" />
                    <input
                        type="email"
                        className="w-full pl-12 pr-4 py-2 border-2 border-[#C1CBB5] rounded-xl"
                        placeholder="seuemail@gmail.com"
                        name="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>

                <div
                    className="flex items-center w-fit px-16 py-2 bg-[#A0FF2C] border-b-2 border-b-black rounded-xl cursor-pointer hover:scale-110 transition"
                    onClick={handleNavigate}
                >
                    <button className="text-[#203309] font-bold">Enviar código</button>
                    <IoIosArrowForward />
                </div>

                <p className="text-[#3D5536]">
                    Não tem uma conta? <strong><Link to={'/register'}>Crie agora!</Link></strong>
                </p>
            </section>

            <div className="mt-20 md:hidden">
                <img src="./assets/group.png" alt="decor" />
            </div>
        </div>
    );
}