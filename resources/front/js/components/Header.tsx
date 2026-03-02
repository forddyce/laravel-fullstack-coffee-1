import { Link, usePage } from '@inertiajs/react';
import type { PageProps as BasePageProps } from '@inertiajs/core';
import { ChevronDown, ChevronRight, Menu, X } from 'lucide-react';
import { useRef, useState } from 'react';
import type { Season } from 'types';

interface ClientNavItem {
    label: string;
    href?: string;
    children?: ClientNavItem[];
    isStaticLink?: boolean;
}

function buildNavItems(activeSeasons: Season[]): ClientNavItem[] {
    const seasonChildren: ClientNavItem[] = [
        { label: 'All Seasons', href: 'client.auction-items.index' },
        ...activeSeasons.map((season) => ({
            label: season.title,
            href: route('client.auction-items.by-season', season.slug),
            isStaticLink: true,
        })),
    ];

    return [
        {
            label: 'Menu',
            children: [
                { label: 'Coffee Lab', href: 'client.static.coffee-lab' },
                { label: 'Roast & Brew', href: 'client.static.roast-and-brew' },
                { label: 'WE Coffee Academy', href: 'client.static.we-coffee-academy' },
                { label: 'WE Coffee Collaborations', children: seasonChildren },
            ],
        },
        {
            label: 'Products',
            href: 'client.products.index',
        },
        { label: 'ROI Calculator', href: 'client.static.calculator' },
        { label: 'Blog', href: 'client.blogs.index' },
        {
            label: 'FAQ',
            children: [
                { label: 'W600i/ W600i SE', href: 'client.static.faq.w600i-w600i-se' },
                { label: 'W3100 / W3100 IR / W6100 / W6100 IR / W12k IR', href: 'client.static.faq.w3100-w3100-ir-w6100-w6100-ir-w12k-ir' },
                { label: 'WExSUJI', href: 'client.static.faq.wexsuji' },
                { label: 'W 1.0 & W 1.1', href: 'client.static.faq.w10-w11' },
                { label: 'W 3.0', href: 'client.static.faq.w30' },
                { label: 'W 6.0', href: 'client.static.faq.w60' },
            ],
        },
        {
            label: 'About Us',
            children: [
                { label: 'Our Journey', href: 'client.static.about-us' },
                { label: 'Our Factory', href: 'client.static.our-factory' },
                { label: 'Our Technician', href: 'client.static.our-technician' },
            ],
        },
        { label: 'Forum WE', href: 'https://wiliamedisoncoffee.shop/wiliamedison.coffee/ng9l78j33ndj', isStaticLink: true },
    ];
}

function NavLink({ item }: { item: ClientNavItem }) {
    if (item.isStaticLink) {
        return (
            <a href={item.href ?? '#'} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900" role="menuitem">
                {item.label}
            </a>
        );
    }
    return (
        <Link
            href={item.href ? route(item.href) : '#'}
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
            role="menuitem"
        >
            {item.label}
        </Link>
    );
}

function DesktopDropdownItem({ item, parentLeaveTimeout }: { item: ClientNavItem; parentLeaveTimeout: React.MutableRefObject<number | null> }) {
    const [open, setOpen] = useState(false);
    const leaveRef = useRef<number | null>(null);

    const stopParentClose = () => {
        if (parentLeaveTimeout.current) {
            clearTimeout(parentLeaveTimeout.current);
            parentLeaveTimeout.current = null;
        }
    };

    if (!item.children) {
        return <NavLink item={item} />;
    }

    return (
        <div
            className="relative"
            onMouseEnter={() => {
                stopParentClose();
                if (leaveRef.current) clearTimeout(leaveRef.current);
                setOpen(true);
            }}
            onMouseLeave={() => {
                leaveRef.current = window.setTimeout(() => setOpen(false), 150);
            }}
        >
            <button className="flex w-full items-center justify-between px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 text-left">
                {item.label}
                <ChevronRight className="ml-2 h-3 w-3 flex-shrink-0" />
            </button>
            {open && (
                <div className="absolute left-full top-0 z-50 min-w-[200px] bg-white shadow-lg ring-1 ring-black ring-opacity-5">
                    {item.children.map((child) => (
                        <NavLink key={child.label} item={child} />
                    ))}
                </div>
            )}
        </div>
    );
}

