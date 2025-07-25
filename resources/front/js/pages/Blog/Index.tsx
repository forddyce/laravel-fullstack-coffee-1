import TextInput from '@/back/js/components/FormElements/TextInput';
import Pagination from '@/back/js/components/Pagination';
import ClientLayout from '@/front/js/layouts/ClientLayout';
import type { PageProps } from '@inertiajs/core';
import { Head, Link, router, usePage } from '@inertiajs/react';
import { useEffect, useRef, useState } from 'react';
import type { Blog } from 'types';

interface BlogIndexProps extends PageProps {
    blogs: {
        data: Blog[];
        links: { url: string | null; label: string; active: boolean }[];
        current_page: number;
        last_page: number;
        from: number;
        to: number;
        total: number;
        per_page: number;
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

    const [search, setSearch] = useState(filters.search || '');
    const debounceTimeoutRef = useRef<number | null>(null);

    useEffect(() => {
        if (debounceTimeoutRef.current) {
            clearTimeout(debounceTimeoutRef.current);
        }

        debounceTimeoutRef.current = window.setTimeout(() => {
            router.get(
                route('client.blogs.index'),
                { ...filters, search: search },
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

    return (
        <ClientLayout>
            <Head title="Our Blog" />

            <section className="bg-brand-primary py-16 text-center text-white">
                <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
                    <h1 className="mb-4 text-5xl font-extrabold md:text-6xl">Our Blog</h1>
                    <p className="text-lg leading-relaxed md:text-xl">
                        Stay updated with the latest news, insights, and stories from the world of coffee.
                    </p>
                </div>
            </section>

            <section className="bg-gray-50 py-8">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="mb-8 flex items-center justify-end">
                        <div className="w-full md:w-1/3">
                            <TextInput
                                id="blog-search"
                                type="text"
                                name="search"
                                value={search}
                                className="block w-full"
                                placeholder="Search blog posts by title..."
                                onChange={(e) => setSearch(e.target.value)}
                            />
                        </div>
                    </div>

                    {blogs.data.length > 0 ? (
                        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                            {blogs.data.map((blog) => (
                                <div key={blog.id} className="flex flex-col items-center overflow-hidden rounded-lg bg-white text-center shadow-md">
                                    <Link href={route('client.blogs.show', blog.slug)} className="group relative block aspect-video w-full">
                                        <img
                                            src={blog.featured_image || 'https://placehold.co/600x400?text=Image+Not+Found'}
                                            alt={blog.title}
                                            className="absolute inset-0 h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                                            onError={(e) => {
                                                e.currentTarget.onerror = null;
                                                e.currentTarget.src = 'https://placehold.co/600x400?text=Image+Not+Found';
                                            }}
                                        />
                                    </Link>
                                    <div className="flex w-full flex-grow flex-col justify-between p-6">
                                        <h3 className="mb-2 text-xl font-bold text-gray-900">
                                            <Link href={route('client.blogs.show', blog.slug)} className="hover:text-brand-primary transition-colors">
                                                {blog.title}
                                            </Link>
                                        </h3>
                                        <p className="mb-4 line-clamp-3 text-sm leading-relaxed text-gray-700">
                                            {blog.summary ||
                                                blog.content?.replace(/<[^>]*>?/gm, '').substring(0, 100) + '...' ||
                                                'No description available.'}
                                        </p>
                                        <div className="mt-auto flex items-center justify-between border-t border-gray-100 pt-4">
                                            <span className="text-sm text-gray-500">
                                                {blog.published_date
                                                    ? new Date(blog.published_date).toLocaleDateString('en-US', {
                                                          year: 'numeric',
                                                          month: 'short',
                                                          day: 'numeric',
                                                      })
                                                    : 'Date N/A'}
                                            </span>
                                            <Link
                                                href={route('client.blogs.show', blog.slug)}
                                                className="bg-brand-primary inline-flex items-center rounded-md px-4 py-2 text-xs font-medium uppercase text-white transition duration-300 ease-in-out hover:bg-red-700"
                                            >
                                                Read More
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="py-8 text-center text-gray-500">No blog posts found matching your criteria.</p>
                    )}

                    {blogs.meta.links && blogs.meta.links.length > 3 && <Pagination links={blogs.meta.links} filters={filters} />}
                </div>
            </section>
        </ClientLayout>
    );
}
