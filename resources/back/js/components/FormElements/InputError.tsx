import { HTMLAttributes } from 'react';

interface InputErrorProps extends HTMLAttributes<HTMLDivElement> {
    message?: string;
    className?: string;
}

export default function InputError({ message, className = '', ...props }: InputErrorProps) {
    return message ? (
        <div {...props} className={'text-sm text-red-600 ' + className}>
            {message}
        </div>
    ) : null;
}
