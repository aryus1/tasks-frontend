import { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Icons } from "../components/Icons";
import CodeInput from "../components/CodeInput";

export default function VerifyCodeRegister() {
  const navigate = useNavigate();
  const [isCodeValid, setIsCodeValid] = useState(null);
  const codeRef = useRef("");

  const handleCompleteCode = (code) => {
    codeRef.current = code;
    setIsCodeValid(code === "1234");
  };

  const handleSubmit = () => {
    if (!isCodeValid) {
      alert("Código incorreto.");
      return;
    }
    navigate("/set-username");
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
            Confirme seu <span className="block">código e comece já!</span>
          </h1>

          <div className="space-y-3 max-w-sm">
            <CodeInput 
              length={4} 
              onComplete={handleCompleteCode} 
              isValid={isCodeValid !== false}
              autoFocus 
            />
            
            <button
              type="button"
              onClick={handleSubmit}
              disabled={!isCodeValid}
              className={`
                whitespace-nowrap
                flex justify-center gap-2 pl-2 items-center w-full h-12 
                text-base text-stone-950 font-bold text-center rounded-lg
                bg-gradient-to-r from-lime-700 via-lime-500 to-lime-300
                transition-all duration-300
                ${isCodeValid ? 'hover:translate-y-[-5px]' : 'opacity-80 cursor-not-allowed'}
              `}
            >
              Verificar código
              <Icons.Right className="h-5 w-5 bg-transparent" />
            </button>
          </div>

          <p className="text-sm text-center text-stone-700 mt-2">
            Não recebeu ainda? <strong><Link to="/auth/verify-code-register" className="hover:underline hover:text-lime-700">Reenviar código.</Link></strong>
          </p>
        </section>
      </div>
    </main>
  );
}