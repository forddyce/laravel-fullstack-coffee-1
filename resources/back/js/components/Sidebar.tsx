import ApplicationLogo from '@/back/js/components/ApplicationLogo';
import NavLink from '@/back/js/components/NavLink';
import type { SidebarItem } from '@/back/js/utils/sidebarItems';
import { Link } from '@inertiajs/react';

interface SidebarProps {
    sidebarOpen: boolean;
    setSidebarOpen: (open: boolean) => void;
    items: SidebarItem[];
}

export default function Sidebar({ sidebarOpen, setSidebarOpen, items }: SidebarProps) {
    const renderSidebarItems = (navItems: SidebarItem[]) => {
        return (
            <ul>
                {navItems.map((item, index) => (
                    <li key={index} className="mb-2">
                        {item.children ? (
                            <div>
                                <span className="block cursor-pointer rounded-md px-4 py-2 text-sm font-semibold text-gray-300 hover:bg-gray-700">
                                    {item.icon} {item.name}
                                </span>
                                <ul className="ml-4 mt-1">{renderSidebarItems(item.children)}</ul>
                            </div>
                        ) : (
                            <NavLink href={route(item.href)} active={route().current(item.href)}>
                                {item.icon} {item.name}
                            </NavLink>
                        )}
                    </li>
                ))}
            </ul>
        );
    };

    return (
        <nav
            className={`fixed left-0 top-0 h-full w-64 bg-gray-800 p-4 text-white transition-transform duration-300 ease-in-out ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} z-20`}
        >
            <div className="flex h-16 items-center justify-between border-b border-gray-700 pb-4">
                <Link href={route('admin.dashboard')} className="flex items-center">
                    <ApplicationLogo className="block h-9 w-auto fill-current text-gray-200" />
                    <span className="ml-3 text-xl font-semibold">Admin Panel</span>
                </Link>
            </div>

            <div className="mt-6">{renderSidebarItems(items)}</div>
        </nav>
    );
}
