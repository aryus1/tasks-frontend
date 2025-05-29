import { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Icons } from "../components/Icons";
import CodeInput from "../components/CodeInput";
import api from "../services/axios";

export default function VerifyCodeLogin() {
  const navigate = useNavigate();
  const [isCodeValid, setIsCodeValid] = useState(null);
  const [code, setCode] = useState("")

  const handleResetCode = async () => {
    const email = localStorage.getItem("email");
    if (!email) {
      alert("E-mail não encontrado. Por favor, volte e informe seu e-mail novamente.");
      return;
    }

    try {
      const response = await api.post("api/auth/request-code", { email });

      alert("Código reenviado com sucesso! Verifique seu e-mail.");
    } catch (error) {
      console.error("Erro ao reenviar o código.", error);
      alert("Erro ao reenviar o código de verificação. Tente novamente mais tarde.");
    }
  };

  const handleCompleteCode = (completedCode) => {
    setCode(completedCode);
    setIsCodeValid(null);
  };

  const handleSubmit = async () => {
    const email = localStorage.getItem("email");

    if (!email) {
      alert("E-mail não encontrado. Retorne e insira novamente.");
      return;
    }

    if (code.length !== 6) {
      alert("Por favor, insira o código completo.");
      return;
    }

    try {
      console.log("Enviando dados para verificação:", {
        email,
        code,
      });

      const response = await api.post("api/auth/verify-code", {
        email: email,
        code: code,
      });

      const token = response.data.token;

      if (token) {
        localStorage.setItem("token", token);
        setIsCodeValid(true);
        localStorage.removeItem("email");
        navigate("/dashboard");
      } else {
        setIsCodeValid(false);
        alert("Código incorreto.");
      }
    } catch (error) {
      console.error("Erro ao verificar o código:", error);
      setIsCodeValid(false);
    }
  };

  return (
    <main className="flex justify-center items-center min-h-screen bg-stone-950">
      <div className="space-y-8 min-w-80">
        <div className="flex justify-center items-center">
          <img src="/assets/logo-white.svg" alt="Logo Dasky" className="w-36" />
        </div>

        <section>
          <h1 className="font-extrabold text-2xl text-center mb-6
            text-transparent bg-clip-text bg-gradient-to-r from-lime-400 via-lime-300 to-lime-300">
            Confirme o código
            <span className="block text-2xl font-semibold 
            text-transparent bg-clip-text bg-gradient-to-r from-lime-600 via-lime-400 to-lime-100">
              para entrar.
            </span>
          </h1>
          <div className="flex flex-col justify-center items-center space-y-3 max-w-sm">
            <CodeInput
              length={6}
              onComplete={handleCompleteCode}
              isValid={isCodeValid !== false}
              autoFocus
            />

            <button
              type="button"
              onClick={handleSubmit}
              disabled={code.length !== 6}
              className={`
                whitespace-nowrap
                flex justify-center gap-2 pl-2 items-center w-full h-12 
                text-base text-stone-950 font-bold text-center rounded-lg
                bg-gradient-to-r from-lime-700 via-lime-500 to-lime-300
                transition-all duration-300
                ${code.length === 6
                  ? "hover:translate-y-[-5px]"
                  : "opacity-80 cursor-not-allowed"
                }
              `}
            >
              Verificar código
              <Icons.Right className="h-5 w-5 bg-transparent" />
            </button>
          </div>
          <p className="text-sm text-center text-stone-700 mt-2">
            Não recebeu ainda?
            <strong>
              <button
                type="button"
                onClick={handleResetCode}
                className="hover:underline hover:text-lime-700"
              >
                Reenviar código.
              </button>
            </strong>
          </p>
        </section>
      </div>
    </main>
  );
}