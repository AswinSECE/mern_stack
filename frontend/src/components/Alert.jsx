import { useState, useEffect } from 'react';
import { X } from 'lucide-react';

export default function Alert({ message, type = 'success', duration = 3000, onClose }) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      onClose?.();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  if (!isVisible) return null;

  const typeClasses = {
    success: 'bg-emerald-50 text-emerald-800 border-emerald-200',
    error: 'bg-red-50 text-red-800 border-red-200',
    warning: 'bg-amber-50 text-amber-800 border-amber-200',
    info: 'bg-blue-50 text-blue-800 border-blue-200',
  };

  return (
    <div className={`fixed top-4 right-4 border p-4 rounded flex items-center gap-3 z-50 max-w-sm ${typeClasses[type]}`}>
      <div className="flex-1 text-sm font-medium">{message}</div>
      <button
        onClick={() => {
          setIsVisible(false);
          onClose?.();
        }}
        className="text-slate-400 hover:text-slate-600 transition-colors"
      >
        <X size={18} />
      </button>
    </div>
  );
}
