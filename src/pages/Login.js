import { useState } from "react";
import { Icons } from "src/components/Icons";
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
        <main className="flex justify-center items-center min-h-screen">
        <div> 
            <div className="flex justify-center">
                <img src="./assets/logo.png" alt="Logo Dasky" />
            </div>

            <section className="flex flex-col justify-center items-center">
                <h1 className="font-bold text-2xl text-[#203309] text-center">
                    Digite seu e-mail <span className="block">para entrar</span>
                </h1>

                <div className="relative max-w-sm flex items-center">
                    <Icons.Mail className="h-6 w-6 text-gray-500" />
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
                    className="flex items-center w-fit px-16 py-2 bg-[#A0FF2C] border-b-2 border-b-black rounded-xl cursor-pointer "
                    onClick={handleNavigate}
                >
                    <button className="text-[#203309] font-bold">Enviar código</button>
                    <Icons.Mail className="h-6 w-6 text-gray-500" />
                </div>

                <p className="text-[#3D5536]">
                    Não tem uma conta? <strong><Link to={'/register'}>Crie agora!</Link></strong>
                </p>
            </section>
        </div>
        </main>
    );
}