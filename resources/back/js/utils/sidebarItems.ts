import { ReactNode } from 'react';

export interface SidebarItem {
    name: string;
    href: string;
    icon?: ReactNode;
    children?: SidebarItem[];
    permission?: string;
}

const sidebarItems: SidebarItem[] = [
    {
        name: 'Dashboard',
        href: 'admin.dashboard',
    },
    {
        name: 'Content Management',
        href: '#',
        children: [
            {
                name: 'Blog Posts',
                href: 'admin.blogs.index',
                permission: 'manage blog posts',
            },
            {
                name: 'Blog Tags',
                href: 'admin.blog-tags.index',
                permission: 'manage blog tags',
            },
            {
                name: 'Products',
                href: 'admin.products.index',
                permission: 'manage products',
            },
            {
                name: 'Product Categories',
                href: 'admin.product-categories.index',
                permission: 'manage product categories',
            },
        ],
    },
    {
        name: 'Agents',
        href: 'admin.agents.index',
    },
    {
        name: 'Auction Items',
        href: 'admin.auction-items.index',
    },
    {
        name: 'User Management',
        href: 'admin.users.index',
        permission: 'manage users',
    },
    {
        name: 'Settings',
        href: 'admin.settings.index',
    },
];

export default sidebarItems;
