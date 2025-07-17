import { Link } from '@inertiajs/react';
import { PropsWithChildren } from 'react';

export default function NavLink({
    active = false,
    className = '',
    children,
    ...props
}: PropsWithChildren<{ active?: boolean; className?: string; href: string }>) {
    return (
        <Link
            {...props}
            className={
                'block rounded-md px-3 py-2 text-base font-medium transition duration-150 ease-in-out ' +
                (active ? 'bg-red-950 text-white' : 'text-gray-300 hover:bg-red-950 hover:text-white') +
                className
            }
        >
            {children}
        </Link>
    );
}
