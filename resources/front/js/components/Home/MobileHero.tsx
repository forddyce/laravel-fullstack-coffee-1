import { Link } from '@inertiajs/react';

const slide = { id: 1, imageSrc: '/images/slides/slide-01.webp', buttonText: 'See Catalog', buttonHref: 'client.products.index' };

export default function MobileHero() {
    return (
        <section className="container relative mx-auto h-[50vh] w-full flex-grow overflow-hidden px-4 py-8 sm:px-6 md:hidden lg:px-8">
            <div className="relative z-10 flex h-full flex-col items-center justify-center px-4 text-center text-white">
                <h1 className="text-brand-primary mb-6 text-3xl font-extrabold drop-shadow-lg">Welcome To WE Coffee</h1>
                <Link
                    href={route(slide.buttonHref)}
                    className="bg-brand-primary hover:bg-brand-primary/50 rounded-lg px-6 py-2 text-base font-semibold text-white shadow-lg transition duration-300 ease-in-out"
                >
                    {slide.buttonText}
                </Link>
            </div>
        </section>
    );
}
