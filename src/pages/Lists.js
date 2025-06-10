import { Link, useLocation } from "react-router-dom";
import { IoIosList } from "react-icons/io";
import { MdOutlineSpaceDashboard, MdOutlineViewKanban } from "react-icons/md";
import { AiOutlineHome } from "react-icons/ai";

export default function Lists() {
  const location = useLocation();
  
  // Determina qual aba está ativa com base na URL atual
  const isActiveDashboard = location.pathname === "/dashboard";
  const isActiveToDo = location.pathname === "/workspace-to-do";
  const isActiveKanBan = location.pathname === "/kanban";

  const navigationItems = [
    {
      to: "/dashboard",
      icon: AiOutlineHome,
      label: "Dashboard",
      isActive: isActiveDashboard,
      description: "Visão geral das suas tarefas"
    },
    {
      to: "/workspace-to-do",
      icon: IoIosList,
      label: "To-Do Lists",
      isActive: isActiveToDo,
      description: "Listas de tarefas organizadas"
    },
  ];
  
  return (
    <div className="flex flex-col py-4 h-full overflow-hidden">
      {/* Seção de Navegação */}
      <div className="mb-6 flex-shrink-0">
        
        <nav className="space-y-2">
          {navigationItems.map((item) => {
            const IconComponent = item.icon;
            return (
              <Link
                key={item.to}
                to={item.to}
                className={`group flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                  item.isActive
                    ? "bg-lime-600 text-white shadow-lg" 
                    : "bg-stone-800 text-gray-400 hover:bg-stone-700 hover:text-gray-300"
                }`}
                title={item.description}
              >
                <IconComponent 
                  className={`text-lg flex-shrink-0 ${
                    item.isActive ? "text-white" : "text-gray-400 group-hover:text-gray-300"
                  }`} 
                />
                <div className="flex flex-col overflow-hidden">
                  <span className={`font-medium truncate ${
                    item.isActive ? "text-white" : "text-gray-300"
                  }`}>
                    {item.label}
                  </span>
                  {/* Descrição visível apenas em telas grandes e quando não ativo */}
                  <span className={`text-xs truncate transition-opacity hidden lg:block ${
                    item.isActive 
                      ? "text-lime-100 opacity-90" 
                      : "text-gray-500 group-hover:text-gray-400"
                  }`}>
                    {item.description}
                  </span>
                </div>
                
                {/* Indicador visual para item ativo */}
                {item.isActive && (
                  <div className="w-2 h-2 bg-white rounded-full flex-shrink-0 animate-pulse"></div>
                )}
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="mb-6 flex-shrink-0 hidden lg:block">
        <div className="space-y-2">
        </div>
      </div>
      
      <div className="mt-auto flex-shrink-0">
        <div className="bg-gradient-to-br from-stone-800/40 to-stone-800/20 rounded-lg p-4 border border-stone-700/50 backdrop-blur-sm">
          <div className="flex items-start gap-3">
            {/* Ícone de dica */}
            <div className="w-8 h-8 bg-lime-600/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
              <svg 
                className="w-4 h-4 text-lime-400" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth="2" 
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            
            <div className="overflow-hidden">
              <h3 className="font-medium text-white mb-1 text-sm">Dica de Produtividade</h3>
              <p className="text-xs text-gray-400 leading-relaxed">
                Organize suas tarefas criando listas e quadros para diferentes contextos. 
                <span className="hidden lg:inline">
                  {" "}Use as categorias para manter tudo organizado e priorize as tarefas mais importantes.
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}