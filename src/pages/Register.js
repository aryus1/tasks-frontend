import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import InputField from "../components/InputField";
import { Icons } from "../components/Icons";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function Register() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const isValidEmail = emailRegex.test(email.trim());

    const handleNavigate = () => {
        if (!isValidEmail) {
            alert("Por favor, insira um e-mail válido.");
            return;
        }

        navigate("/auth/verify-code-register");
    };

    return (
        <main className="flex justify-center items-center min-h-screen bg-stone-950">
            <div className="space-y-8 min-w-80">
                <div className="flex justify-center">
                    <img src="./assets/logo-white.svg" alt="Logo Dasky" className="w-36" />
                </div>

                <section>
                    <h1 className="font-extrabold text-2xl text-center mb-6
                        text-transparent bg-clip-text bg-gradient-to-r from-lime-600 via-lime-400 to-lime-100">
                        Crie sua conta
                        <span className="block text-2xl font-semibold 
                        text-transparent bg-clip-text bg-gradient-to-r from-lime-600 via-lime-400 to-lime-100">
                            gratuitamente!
                        </span>
                    </h1>

                    <form
                        className="space-y-3 max-w-sm"
                        onSubmit={(e) => {
                            e.preventDefault();
                            handleNavigate();
                        }}
                    >
                        <InputField
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            isValid={email.length === 0 || isValidEmail}
                        />
                        <button
                            type="button"
                            onClick={handleNavigate}
                            className="
                            whitespace-nowrap
                            flex justify-center gap-2 pl-2 items-center w-full h-12 
                            text-base text-stone-950 font-bold text-center rounded-lg
                            bg-gradient-to-r from-lime-700 via-lime-500 to-lime-300
                            hover:translate-y-[-5px] transition-all duration-400
                            "
                        >
                            Receber Código no Email
                            <Icons.Right className="h-5 w-5 bg-transparent" />
                        </button>
                    </form>

                    <p className="text-sm text-center text-stone-700 mt-2">
                        Já possui uma conta? <strong><Link to="/" className="hover:underline hover:text-lime-700">Entre agora.</Link></strong>
                    </p>
                </section>
            </div>
        </main>
    );
}