export default function ClientHeader() {
    const { activeSeasons } = usePage<BasePageProps & { activeSeasons: Season[] }>().props;
    const clientNavItems = buildNavItems(activeSeasons ?? []);

    const [openDesktopDropdown, setOpenDesktopDropdown] = useState<string | null>(null);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [openMobileSubmenu, setOpenMobileSubmenu] = useState<string | null>(null);
    const [openMobileNested, setOpenMobileNested] = useState<string | null>(null);
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
        if (isMobileMenuOpen) {
            setOpenMobileSubmenu(null);
            setOpenMobileNested(null);
        }
    };

    const toggleMobileSubmenu = (label: string) => {
        setOpenMobileSubmenu((prev) => (prev === label ? null : label));
        setOpenMobileNested(null);
    };

    const toggleMobileNested = (label: string) => {
        setOpenMobileNested((prev) => (prev === label ? null : label));
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
                        <div className="absolute left-0 z-50 mt-5 min-w-[200px] bg-white shadow-lg ring-1 ring-brand-primary ring-opacity-5">
                            <div className="py-1" role="menu" aria-orientation="vertical">
                                {item.children.map((child) => (
                                    <DesktopDropdownItem key={child.label} item={child} parentLeaveTimeout={leaveTimeoutRef} />
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            );
        }

        return !item.isStaticLink ? (
            <Link
                key={item.label}
                href={item.href ? route(item.href) : '#'}
                className="px-3 py-2 font-medium uppercase text-gray-600 hover:text-gray-900"
            >
                {item.label}
            </Link>
        ) : (
            <a key={item.label} href={item.href ?? '#'} className="px-3 py-2 font-medium uppercase text-gray-600 hover:text-gray-900">
                {item.label}
            </a>
        );
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
                        <ChevronDown className={`h-5 w-5 flex-shrink-0 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                    </button>
                    {isOpen && (
                        <div className="ml-4 border-l border-gray-200 py-1">
                            {item.children.map((child) => {
                                if (child.children) {
                                    const isNestedOpen = openMobileNested === child.label;
                                    return (
                                        <div key={child.label}>
                                            <button
                                                onClick={() => toggleMobileNested(child.label)}
                                                className="flex w-full items-center justify-between px-4 py-2 text-sm uppercase text-gray-700 hover:bg-gray-100 focus:outline-none"
                                            >
                                                <span>{child.label}</span>
                                                <ChevronDown className={`h-4 w-4 flex-shrink-0 transition-transform ${isNestedOpen ? 'rotate-180' : ''}`} />
                                            </button>
                                            {isNestedOpen && (
                                                <div className="ml-4 border-l border-gray-100 py-1">
                                                    {child.children.map((grandchild) =>
                                                        grandchild.isStaticLink ? (
                                                            <a
                                                                key={grandchild.label}
                                                                href={grandchild.href ?? '#'}
                                                                onClick={() => setIsMobileMenuOpen(false)}
                                                                className="block px-4 py-2 text-sm uppercase text-gray-600 hover:bg-gray-100"
                                                            >
                                                                {grandchild.label}
                                                            </a>
                                                        ) : (
                                                            <Link
                                                                key={grandchild.label}
                                                                href={grandchild.href ? route(grandchild.href) : '#'}
                                                                onClick={() => setIsMobileMenuOpen(false)}
                                                                className="block px-4 py-2 text-sm uppercase text-gray-600 hover:bg-gray-100"
                                                            >
                                                                {grandchild.label}
                                                            </Link>
                                                        ),
                                                    )}
                                                </div>
                                            )}
                                        </div>
                                    );
                                }

                                return child.isStaticLink ? (
                                    <a
                                        key={child.label}
                                        href={child.href ?? '#'}
                                        onClick={() => setIsMobileMenuOpen(false)}
                                        className="block px-4 py-2 text-sm uppercase text-gray-600 hover:bg-gray-100"
                                    >
                                        {child.label}
                                    </a>
                                ) : (
                                    <Link
                                        key={child.label}
                                        href={child.href ? route(child.href) : '#'}
                                        onClick={() => setIsMobileMenuOpen(false)}
                                        className="block px-4 py-2 text-sm uppercase text-gray-600 hover:bg-gray-100"
                                    >
                                        {child.label}
                                    </Link>
                                );
                            })}
                        </div>
                    )}
                </div>
            );
        }

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
                href={item.href ?? '#'}
                onClick={() => setIsMobileMenuOpen(false)}
                className="block px-4 py-2 text-base uppercase text-gray-700 hover:bg-gray-100"
            >
                {item.label}
            </a>
        );
    };

    return (
        <header className="fixed top-0 z-50 w-full bg-white py-4 shadow-sm">
            <div className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
                <Link href={route('client.home')} className="flex-shrink-0">
                    <img src="/logo_text.webp" alt="Wiliam Edison" style={{ width: '80px' }} />
                </Link>

                <nav className="hidden items-center space-x-2 md:flex">{clientNavItems.map(renderDesktopNavItem)}</nav>

                <div className="md:hidden">
                    <button onClick={toggleMobileMenu} className="text-gray-600 hover:text-gray-900 focus:outline-none" aria-label="Open menu">
                        <Menu className="h-8 w-8" />
                    </button>
                </div>
            </div>

            {isMobileMenuOpen && (
                <div className="fixed inset-0 z-50 overflow-y-auto bg-white">
                    <div className="flex justify-end p-4">
                        <button onClick={toggleMobileMenu} className="text-gray-600 hover:text-gray-900 focus:outline-none" aria-label="Close menu">
                            <X className="h-8 w-8" />
                        </button>
                    </div>
                    <nav className="flex flex-col p-4">{clientNavItems.map(renderMobileNavItem)}</nav>
                </div>
            )}
        </header>
    );
}
