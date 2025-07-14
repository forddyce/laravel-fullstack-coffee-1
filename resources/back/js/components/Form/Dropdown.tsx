import { Transition } from '@headlessui/react';
import { Link } from '@inertiajs/react';
import { createContext, PropsWithChildren, ReactNode, useContext, useState } from 'react';

const DropdownContext = createContext<{ open: boolean; setOpen: (open: boolean) => void; toggleOpen: () => void } | null>(null);

interface DropdownProps {
    children: ReactNode;
    width?: string;
    contentClasses?: string;
    alignment?: 'left' | 'right';
}

const Dropdown = ({ children, width = '48', contentClasses = 'py-1 bg-white', alignment = 'right' }: DropdownProps) => {
    const [open, setOpen] = useState(false);

    const toggleOpen = () => {
        setOpen((previousState) => !previousState);
    };

    return (
        <DropdownContext.Provider value={{ open, setOpen, toggleOpen }}>
            <div className="relative">{children}</div>
        </DropdownContext.Provider>
    );
};

interface TriggerProps {
    children: ReactNode;
}

const Trigger = ({ children }: TriggerProps) => {
    const { open, setOpen, toggleOpen } = useContext(DropdownContext)!;

    return <div onClick={toggleOpen}>{children}</div>;
};

interface ContentProps {
    children: ReactNode;
    alignment?: 'left' | 'right';
    width?: string;
    contentClasses?: string;
}

const Content = ({ alignment, width, contentClasses, children }: ContentProps) => {
    const { open, setOpen } = useContext(DropdownContext)!;

    let widthClass = 'w-48';
    if (width === '48') {
        widthClass = 'w-48';
    }

    let alignmentClasses = 'origin-top-right right-0';
    if (alignment === 'left') {
        alignmentClasses = 'origin-top-left left-0';
    } else if (alignment === 'right') {
        alignmentClasses = 'origin-top-right right-0';
    }

    return (
        <Transition
            show={open}
            enter="transition ease-out duration-200"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
        >
            <div className={`absolute z-50 mt-2 rounded-md shadow-lg ${alignmentClasses} ${widthClass}`} onClick={() => setOpen(false)}>
                <div className={`rounded-md ring-1 ring-black ring-opacity-5 ${contentClasses}`}>{children}</div>
            </div>
        </Transition>
    );
};

interface LinkProps extends PropsWithChildren {
    href: string;
    method?: 'get' | 'post' | 'put' | 'patch' | 'delete';
    as?: string;
    className?: string;
}

const DropdownLink = ({ className = '', children, ...props }: LinkProps) => {
    return (
        <Link
            {...props}
            className={
                'block w-full px-4 py-2 text-start text-sm leading-5 text-gray-700 transition duration-150 ease-in-out hover:bg-gray-100 focus:bg-gray-100 focus:outline-none ' +
                className
            }
        >
            {children}
        </Link>
    );
};

Dropdown.Trigger = Trigger;
Dropdown.Content = Content;
Dropdown.Link = DropdownLink;

export default Dropdown;
