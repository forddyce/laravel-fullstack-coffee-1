import { LabelHTMLAttributes, PropsWithChildren } from 'react';

interface InputLabelProps extends LabelHTMLAttributes<HTMLLabelElement> {
    value?: string;
    className?: string;
    htmlFor: string;
    required?: boolean;
}

export default function InputLabel({ value, required = false, className = '', children, ...props }: PropsWithChildren<InputLabelProps>) {
    return (
        <label {...props} className={`block text-sm font-medium text-gray-700 ${className}`}>
            {value ? value : children} {required && <span className="text-red-500">*</span>}
        </label>
    );
}
