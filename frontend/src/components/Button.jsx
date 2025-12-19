export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  ...props
}) {
  const baseClasses = 'font-medium transition-all duration-200 cursor-pointer active:scale-95';

  const variantClasses = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700 rounded',
    secondary: 'bg-slate-100 text-slate-900 hover:bg-slate-200 rounded',
    danger: 'bg-red-50 text-red-600 hover:bg-red-100 rounded',
    success: 'text-emerald-600 hover:bg-emerald-50 rounded',
    outline: 'border border-slate-300 text-slate-700 hover:bg-slate-50 rounded',
  };

  const sizeClasses = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-sm',
    lg: 'px-6 py-2.5 text-base',
  };

  return (
    <button
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
