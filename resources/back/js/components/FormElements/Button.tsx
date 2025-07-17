import { ButtonHTMLAttributes } from 'react';

type ButtonVariant = 'primary' | 'secondary' | 'danger';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: ButtonVariant;
}

export default function Button({ className = '', disabled, children, variant = 'primary', ...props }: ButtonProps) {
    const baseClasses = `inline-flex items-center px-4 py-2 border rounded-md font-semibold text-xs uppercase tracking-widest shadow-sm `;
    const disabledClasses = `disabled:opacity-25 transition ease-in-out duration-150 ${disabled ? 'opacity-25' : ''}`;

    let variantClasses = '';

    switch (variant) {
        case 'primary':
            variantClasses = `bg-indigo-600 border-transparent text-white hover:bg-indigo-700 focus:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2`;
            break;
        case 'secondary':
            variantClasses = `bg-white border-gray-300 text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2`;
            break;
        case 'danger':
            variantClasses = `bg-red-600 border-transparent text-white hover:bg-red-700 focus:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2`;
            break;
        default:
            variantClasses = `bg-indigo-600 border-transparent text-white hover:bg-indigo-700 focus:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2`; // Fallback to primary
            break;
    }

    return (
        <button {...props} className={`${baseClasses} ${variantClasses} ${disabledClasses} ${className}`} disabled={disabled}>
            {children}
        </button>
    );
}
