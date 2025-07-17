import ApplicationLogo from '@/back/js/components/ApplicationLogo';
import NavLink from '@/back/js/components/NavLink';
import type { SidebarItem } from '@/back/js/utils/sidebarItems';
import { PageProps } from '@inertiajs/core';
import { Link, usePage } from '@inertiajs/react';
import type { User } from 'types';

interface SidebarProps {
    sidebarOpen: boolean;
    setSidebarOpen: (open: boolean) => void;
    items: SidebarItem[];
}

interface CustomPageProps extends PageProps {
    auth: {
        user: User & { permissions?: string[] };
    };
}

export default function Sidebar({ sidebarOpen, items }: SidebarProps) {
    const { auth } = usePage<CustomPageProps>().props;
    const userPermissions = auth.user?.permissions || [];

    const hasPermission = (permission: string) => {
        return userPermissions.includes(permission);
    };

    const renderSidebarItems = (navItems: SidebarItem[]) => {
        return (
            <ul>
                {navItems.map((item, index) => {
                    const itemHasRequiredPermission = item.permission ? hasPermission(item.permission) : true;
                    if (item.children) {
                        const accessibleChildren = renderSidebarItems(item.children);
                        if (itemHasRequiredPermission && accessibleChildren.props.children.length > 0) {
                            return (
                                <li key={index} className="mb-2">
                                    <div>
                                        <span className="block cursor-pointer rounded-md px-4 py-2 text-sm font-semibold text-gray-300 hover:bg-red-950">
                                            {item.icon} {item.name}
                                        </span>
                                        <ul className="ml-4 mt-1">{accessibleChildren}</ul>
                                    </div>
                                </li>
                            );
                        }
                        return null;
                    }

                    if (itemHasRequiredPermission && item.href) {
                        return (
                            <li key={index} className="mb-2">
                                <NavLink href={route(item.href)} active={route().current(item.href)}>
                                    {item.icon} {item.name}
                                </NavLink>
                            </li>
                        );
                    }
                    return null;
                })}
            </ul>
        );
    };

    const filteredSidebarItems = renderSidebarItems(items);

    return (
        <nav
            className={`fixed left-0 top-0 h-full w-64 bg-gray-800 p-4 text-white transition-transform duration-300 ease-in-out ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} z-20`}
            style={{
                backgroundColor: '#a71f1f',
            }}
        >
            <div className="flex h-16 items-center justify-between border-b border-gray-700 pb-4">
                <Link href={route('admin.dashboard')} className="flex items-center">
                    <ApplicationLogo className="block h-9 w-auto fill-current text-gray-200" />
                    <span className="ml-3 text-xl font-semibold">Admin Panel</span>
                </Link>
            </div>

            <div className="mt-6">{filteredSidebarItems}</div>
        </nav>
    );
}
