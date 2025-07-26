import { Link } from '@inertiajs/react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useEffect, useState } from 'react';

interface Slide {
    id: number;
    imageSrc: string;
    buttonText: string;
    buttonHref: string;
    isInertiaRoute?: boolean;
}

interface HeroSliderProps {
    autoPlayInterval?: number;
}

const slides: Slide[] = [
    { id: 1, imageSrc: '/images/slides/slide-01.webp', buttonText: 'See Catalog', buttonHref: '/product/roasting-machine-w-11' },
    {
        id: 2,
        imageSrc: '/images/slides/slide-02.webp',
        buttonText: 'Learn More',
        buttonHref: 'client.static.we-coffee-academy',
        isInertiaRoute: true,
    },
    { id: 3, imageSrc: '/images/slides/slide-03.webp', buttonText: 'See Catalog', buttonHref: '/product-category/we-selective' },
];

export default function HeroSlider({ autoPlayInterval = 5000 }: HeroSliderProps) {
    const [currentSlide, setCurrentSlide] = useState(0);

    const goToNextSlide = () => {
        setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    };

    const goToPrevSlide = () => {
        setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
    };

    useEffect(() => {
        if (slides.length > 1 && autoPlayInterval > 0) {
            const timer = setInterval(goToNextSlide, autoPlayInterval);
            return () => clearInterval(timer);
        }
    }, [slides.length, autoPlayInterval]);

    if (slides.length === 0) {
        return <div className="py-10 text-center">No slides to display.</div>;
    }

    const currentSlideData = slides[currentSlide];

    return (
        <section className="relative hidden h-[50vh] w-full overflow-hidden md:block">
            <div
                className="absolute inset-0 bg-contain bg-center bg-no-repeat transition-opacity duration-1000 ease-in-out"
                style={{ backgroundImage: `url(${currentSlideData.imageSrc})` }}
            >
                <div className="absolute inset-0 bg-black/25"></div>
            </div>
            <div className="relative z-10 flex h-full flex-col items-center justify-center px-4 text-center text-white">
                <Link
                    href={currentSlideData.isInertiaRoute ? route(currentSlideData.buttonHref) : currentSlideData.buttonHref}
                    className="bg-brand-primary hover:bg-brand-primary/50 px-8 py-3 text-lg font-bold uppercase text-white shadow-lg transition duration-300 ease-in-out"
                >
                    {currentSlideData.buttonText}
                </Link>
            </div>
            <button
                onClick={goToPrevSlide}
                className="bg-brand-primary hover:bg-brand-primary/50 absolute left-4 top-1/2 z-20 -translate-y-1/2 rounded-full bg-opacity-20 p-3 transition-all hover:cursor-pointer focus:outline-none"
                aria-label="Previous Slide"
            >
                <ChevronLeft size={32} className="text-white" />
            </button>
            <button
                onClick={goToNextSlide}
                className="bg-brand-primary hover:bg-brand-primary/50 absolute right-4 top-1/2 z-20 -translate-y-1/2 rounded-full p-3 transition-all hover:cursor-pointer focus:outline-none"
                aria-label="Next Slide"
            >
                <ChevronRight size={32} className="text-white" />
            </button>
        </section>
    );
}
