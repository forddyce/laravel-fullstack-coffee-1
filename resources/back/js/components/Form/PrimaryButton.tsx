import { ButtonHTMLAttributes, PropsWithChildren } from 'react';

interface PrimaryButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    className?: string;
    disabled?: boolean;
}

export default function PrimaryButton({ className = '', disabled, children, ...props }: PropsWithChildren<PrimaryButtonProps>) {
    return (
        <button
            {...props}
            className={
                `inline-flex items-center rounded-md border border-transparent bg-gray-800 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-white ring-gray-300 transition duration-150 ease-in-out focus:border-gray-900 focus:outline-none focus:ring active:bg-gray-900 ` +
                (disabled && 'opacity-25') +
                ' ' +
                className
            }
            disabled={disabled}
        >
            {children}
        </button>
    );
}
