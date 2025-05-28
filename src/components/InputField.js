import { useState } from "react";
import { Icons } from "./Icons";

export default function InputField({ value, onChange, onEnter, showErrors }) {
  const [isFocused, setIsFocused] = useState(false);

  const isValid = value.includes("@"); // Exemplo simples de validação

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && typeof onEnter === "function") {
      onEnter();
    }
  };

  const showErrorState = showErrors && !isValid;

  return (
    <div className="relative flex items-center w-full">
      <Icons.Mail
        className={`
          h-6 w-6 absolute left-4 transition-opacity duration-200 bg-transparent
          ${showErrorState ? "text-red-500" : "text-stone-700"}
          ${isFocused ? "opacity-0 pointer-events-none" : "opacity-100"}
        `}
      />
      <input
        type="email"
        value={value}
        onChange={onChange}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        onKeyDown={handleKeyDown}
        name="email"
        placeholder="Digite aqui seu email"
        className={`
          bg-stone-950 placeholder:text-sm placeholder:font-light
          text-sm w-full h-12 border rounded-lg text-start transition-all duration-200
          ${isFocused ? "pl-4" : "pl-14"}
          ${showErrorState
            ? "border-red-500 text-red-500 placeholder-red-400"
            : "border-stone-900 text-stone-600 placeholder-stone-700"} 
          focus:outline-none focus:ring-0
        `}
      />
    </div>
  );
}
