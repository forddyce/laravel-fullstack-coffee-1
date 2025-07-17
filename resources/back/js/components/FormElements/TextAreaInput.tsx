import { forwardRef, InputHTMLAttributes, useEffect, useRef } from 'react';
import InputError from './InputError';
import InputLabel from './InputLabel';

interface TextAreaInputProps extends InputHTMLAttributes<HTMLTextAreaElement> {
    isFocused?: boolean;
    label?: string;
    error?: string;
}

const TextAreaInput = forwardRef<HTMLTextAreaElement, TextAreaInputProps>(({ className = '', isFocused = false, label, error, ...props }, ref) => {
    const input = ref ? (ref as React.RefObject<HTMLTextAreaElement>) : useRef<HTMLTextAreaElement>(null);

    useEffect(() => {
        if (isFocused) {
            input.current?.focus();
        }
    }, [isFocused]);

    const inputClasses = `px-2 py-4 border border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md ${className}`;

    return (
        <div>
            {label && <InputLabel htmlFor={props.id ?? props.name ?? ''} value={label} required={props.required} />}
            <textarea {...props} className={inputClasses} ref={input} />
            {error && <InputError message={error} className="mt-2" />}
        </div>
    );
});

export default TextAreaInput;
