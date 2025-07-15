import { ReactNode } from 'react';

export interface SidebarItem {
    name: string;
    href: string;
    icon?: ReactNode;
    children?: SidebarItem[];
}

const sidebarItems: SidebarItem[] = [
    {
        name: 'Dashboard',
        href: 'admin.dashboard',
    },
    {
        name: 'User Management',
        href: 'admin.users.index',
    },
    {
        name: 'Settings',
        href: 'admin.settings.index',
    },
];

export default sidebarItems;
