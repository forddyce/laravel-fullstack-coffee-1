import { Link } from '@inertiajs/react';
import axios from 'axios';
import { useEffect, useState } from 'react';
import type { Product } from 'types';

const featuredProductIds = [118, 92, 100];

export default function ProductCTASection() {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchFeaturedProducts = async () => {
            if (featuredProductIds.length === 0) {
                setLoading(false);
                return;
            }

            try {
                const params = new URLSearchParams();
                featuredProductIds.forEach((id) => params.append('ids[]', id.toString()));
                const response = await axios.get(route('client.products.by-ids') + `?${params.toString()}`);
                setProducts(response.data);
                setLoading(false);
            } catch (err) {
                setError('Failed to load featured products.');
                setLoading(false);
                console.error('API Error:', err);
            }
        };

        fetchFeaturedProducts();
    }, []);

    if (loading) {
        return <section className="bg-gray-50 py-16 text-center">Loading products...</section>;
    }

    if (error) {
        return <section className="bg-gray-50 py-16 text-center text-red-600">{error}</section>;
    }

    if (products && products.length === 0) {
        return <section className="bg-gray-50 py-16 text-center text-gray-500">No featured products to display.</section>;
    }

    return (
        <section className="bg-gray-50 py-16">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <h2 className="title-underline mb-12 text-center text-4xl font-bold text-gray-900">Products</h2>
                <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
                    {products &&
                        products.map((product) => (
                            <div
                                key={product.id}
                                className="flex flex-col items-center overflow-hidden rounded-lg bg-white p-6 text-center shadow-md"
                            >
                                <div className="relative mb-4 aspect-square w-full">
                                    <img
                                        src={product.primary_image || 'https://via.placeholder.com/200x200?text=No+Image'}
                                        alt={product.title}
                                        className="absolute inset-0 h-full w-full object-contain"
                                        onError={(e) => {
                                            e.currentTarget.onerror = null;
                                            e.currentTarget.src = 'https://via.placeholder.com/200x200?text=Image+Error';
                                        }}
                                    />
                                </div>
                                <h3 className="mb-2 text-xl font-bold text-gray-900">{product.title}</h3>
                                <div className="mb-4 w-1/2 border-b-2 border-dotted border-gray-300 pb-2"></div>
                                <Link
                                    href={route('client.products.show', product.slug)}
                                    className="bg-brand-primary mt-auto inline-block rounded-md px-6 py-2 text-sm font-medium uppercase text-white transition duration-300 ease-in-out hover:bg-red-700"
                                >
                                    View Product
                                </Link>
                            </div>
                        ))}
                </div>

                {/* View Catalog Button (below the cards) */}
                <div className="mt-12 text-center">
                    <Link
                        href={route('client.products.index')}
                        className="bg-brand-primary inline-block rounded-md px-8 py-3 text-lg font-medium uppercase text-white shadow-lg transition duration-300 ease-in-out hover:bg-red-700"
                    >
                        View Catalog
                    </Link>
                </div>
            </div>
        </section>
    );
}
