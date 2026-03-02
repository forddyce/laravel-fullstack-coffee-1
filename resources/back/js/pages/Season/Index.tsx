import Button from '@/back/js/components/FormElements/Button';
import TextInput from '@/back/js/components/FormElements/TextInput';
import Pagination from '@/back/js/components/Pagination';
import { useNotifications } from '@/back/js/hooks/useNotification';
import AuthenticatedLayout from '@/back/js/layouts/AuthenticatedLayout';
import { PageProps } from '@inertiajs/core';
import { Head, Link, router, usePage } from '@inertiajs/react';
import { useEffect, useRef, useState } from 'react';
import { Season } from 'types';

interface SeasonIndexProps extends PageProps {
    seasons: {
        data: Season[];
        links: {
            first: string | null;
            last: string | null;
            prev: string | null;
            next: string | null;
        };
        meta: {
            current_page: number;
            from: number;
            to: number;
            total: number;
            per_page: number;
            links: { url: string | null; label: string; active: boolean }[];
        };
    };
    filters: {
        search?: string;
        sortBy?: string;
        sortOrder?: string;
        perPage?: number;
    };
}

export default function SeasonIndex() {
    const { seasons, filters } = usePage<SeasonIndexProps>().props;
    const { success, error, confirm } = useNotifications();

    const [search, setSearch] = useState(filters.search || '');
    const debounceTimeoutRef = useRef<number | null>(null);

    useEffect(() => {
        if (debounceTimeoutRef.current) clearTimeout(debounceTimeoutRef.current);

        debounceTimeoutRef.current = window.setTimeout(() => {
            router.get(route('admin.seasons.index'), { search }, { preserveState: true, replace: true, preserveScroll: true });
        }, 300);

        return () => {
            if (debounceTimeoutRef.current) clearTimeout(debounceTimeoutRef.current);
        };
    }, [search]);

    const handleDelete = (id: number) => {
        confirm('Are you sure you want to delete this season? Auction items linked to it will have their season unset.', () => {
            router.delete(route('admin.seasons.destroy', id), {
                onSuccess: () => success('Season deleted successfully!'),
                onError: () => error('Failed to delete season.'),
            });
        });
    };

    return (
        <AuthenticatedLayout header={<p className="text-xl font-semibold leading-tight text-gray-800">Seasons</p>}>
            <Head title="Seasons" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <div className="mb-4 flex items-center justify-between">
                                <Link href={route('admin.seasons.create')}>
                                    <Button variant="primary">Add New Season</Button>
                                </Link>
                                <div className="w-1/3">
                                    <TextInput
                                        id="search"
                                        type="text"
                                        name="search"
                                        value={search}
                                        className="block w-full"
                                        placeholder="Search by title..."
                                        onChange={(e) => setSearch(e.target.value)}
                                    />
                                </div>
                            </div>

                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Title</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Sort Order</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Active</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Created At</th>
                                            <th scope="col" className="relative px-6 py-3">
                                                <span className="sr-only">Actions</span>
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-200 bg-white">
                                        {seasons.data.length > 0 ? (
                                            seasons.data.map((season) => (
                                                <tr key={season.id}>
                                                    <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900">{season.title}</td>
                                                    <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">{season.sort_order}</td>
                                                    <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">{season.is_active ? 'Yes' : 'No'}</td>
                                                    <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">{season.created_at}</td>
                                                    <td className="whitespace-nowrap px-6 py-4 text-right text-sm font-medium">
                                                        <Link href={route('admin.seasons.edit', season.id)} className="mr-3 text-indigo-600 hover:text-indigo-900">
                                                            Edit
                                                        </Link>
                                                        <button onClick={() => handleDelete(season.id)} className="text-red-600 hover:text-red-900">
                                                            Delete
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td colSpan={5} className="px-6 py-4 text-center text-sm text-gray-500">
                                                    No seasons found.
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>

                            {seasons.meta.links && seasons.meta.links.length > 3 && (
                                <Pagination links={seasons.meta.links} filters={filters} />
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
