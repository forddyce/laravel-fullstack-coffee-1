import { Link } from '@inertiajs/react';
import { ChevronDown, Menu, X } from 'lucide-react';
import { useRef, useState } from 'react';

interface ClientNavItem {
    label: string;
    href?: string;
    children?: ClientNavItem[];
    isStaticLink?: boolean;
}

const clientNavItems: ClientNavItem[] = [
    {
        label: 'About Us',
        children: [
            { label: 'Our Journey', href: 'client.static.about-us' },
            { label: 'Our Factory', href: 'client.static.our-factory' },
            { label: 'Our Technician', href: 'client.static.our-technician' },
        ],
    },
    {
        label: 'Menu',
        children: [
            { label: 'Coffee Lab', href: 'client.static.coffee-lab' },
            { label: 'Roast & Brew', href: 'client.static.roast-and-brew' },
            { label: 'WE Coffee Academy', href: 'client.static.we-coffee-academy' },
            { label: 'WE Coffee Collaborations', href: 'client.auction-items.index' },
        ],
    },
    {
        label: 'FAQ',
        children: [
            { label: 'W600i/ W600i SE', href: 'client.static.faq.w600i-w600i-se' },
            { label: 'W3100 / W3100 IR / W6100 / W6100 IR / W12k IR', href: 'client.static.faq.w3100-w3100-ir-w6100-w6100-ir-w12k-ir' },
            { label: 'WExSUJI', href: 'client.static.faq.wexsuji' },
            { label: 'W 1.0 & W 1.1', href: 'client.static.faq.w10-w11' },
            { label: 'W 3.0', href: 'client.static.faq.w30' },
        ],
    },
    {
        label: 'Products',
        href: 'client.products.index',
    },
    { label: 'Blog', href: 'client.blogs.index' },
    { label: 'ROI Calculator', href: 'client.static.calculator' },
    { label: 'Forum WE', href: 'http://sharemytribe.me/551c4', isStaticLink: true },
];

export default function ClientHeader() {
    const [openDesktopDropdown, setOpenDesktopDropdown] = useState<string | null>(null);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [openMobileSubmenu, setOpenMobileSubmenu] = useState<string | null>(null);
    const leaveTimeoutRef = useRef<number | null>(null);

    const handleDesktopMouseEnter = (label: string) => {
        if (leaveTimeoutRef.current) {
            clearTimeout(leaveTimeoutRef.current);
            leaveTimeoutRef.current = null;
        }
        setOpenDesktopDropdown(label);
    };

    const handleDesktopMouseLeave = () => {
        leaveTimeoutRef.current = window.setTimeout(() => {
            setOpenDesktopDropdown(null);
        }, 150);
    };

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen((prev) => !prev);
        if (isMobileMenuOpen) setOpenMobileSubmenu(null);
    };

    const toggleMobileSubmenu = (label: string) => {
        setOpenMobileSubmenu((prev) => (prev === label ? null : label));
    };

    const renderDesktopNavItem = (item: ClientNavItem) => {
        if (item.children) {
            return (
                <div
                    key={item.label}
                    className="relative"
                    onMouseEnter={() => handleDesktopMouseEnter(item.label)}
                    onMouseLeave={handleDesktopMouseLeave}
                >
                    <button className="flex items-center px-3 py-2 font-medium uppercase text-gray-600 hover:text-gray-900 focus:outline-none">
                        {item.label}
                        <ChevronDown className="ml-1 h-4 w-4" />
                    </button>
                    {openDesktopDropdown === item.label && (
                        <div className="ring-brand-primary absolute left-0 z-50 mt-5 w-48 bg-white shadow-lg ring-1 ring-opacity-5">
                            <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                                {item.children.map((child) => (
                                    <Link
                                        key={child.label}
                                        href={child.href ? route(child.href) : '#'}
                                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                                        role="menuitem"
                                    >
                                        {child.label}
                                    </Link>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            );
        } else {
            return !item.isStaticLink ? (
                <Link
                    key={item.label}
                    href={item.href ? route(item.href) : '#'}
                    className="px-3 py-2 font-medium uppercase text-gray-600 hover:text-gray-900"
                >
                    {item.label}
                </Link>
            ) : (
                <a key={item.label} href={item.href ? item.href : '#'} className="px-3 py-2 font-medium uppercase text-gray-600 hover:text-gray-900">
                    {item.label}
                </a>
            );
        }
    };

    const renderMobileNavItem = (item: ClientNavItem) => {
        if (item.children) {
            const isOpen = openMobileSubmenu === item.label;
            return (
                <div key={item.label} className="py-2">
                    <button
                        onClick={() => toggleMobileSubmenu(item.label)}
                        className="flex w-full items-center justify-between px-4 py-2 text-base uppercase text-gray-700 focus:outline-none"
                    >
                        <span>{item.label}</span>
                        <ChevronDown className={`h-5 w-5 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                    </button>
                    {isOpen && (
                        <div className="ml-4 border-l border-gray-200 py-1">
                            {item.children.map((child) => (
                                <Link
                                    key={child.label}
                                    href={child.href ? route(child.href) : '#'}
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className="block px-4 py-2 text-sm uppercase text-gray-600 hover:bg-gray-100"
                                >
                                    {child.label}
                                </Link>
                            ))}
                        </div>
                    )}
                </div>
            );
        } else {
            return !item.isStaticLink ? (
                <Link
                    key={item.label}
                    href={item.href ? route(item.href) : '#'}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block px-4 py-2 text-base uppercase text-gray-700 hover:bg-gray-100"
                >
                    {item.label}
                </Link>
            ) : (
                <a
                    key={item.label}
                    href={item.href ? item.href : '#'}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block px-4 py-2 text-base uppercase text-gray-700 hover:bg-gray-100"
                >
                    {item.label}
                </a>
            );
        }
    };

    return (
        <header className="bg-white py-4 shadow-sm">
            <div className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
                <Link href={route('client.home')} className="flex-shrink-0">
                    <img src="/logo_text.webp" alt="Wiliam Edison" style={{ width: '80px' }} />
                </Link>

                <nav className="hidden items-center space-x-2 md:flex">{clientNavItems.map(renderDesktopNavItem)}</nav>

                <div className="md:hidden">
                    <button onClick={toggleMobileMenu} className="text-gray-600 hover:text-gray-900 focus:outline-none">
                        <Menu className="h-8 w-8" />
                    </button>
                </div>
            </div>

            {isMobileMenuOpen && (
                <div className="fixed inset-0 z-50 bg-white">
                    <div className="flex justify-end p-4">
                        <button onClick={toggleMobileMenu} className="text-gray-600 hover:text-gray-900 focus:outline-none">
                            <X className="h-8 w-8" />
                        </button>
                    </div>
                    <nav className="flex flex-col p-4">{clientNavItems.map(renderMobileNavItem)}</nav>
                </div>
            )}
        </header>
    );
}
