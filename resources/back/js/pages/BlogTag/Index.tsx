import Button from '@/back/js/components/FormElements/Button';
import TextInput from '@/back/js/components/FormElements/TextInput';
import Pagination from '@/back/js/components/Pagination';
import { useNotifications } from '@/back/js/hooks/useNotification';
import AuthenticatedLayout from '@/back/js/layouts/AuthenticatedLayout';
import { PageProps } from '@inertiajs/core';
import { Head, Link, router, usePage } from '@inertiajs/react';
import { useEffect, useRef, useState } from 'react';
import { BlogTag } from 'types';

interface BlogTagIndexProps extends PageProps {
    blogTags: {
        data: BlogTag[];
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

export default function BlogTagIndex() {
    const { blogTags, filters } = usePage<BlogTagIndexProps>().props;
    const { success, error, confirm } = useNotifications();

    const [search, setSearch] = useState(filters.search || '');
    const debounceTimeoutRef = useRef<number | null>(null);

    useEffect(() => {
        if (debounceTimeoutRef.current) {
            clearTimeout(debounceTimeoutRef.current);
        }

        debounceTimeoutRef.current = window.setTimeout(() => {
            router.get(
                route('admin.blog-tags.index'),
                { search },
                {
                    preserveState: true,
                    replace: true,
                    preserveScroll: true,
                },
            );
        }, 300);

        return () => {
            if (debounceTimeoutRef.current) {
                clearTimeout(debounceTimeoutRef.current);
            }
        };
    }, [search]);

    const handleDelete = (id: number) => {
        confirm(
            'Are you sure you want to delete this blog tag? This action cannot be undone.',
            () => {
                router.delete(route('admin.blog-tags.destroy', id), {
                    onSuccess: () => {
                        success('Blog Tag deleted successfully!');
                    },
                    onError: () => {
                        error('Failed to delete blog tag.');
                    },
                });
            },
            () => {
                // onCancel callback (optional)
                // console.log('Delete cancelled.');
            },
        );
    };

    return (
        <AuthenticatedLayout header={<p className="text-xl font-semibold leading-tight text-gray-800">Blog Tags</p>}>
            <Head title="Blog Tags" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <div className="mb-4 flex items-center justify-between">
                                <Link href={route('admin.blog-tags.create')}>
                                    <Button>Add New Tag</Button>
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
                                            <th
                                                scope="col"
                                                className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                                            >
                                                Title
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                                            >
                                                Active
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                                            >
                                                Created At
                                            </th>
                                            <th scope="col" className="relative px-6 py-3">
                                                <span className="sr-only">Actions</span>
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-200 bg-white">
                                        {blogTags.data.length > 0 ? (
                                            blogTags.data.map((tag) => (
                                                <tr key={tag.id}>
                                                    <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">{tag.title}</td>
                                                    <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                                                        {tag.is_active ? 'Yes' : 'No'}
                                                    </td>
                                                    <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">{tag.created_at}</td>
                                                    <td className="whitespace-nowrap px-6 py-4 text-right text-sm font-medium">
                                                        <Link
                                                            href={route('admin.blog-tags.edit', tag.id)}
                                                            className="mr-3 text-indigo-600 hover:text-indigo-900"
                                                        >
                                                            Edit
                                                        </Link>
                                                        <button onClick={() => handleDelete(tag.id)} className="text-red-600 hover:text-red-900">
                                                            Delete
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td colSpan={4} className="px-6 py-4 text-center text-sm text-gray-500">
                                                    No blog tags found.
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>

                            {blogTags.meta.links && blogTags.meta.links.length > 3 && <Pagination links={blogTags.meta.links} filters={filters} />}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
