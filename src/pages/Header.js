import { useState } from "react";
import { BiMenu, BiX } from "react-icons/bi";

export default function Header({ onToggleSidebar, isSidebarOpen = false }) {
  const [currentTime, setCurrentTime] = useState(new Date());

  // Atualiza o relógio a cada minuto
  useState(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (date) => {
    return date.toLocaleTimeString('pt-BR', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatDate = (date) => {
    return date.toLocaleDateString('pt-BR', {
      weekday: 'long',
      day: 'numeric',
      month: 'long'
    });
  };

  return (
    <header className="fixed top-0 left-0 right-0 h-16 bg-stone-900/95 backdrop-blur-sm border-b border-stone-800 z-50">
      <div className="max-w-screen-2xl mx-auto px-4 h-full flex items-center justify-between">
        {/* Lado esquerdo - Logo e botão menu mobile */}
        <div className="flex items-center gap-4">
          {/* Botão menu para mobile - visível apenas em telas pequenas */}
          {onToggleSidebar && (
            <button
              onClick={onToggleSidebar}
              className="lg:hidden w-10 h-10 flex items-center justify-center rounded-lg bg-stone-800 text-white hover:bg-stone-700 transition-colors focus:outline-none focus:ring-2 focus:ring-lime-500"
              aria-label={isSidebarOpen ? "Fechar menu" : "Abrir menu"}
            >
              {isSidebarOpen ? (
                <BiX className="text-xl" />
              ) : (
                <BiMenu className="text-xl" />
              )}
            </button>
          )}

          {/* Logo */}
          <div className="flex items-center">
            <img 
              src="./assets/logo-white.svg" 
              alt="Logo Dasky" 
              className="w-24 sm:w-28 h-auto"
            />
          </div>
        </div>

        
      </div>
    </header>
  );
}