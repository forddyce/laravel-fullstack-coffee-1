import { router } from '@inertiajs/react';

interface PaginationLink {
    url: string | null;
    label: string;
    active: boolean;
}

interface PaginationProps {
    links: PaginationLink[];
    filters: { [key: string]: any };
}

export default function Pagination({ links, filters }: PaginationProps) {
    if (links.length <= 3) {
        return null;
    }

    const handlePaginationClick = (e: React.MouseEvent, url: string | null) => {
        e.preventDefault();

        if (url) {
            const urlParts = url.split('?');
            const baseUrl = urlParts[0];
            const queryString = urlParts[1];

            const urlParams = new URLSearchParams(queryString);
            const newPage = urlParams.get('page');

            router.get(
                baseUrl,
                { ...filters, page: newPage },
                {
                    preserveState: true,
                    preserveScroll: true,
                    replace: true,
                },
            );
        }
    };

    return (
        <nav className="mt-4 flex justify-center" aria-label="Pagination">
            <div className="relative z-0 inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
                {links.map((link, index) => (
                    <div
                        key={index}
                        className={`relative inline-flex items-center px-4 py-2 text-sm font-medium ${
                            link.active
                                ? 'z-10 bg-indigo-600 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'
                                : 'text-gray-700 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:outline-offset-0'
                        } ${link.url === null ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'} ${index === 0 ? 'rounded-l-md' : ''} ${index === links.length - 1 ? 'rounded-r-md' : ''} ${index > 0 && index < links.length - 1 ? 'border-r border-gray-300' : ''} `}
                    >
                        <a
                            href={link.url || '#'}
                            dangerouslySetInnerHTML={{ __html: link.label }}
                            onClick={(e) => handlePaginationClick(e, link.url)}
                            className="flex h-full w-full items-center justify-center"
                        />
                    </div>
                ))}
            </div>
        </nav>
    );
}
