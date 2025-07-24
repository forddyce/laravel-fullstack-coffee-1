import ClientLayout from '@/front/js/layouts/ClientLayout';
import type { PageProps } from '@inertiajs/core';
import { Head, Link, usePage } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import type { Product } from 'types';

// Define the shape of the props for this page
interface ProductShowProps extends PageProps {
    product: Product;
    relatedProducts: Product[];
}

export default function ProductShow() {
    const { product, relatedProducts } = usePage<ProductShowProps>().props;
    const [mainImage, setMainImage] = useState<string | null>(product.primary_image || product.images[0] || null);

    useEffect(() => {
        setMainImage(product.primary_image || product.images[0] || null);
    }, [product]);

    const handleThumbnailClick = (imageUrl: string) => {
        setMainImage(imageUrl);
    };

    return (
        <ClientLayout>
            <Head title={`${product.title} - WE Coffee Roasters`} />

            <section className="bg-white py-8">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <nav className="mb-6 text-sm text-gray-500">
                        <ol className="inline-flex list-none p-0">
                            <li className="flex items-center">
                                <Link href={route('client.home')} className="hover:text-gray-700">
                                    Home
                                </Link>
                                <span className="mx-2">/</span>
                            </li>
                            <li className="flex items-center">
                                <Link href={route('client.products.index')} className="hover:text-gray-700">
                                    Catalog
                                </Link>
                                <span className="mx-2">/</span>
                            </li>
                            <li className="flex items-center font-medium text-gray-900">{product.title}</li>
                        </ol>
                    </nav>

                    <div className="grid grid-cols-1 gap-8 rounded-lg bg-white p-6 shadow-md md:grid-cols-2">
                        <div className="flex flex-col items-center">
                            <div className="mb-4 flex aspect-square w-full items-center justify-center overflow-hidden rounded-lg border border-gray-200">
                                {mainImage ? (
                                    <img
                                        src={mainImage}
                                        alt={product.title}
                                        className="max-h-full max-w-full object-contain"
                                        onError={(e) => {
                                            e.currentTarget.onerror = null;
                                            e.currentTarget.src = 'https://via.placeholder.com/600x600?text=Image+Error';
                                        }}
                                    />
                                ) : (
                                    <img
                                        src="https://via.placeholder.com/600x600?text=No+Image"
                                        alt="No Image"
                                        className="max-h-full max-w-full object-contain"
                                    />
                                )}
                            </div>

                            {product.images && product.images.length > 0 && (
                                <div className="mt-2 flex flex-wrap justify-center gap-2">
                                    {product.images.map((imgUrl, index) => (
                                        <div
                                            key={index}
                                            className={`flex h-20 w-20 cursor-pointer items-center justify-center overflow-hidden rounded-md border transition-all duration-200 ${mainImage === imgUrl ? 'border-brand-primary ring-brand-primary ring-2' : 'border-gray-200 hover:border-gray-400'}`}
                                            onClick={() => handleThumbnailClick(imgUrl)}
                                        >
                                            <img
                                                src={imgUrl}
                                                alt={`Thumbnail ${index + 1}`}
                                                className="h-full w-full object-cover"
                                                onError={(e) => {
                                                    e.currentTarget.onerror = null;
                                                    e.currentTarget.src = 'https://via.placeholder.com/80x80?text=Error';
                                                }}
                                            />
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        <div className="flex flex-col">
                            <h1 className="mb-4 text-4xl font-bold text-gray-900">{product.title}</h1>
                            {product.specifications && product.specifications.length > 0 && (
                                <div className="mb-6">
                                    <h2 className="mb-2 text-xl font-semibold text-gray-800">Specifications:</h2>
                                    <ul className="list-none space-y-1 p-0 text-sm text-gray-700">
                                        {product.specifications.map((spec, index) => (
                                            <li key={index}>
                                                <span className="font-medium">{spec.name}:</span> {spec.value}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}

                            {product.content && (
                                <div
                                    className="prose mb-6 max-w-none leading-relaxed text-gray-700"
                                    dangerouslySetInnerHTML={{ __html: product.content }}
                                />
                            )}
                            {product.summary && !product.content && <p className="mb-6 text-base leading-relaxed text-gray-700">{product.summary}</p>}
                            {!product.content && !product.summary && <p className="mb-6 text-sm text-gray-500">No detailed description available.</p>}

                            <div className="mt-auto">
                                <a
                                    href={`https://wa.link/ovrhsn`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="bg-brand-primary inline-flex items-center rounded-md px-6 py-3 text-lg font-semibold uppercase text-white shadow-lg transition duration-300 ease-in-out hover:bg-red-700"
                                >
                                    Chat With Us
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {relatedProducts && relatedProducts.length > 0 && (
                <section className="bg-gray-50 py-16">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <h2 className="title-underline mb-12 text-center text-4xl font-bold text-gray-900">Similar Products</h2>

                        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                            {relatedProducts.map((relatedProduct) => (
                                <div
                                    key={relatedProduct.id}
                                    className="flex flex-col items-center overflow-hidden rounded-lg bg-white p-6 text-center shadow-md"
                                >
                                    <Link
                                        href={route('client.products.show', relatedProduct.slug)}
                                        className="group relative mb-4 block aspect-square w-full"
                                    >
                                        <img
                                            src={relatedProduct.primary_image || 'https://via.placeholder.com/200x200?text=No+Image'}
                                            alt={relatedProduct.title}
                                            className="absolute inset-0 h-full w-full object-contain transition-transform duration-300 group-hover:scale-105"
                                            onError={(e) => {
                                                e.currentTarget.onerror = null;
                                                e.currentTarget.src = 'https://via.placeholder.com/200x200?text=Image+Error';
                                            }}
                                        />
                                    </Link>

                                    <h3 className="mb-2 text-xl font-bold text-gray-900">
                                        <Link
                                            href={route('client.products.show', relatedProduct.slug)}
                                            className="hover:text-brand-primary transition-colors"
                                        >
                                            {relatedProduct.title}
                                        </Link>
                                    </h3>

                                    <p className="mb-4 line-clamp-3 text-sm leading-relaxed text-gray-700">
                                        {relatedProduct.summary ||
                                            relatedProduct.content?.replace(/<[^>]*>?/gm, '').substring(0, 100) + '...' ||
                                            'No description available.'}
                                    </p>

                                    <div className="mt-auto">
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
                            ))}
                        </div>
                    </div>
                </section>
            )}
        </ClientLayout>
    );
}
