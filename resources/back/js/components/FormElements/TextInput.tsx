import { forwardRef, InputHTMLAttributes, useEffect, useRef } from 'react';

interface TextInputProps extends InputHTMLAttributes<HTMLInputElement> {
    isFocused?: boolean;
}

export default forwardRef<HTMLInputElement, TextInputProps>(function TextInput({ type = 'text', className = '', isFocused = false, ...props }, ref) {
    const internalRef = useRef<HTMLInputElement>(null);
    const resolvedRef = (ref as React.RefObject<HTMLInputElement>) || internalRef;

    useEffect(() => {
        if (isFocused && resolvedRef.current) {
            resolvedRef.current.focus();
        }
    }, [isFocused, resolvedRef]);

    return (
        <input
            {...props}
            type={type}
            className={'rounded-md border border-gray-300 px-2 py-4 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 ' + className}
            ref={resolvedRef}
        />
    );
});
