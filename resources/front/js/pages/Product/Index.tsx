import Button from '@/back/js/components/FormElements/Button';
import TextInput from '@/back/js/components/FormElements/TextInput';
import Pagination from '@/back/js/components/Pagination';
import ClientLayout from '@/front/js/layouts/ClientLayout';
import type { PageProps } from '@inertiajs/core';
import { Head, Link, router, usePage } from '@inertiajs/react';
import axios from 'axios';
import { useEffect, useRef, useState } from 'react';
import { Product, ProductCategory } from 'types';

interface ProductIndexProps extends PageProps {
    products: {
        data: Product[];
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
        category_slug?: string;
    };
}

export default function ProductIndex() {
    const { products, filters } = usePage<ProductIndexProps>().props;

    const [search, setSearch] = useState(filters.search || '');
    const [activeCategorySlug, setActiveCategorySlug] = useState(filters.category_slug || 'all');
    const [availableCategories, setAvailableCategories] = useState<ProductCategory[]>([]);
    const debounceTimeoutRef = useRef<number | null>(null);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axios.get(route('api.client.product-categories.index_all'));
                setAvailableCategories(response.data); // Assuming data is nested under 'data'
            } catch (err) {
                console.error('Failed to load categories:', err);
            }
        };
        fetchCategories();
    }, []);

    useEffect(() => {
        if (debounceTimeoutRef.current) {
            clearTimeout(debounceTimeoutRef.current);
        }

        debounceTimeoutRef.current = window.setTimeout(() => {
            router.get(
                route('client.products.index'),
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

    const handleCategoryFilter = (categorySlug: string) => {
        setActiveCategorySlug(categorySlug);
        if (categorySlug === 'all') {
            router.get(
                route('client.products.index'),
                { ...filters, category_slug: undefined },
                {
                    preserveState: true,
                    replace: true,
                    preserveScroll: true,
                },
            );
        } else {
            router.get(
                route('client.product-categories.show', categorySlug),
                { ...filters },
                {
                    preserveState: true,
                    replace: true,
                    preserveScroll: true,
                },
            );
        }
    };

    return (
        <ClientLayout>
            <Head title="Products" />

            <section className="bg-brand-primary py-16 text-center text-white">
                <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
                    <h1 className="mb-4 text-5xl font-extrabold md:text-6xl">Our Catalog</h1>
                    <p className="text-lg leading-relaxed md:text-xl">Explore our wide range of premium coffee beans and roasting machines.</p>
                </div>
            </section>

            <section className="bg-gray-50 py-8">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="mb-8 flex flex-col items-center justify-between gap-4 md:flex-row">
                        <div className="flex flex-wrap justify-center gap-2 md:justify-start">
                            <Button
                                onClick={() => handleCategoryFilter('all')}
                                variant={activeCategorySlug === 'all' ? 'primary' : 'secondary'}
                                className="text-sm uppercase"
                            >
                                All
                            </Button>
                            {availableCategories.map((category) => (
                                <Button
                                    key={category.id}
                                    onClick={() => handleCategoryFilter(category.slug)}
                                    variant={activeCategorySlug === category.slug ? 'primary' : 'secondary'}
                                    className="text-sm uppercase"
                                >
                                    {category.title}
                                </Button>
                            ))}
                        </div>

                        <div className="w-full md:w-1/3">
                            <TextInput
                                id="product-search"
                                type="text"
                                name="search"
                                value={search}
                                className="block w-full"
                                placeholder="Search products by title..."
                                onChange={(e) => setSearch(e.target.value)}
                            />
                        </div>
                    </div>

                    {/* Product List */}
                    {products.data.length > 0 ? (
                        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                            {products.data.map((product) => (
                                <div
                                    key={product.id}
                                    className="flex flex-col items-center overflow-hidden rounded-lg bg-white text-center shadow-md"
                                >
                                    <Link href={route('client.products.show', product.slug)} className="group relative block aspect-square w-full">
                                        <img
                                            src={product.primary_image || 'https://via.placeholder.com/400x400?text=No+Image'}
                                            alt={product.title}
                                            className="absolute inset-0 h-full w-full object-contain transition-transform duration-300 group-hover:scale-105"
                                            onError={(e) => {
                                                e.currentTarget.onerror = null;
                                                e.currentTarget.src = 'https://placehold.co/600x400?text=Image+Not+Found';
                                            }}
                                        />
                                    </Link>
                                    <div className="flex w-full flex-grow flex-col justify-between p-6">
                                        <h3 className="mb-2 text-xl font-bold text-gray-900">
                                            <Link
                                                href={route('client.products.show', product.slug)}
                                                className="hover:text-brand-primary transition-colors"
                                            >
                                                {product.title}
                                            </Link>
                                        </h3>
                                        <p className="mb-4 line-clamp-3 text-sm leading-relaxed text-gray-700">
                                            {product.summary ||
                                                product.content?.replace(/<[^>]*>?/gm, '').substring(0, 100) + '...' ||
                                                'No description available.'}
                                        </p>
                                        <div className="mt-auto flex items-center justify-between border-t border-gray-100 pt-4">
                                            <a
                                                href={`https://wa.link/ovrhsn`}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="inline-flex items-center rounded-md bg-green-500 px-4 py-2 text-xs font-medium uppercase text-white transition duration-300 ease-in-out hover:bg-green-600"
                                            >
                                                Chat With Us
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="py-8 text-center text-gray-500">No products found matching your criteria.</p>
                    )}

                    {/* Pagination */}
                    {products.links && products.links.length > 3 && <Pagination links={products.links} filters={filters} />}
                </div>
            </section>
        </ClientLayout>
    );
}
