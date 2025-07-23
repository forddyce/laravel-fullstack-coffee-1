import { Link } from '@inertiajs/react';

export default function CatalogCTA() {
    return (
        <section className="bg-brand-primary section-triangle-bottom relative overflow-hidden py-16 text-center text-white">
            <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
                <h2 className="mb-6 text-5xl font-extrabold md:text-6xl">Our Catalog</h2>
                <p className="mb-8 text-lg leading-relaxed md:text-xl">
                    We offer a great variety of popular coffee drinks as well as our own specialty coffees. They are available for order at very
                    affordable prices.
                </p>
            </div>
            <div className="my-10 flex items-center justify-center">
                <Link
                    href={route('client.products.index')}
                    className="bg-brand-primary px-8 py-3 text-lg font-medium uppercase text-white transition duration-300 ease-in-out hover:bg-red-700"
                >
                    View All Products
                </Link>
            </div>
        </section>
    );
}
