import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import InputUsername from "../components/InputUsername";
import { Icons } from "../components/Icons";

export default function SetUsername() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");

  const handleNavigate = () => {
    if (username.trim().length < 3) {
      alert("O nome de usuário precisa ter pelo menos 3 caracteres.");
      return;
    }
    navigate("/dashboard");
  };

  return (
    <main className="flex justify-center items-center min-h-screen bg-stone-950">
      <div className="space-y-8 min-w-80">
        <div className="flex justify-center">
          <img src="/assets/logo-white.svg" alt="Logo Dasky" className="w-36" />
        </div>

        <section>
          <h1 className="font-extrabold text-2xl text-center mb-6
            text-transparent bg-clip-text bg-gradient-to-r from-lime-600 via-lime-400 to-lime-100">
            Como quer <span className="block">ser chamado?</span>
          </h1>

          <form
            className="space-y-3 max-w-sm"
            onSubmit={(e) => {
              e.preventDefault();
              handleNavigate();
            }}
          >
            <InputUsername
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Seu nome de usuário"
              autoFocus
            />
            
            <button
              type="submit"
              className="
                whitespace-nowrap 
                flex justify-center gap-2 pl-2 items-center w-full h-12 
                text-base text-stone-950 font-bold text-center rounded-lg
                bg-gradient-to-r from-lime-700 via-lime-500 to-lime-300
                transition-all duration-300
                hover:translate-y-[-5px]
              "
            >
              Confirmar nome
              <Icons.Right className="h-5 w-5 bg-transparent" />
            </button>
          </form>

          <p className="text-sm text-center text-stone-700 mt-2">
            <strong><Link to="/dashboard" className="hover:underline hover:text-lime-700">Escolher nome depois</Link></strong>
          </p>
        </section>
      </div>
    </main>
  );
}