import ClientLayout from '@/front/js/layouts/ClientLayout';
import type { PageProps } from '@inertiajs/core';
import { Head, Link, usePage } from '@inertiajs/react';
import { ArrowRight } from 'lucide-react';
import type { Blog } from 'types';

interface BlogShowProps extends PageProps {
    blog: Blog;
    relatedBlogs: Blog[];
}

export default function BlogShow() {
    const { blog, relatedBlogs } = usePage<BlogShowProps>().props;

    return (
        <ClientLayout>
            <Head title={`${blog.title} - WE Coffee Roasters Blog`} />

            <section className="bg-white py-8">
                <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
                    {/* Breadcrumbs */}
                    <nav className="mb-6 text-sm text-gray-500">
                        <ol className="inline-flex list-none p-0">
                            <li className="flex items-center">
                                <Link href={route('client.home')} className="hover:text-gray-700">
                                    Home
                                </Link>
                                <span className="mx-2">/</span>
                            </li>
                            <li className="flex items-center">
                                <Link href={route('client.blogs.index')} className="hover:text-gray-700">
                                    Blog
                                </Link>
                                <span className="mx-2">/</span>
                            </li>
                            <li className="flex items-center font-medium text-gray-900">{blog.title}</li>
                        </ol>
                    </nav>

                    <div className="rounded-lg bg-white p-2 md:p-6">
                        {blog.featured_image && (
                            <div className="mb-6 aspect-video overflow-hidden rounded-lg">
                                <img
                                    src={blog.featured_image}
                                    alt={blog.title}
                                    className="h-full w-full object-cover"
                                    onError={(e) => {
                                        e.currentTarget.onerror = null;
                                        e.currentTarget.src = 'https://via.placeholder.com/1200x600?text=Image+Error';
                                    }}
                                />
                            </div>
                        )}

                        <h1 className="mb-4 text-left text-4xl font-bold text-gray-900">{blog.title}</h1>

                        <div className="mb-6 flex items-center justify-between text-sm text-gray-500">
                            <span>
                                Published:{' '}
                                {blog.published_date
                                    ? new Date(blog.published_date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
                                    : 'N/A'}
                            </span>
                        </div>

                        {blog.content && (
                            <div
                                className="prose-a:text-brand-primary prose-a:hover:text-brand-primary/50 prose mb-6 max-w-none leading-relaxed text-gray-700"
                                dangerouslySetInnerHTML={{ __html: blog.content }}
                            />
                        )}
                        {!blog.content && <p className="mb-6 text-center text-gray-500">No detailed content available for this blog post.</p>}

                        {blog.tags && blog.tags.length > 0 && (
                            <div className="mt-6 flex flex-wrap items-center gap-2 border-t border-gray-100 pt-4">
                                <span className="mr-2 font-semibold text-gray-700">Tags:</span>
                                {blog.tags.map((tag) => (
                                    <Link
                                        key={tag.id}
                                        href={route('client.blog-tags.show', tag.slug)}
                                        className="rounded-full bg-gray-200 px-3 py-1 text-xs text-gray-800 transition-colors duration-200 hover:bg-gray-300"
                                    >
                                        {tag.title}
                                    </Link>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </section>

            {relatedBlogs && relatedBlogs.length > 0 && (
                <section className="bg-gray-50 py-16">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <h2 className="title-underline mb-12 text-center text-4xl font-bold text-gray-900">Related Articles</h2>

                        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                            {relatedBlogs.map((relatedBlog) => (
                                <div key={relatedBlog.id} className="flex flex-col overflow-hidden rounded-lg bg-white shadow-md">
                                    <div className="relative aspect-video overflow-hidden">
                                        <img
                                            src={relatedBlog.featured_image || 'https://via.placeholder.com/600x400?text=No+Image'}
                                            alt={relatedBlog.title}
                                            className="absolute inset-0 h-full w-full object-cover"
                                            onError={(e) => {
                                                e.currentTarget.onerror = null;
                                                e.currentTarget.src = 'https://via.placeholder.com/600x400?text=Image+Error';
                                            }}
                                        />
                                    </div>

                                    <div className="flex flex-grow flex-col p-6">
                                        <h3 className="mb-2 flex-grow text-xl font-bold text-gray-900">
                                            <Link
                                                href={route('client.blogs.show', relatedBlog.slug)}
                                                className="hover:text-brand-primary transition-colors"
                                            >
                                                {relatedBlog.title}
                                            </Link>
                                        </h3>

                                        <p className="mb-4 line-clamp-3 text-sm leading-relaxed text-gray-700">
                                            {relatedBlog.summary ||
                                                relatedBlog.content?.replace(/<[^>]*>?/gm, '').substring(0, 100) + '...' ||
                                                'No summary available.'}
                                        </p>

                                        <div className="mt-auto flex items-center justify-between border-t border-gray-100 pt-4">
                                            <span className="text-xs text-gray-500">
                                                {relatedBlog.published_date
                                                    ? new Date(relatedBlog.published_date).toLocaleDateString('en-US', {
                                                          year: 'numeric',
                                                          month: 'short',
                                                          day: 'numeric',
                                                      })
                                                    : 'Date N/A'}
                                            </span>
                                            <Link
                                                href={route('client.blogs.show', relatedBlog.slug)}
                                                className="text-brand-primary flex items-center text-sm font-semibold transition-colors hover:text-red-700"
                                            >
                                                Read More <ArrowRight className="ml-1 h-4 w-4" />
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            )}
        </ClientLayout>
    );
}
