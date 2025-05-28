import { useRef, useEffect, useState, useCallback } from "react";

export default function CodeInput({ 
  length = 4, 
  onComplete, 
  isValid = true,
  autoFocus = false 
}) {
  const [code, setCode] = useState(Array(length).fill(''));
  const inputsRef = useRef([]);

  // Verifica se todos os dígitos foram preenchidos e chama onComplete
  const checkCompletion = useCallback(() => {
    const allFilled = code.every(digit => digit !== '');
    if (allFilled && typeof onComplete === "function") {
      onComplete(code.join(''));
    }
  }, [code, onComplete]);

  // Efeito para verificar completude quando o código muda
  useEffect(() => {
    checkCompletion();
  }, [code, checkCompletion]);

  // Efeito para autofocus (quando ativado)
  useEffect(() => {
    if (autoFocus && inputsRef.current[0]) {
      inputsRef.current[0].focus();
    }
  }, [autoFocus]);

  const handleChange = (e, index) => {
    const value = e.target.value;
    
    // Aceita apenas dígitos
    if (/^[0-9]$/.test(value)) {
      // Atualiza o estado com o novo valor
      const newCode = [...code];
      newCode[index] = value;
      setCode(newCode);
      
      // Move o foco para o próximo input
      if (index < length - 1) {
        inputsRef.current[index + 1]?.focus();
      }
    }
  };

  const handleKeyDown = (e, index) => {
    switch (e.key) {
      case 'Backspace':
        if (e.target.value === '') {
          // Se o input atual estiver vazio, apaga o anterior e move o foco
          if (index > 0) {
            const newCode = [...code];
            newCode[index - 1] = '';
            setCode(newCode);
            inputsRef.current[index - 1]?.focus();
          }
        } else {
          // Apaga o dígito atual
          const newCode = [...code];
          newCode[index] = '';
          setCode(newCode);
        }
        break;
      
      case 'ArrowLeft':
        // Move o foco para o input anterior
        if (index > 0) {
          inputsRef.current[index - 1]?.focus();
        }
        break;
        
      case 'ArrowRight':
        // Move o foco para o próximo input
        if (index < length - 1) {
          inputsRef.current[index + 1]?.focus();
        }
        break;
        
      default:
        break;
    }
  };

  // Permite colar um código completo
  const handlePaste = (e, index) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text');
    const digits = pastedData.match(/\d/g);
    
    if (digits && digits.length > 0) {
      const newCode = [...code];
      
      // Preenche a partir do índice atual
      for (let i = 0; i < digits.length && index + i < length; i++) {
        newCode[index + i] = digits[i];
      }
      
      setCode(newCode);
      
      // Move o foco para o último input preenchido ou o próximo vazio
      const nextIndex = Math.min(index + digits.length, length - 1);
      inputsRef.current[nextIndex]?.focus();
    }
  };

  // Classes CSS do input (extraídas para melhorar a legibilidade)
  const inputClasses = `
    w-16 h-12 sm:w-16 sm:h-12 text-center text-xl rounded-lg outline-none 
    bg-stone-950 border border-stone-800 focus:bg-stone-900
    focus:border-2 placeholder:text-base placeholder:font-light focus:outline-none focus:ring-0
    border-stone-900 text-stone-600 placeholder-stone-700
    ${!isValid ? 'border-red-500' : ''}
  `;

  return (
    <div className="flex justify-between items-center gap-2 sm:gap-3 mb-2" role="group" aria-label="Código de verificação">
      {code.map((digit, index) => (
        <input
          key={index}
          type="text"
          inputMode="numeric"
          pattern="[0-9]*"
          maxLength="1"
          value={digit}
          aria-label={`Dígito ${index + 1} de ${length}`}
          ref={(el) => (inputsRef.current[index] = el)}
          onChange={(e) => handleChange(e, index)}
          onKeyDown={(e) => handleKeyDown(e, index)}
          onPaste={(e) => handlePaste(e, index)}
          className={inputClasses}
        />
      ))}
    </div>
  );
}