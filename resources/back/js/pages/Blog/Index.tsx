import Button from '@/back/js/components/FormElements/Button';
import TextInput from '@/back/js/components/FormElements/TextInput';
import Pagination from '@/back/js/components/Pagination';
import AuthenticatedLayout from '@/back/js/layouts/AuthenticatedLayout';
import { PageProps } from '@inertiajs/core';
import { Head, Link, router, usePage } from '@inertiajs/react';
import { useEffect, useRef, useState } from 'react';
import type { Blog } from 'types';
import { useNotifications } from '../../hooks/useNotification';

interface BlogIndexProps extends PageProps {
    blogs: {
        data: Blog[];
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

export default function BlogIndex() {
    const { blogs, filters } = usePage<BlogIndexProps>().props;
    const { success, error, confirm } = useNotifications();

    const [search, setSearch] = useState(filters.search || '');
    const debounceTimeoutRef = useRef<number | null>(null);

    useEffect(() => {
        if (debounceTimeoutRef.current) {
            clearTimeout(debounceTimeoutRef.current);
        }

        debounceTimeoutRef.current = window.setTimeout(() => {
            router.get(
                route('admin.blogs.index'),
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
            'Are you sure you want to delete this blog post? This action cannot be undone.',
            () => {
                router.delete(route('admin.blogs.destroy', id), {
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
        <AuthenticatedLayout header={<p className="text-xl font-semibold leading-tight text-gray-800">Blog Posts</p>}>
            <Head title="Blog Posts" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <div className="mb-4 flex items-center justify-between">
                                <Link href={route('admin.blogs.create')}>
                                    <Button variant="primary">Add New Blog Post</Button>
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
                                                Published Date
                                            </th>
                                            <th scope="col" className="relative px-6 py-3">
                                                <span className="sr-only">Actions</span>
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-200 bg-white">
                                        {blogs.data.length > 0 ? (
                                            blogs.data.map((blog) => (
                                                <tr key={blog.id}>
                                                    <td className="px-6 py-4 text-sm font-medium text-gray-900">{blog.title}</td>
                                                    <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                                                        {blog.is_active ? 'Yes' : 'No'}
                                                    </td>
                                                    <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                                                        {blog.published_date ? new Date(blog.published_date).toLocaleDateString() : 'N/A'}
                                                    </td>
                                                    <td className="whitespace-nowrap px-6 py-4 text-right text-sm font-medium">
                                                        <Link
                                                            href={route('admin.blogs.edit', blog.id)}
                                                            className="mr-3 text-indigo-600 hover:text-indigo-900"
                                                        >
                                                            Edit
                                                        </Link>
                                                        <Button onClick={() => handleDelete(blog.id)} variant="danger" className="inline-block">
                                                            Delete
                                                        </Button>
                                                    </td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td colSpan={4} className="px-6 py-4 text-center text-sm text-gray-500">
                                                    No blog posts found.
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>

                            {blogs.meta.links && blogs.meta.links.length > 3 && <Pagination links={blogs.meta.links} filters={filters} />}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
