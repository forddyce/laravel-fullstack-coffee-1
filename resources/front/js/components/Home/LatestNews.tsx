import { Link } from '@inertiajs/react';
import axios from 'axios';
import { ArrowRight } from 'lucide-react';
import { useEffect, useState } from 'react';
import type { Blog } from 'types';

export default function LatestNewsSection() {
    const [latestBlogs, setLatestBlogs] = useState<Blog[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchLatestBlogs = async () => {
            try {
                const response = await axios.get(route('client.blogs.latest'));
                setLatestBlogs(response.data);
                setLoading(false);
            } catch (err) {
                setError('Failed to load latest news.');
                setLoading(false);
                console.error('API Error:', err);
            }
        };

        fetchLatestBlogs();
    }, []);

    if (loading) {
        return <section className="bg-white py-16 text-center">Loading latest news...</section>;
    }

    if (error) {
        return <section className="bg-white py-16 text-center text-red-600">{error}</section>;
    }

    if (latestBlogs.length === 0) {
        return <section className="bg-white py-16 text-center text-gray-500">No recent news to display.</section>;
    }

    return (
        <section className="bg-white py-16">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <Link href={route('client.blogs.index')}>
                    <h2 className="hover:text-brand-primary mb-12 text-center text-4xl font-bold text-gray-900">Latest News</h2>
                </Link>

                <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                    {latestBlogs.map((blog) => (
                        <div key={blog.id} className="flex flex-col overflow-hidden rounded-lg bg-white shadow-md">
                            <div className="relative aspect-video overflow-hidden">
                                <Link href={route('client.blogs.show', blog.slug)}>
                                    <img
                                        src={blog.featured_image || 'https://via.placeholder.com/600x400?text=No+Image'}
                                        alt={blog.title}
                                        className="absolute inset-0 h-full w-full object-cover"
                                        onError={(e) => {
                                            e.currentTarget.onerror = null;
                                            e.currentTarget.src = 'https://via.placeholder.com/600x400?text=Image+Load+Error';
                                        }}
                                    />
                                </Link>
                            </div>

                            <div className="flex flex-grow flex-col p-6">
                                <Link href={route('client.blogs.show', blog.slug)}>
                                    <h3 className="mb-2 flex-grow text-xl font-bold text-gray-900">{blog.title}</h3>
                                </Link>
                                <p className="mb-4 line-clamp-3 text-sm leading-relaxed text-gray-700">
                                    {blog.summary || blog.content?.replace(/<[^>]*>?/gm, '').substring(0, 150) + '...' || 'No summary available.'}
                                </p>

                                <div className="mt-auto flex items-center justify-between border-t border-gray-100 pt-4">
                                    <span className="text-xs text-gray-500">
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
                                        className="text-brand-primary flex items-center text-sm font-semibold transition-colors hover:text-red-700"
                                    >
                                        <ArrowRight className="ml-1 h-4 w-4" />
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
