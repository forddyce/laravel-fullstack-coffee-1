import { Link } from '@inertiajs/react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useEffect, useState } from 'react';

interface Slide {
    id: number;
    imageSrc: string;
    mobileImageSrc: string;
    buttonText: string;
    buttonHref: string;
    isInertiaRoute?: boolean;
}

interface HeroSliderProps {
    autoPlayInterval?: number;
}

const slides: Slide[] = [
    {
        id: 1,
        imageSrc: '/images/slides/slide-01.webp',
        mobileImageSrc: '/images/slides/slide-01-mobile.png',
        buttonText: 'See Catalog',
        buttonHref: '/product/roasting-machine-w-11',
    },
    {
        id: 2,
        imageSrc: '/images/slides/slide-02.webp',
        mobileImageSrc: '/images/slides/slide-02-mobile.png',
        buttonText: 'Learn More',
        buttonHref: 'client.static.we-coffee-academy',
        isInertiaRoute: true,
    },
    {
        id: 3,
        imageSrc: '/images/slides/slide-03.webp',
        mobileImageSrc: '/images/slides/slide-03-mobile.png',
        buttonText: 'See Catalog',
        buttonHref: '/product-category/we-selective',
    },
];

export default function HeroSlider({ autoPlayInterval = 5000 }: HeroSliderProps) {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [isMobileView, setIsMobileView] = useState(false);

    const checkMobileView = () => {
        setIsMobileView(window.innerWidth < 768);
    };

    useEffect(() => {
        checkMobileView();
        window.addEventListener('resize', checkMobileView);
        return () => window.removeEventListener('resize', checkMobileView);
    }, []);

    const goToNextSlide = () => {
        setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    };

    const goToPrevSlide = () => {
        setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
    };

    // useEffect(() => {
    //     if (slides.length > 1 && autoPlayInterval > 0) {
    //         const timer = setInterval(goToNextSlide, autoPlayInterval);
    //         return () => clearInterval(timer);
    //     }
    // }, [slides.length, autoPlayInterval]);

    if (slides.length === 0) {
        return <div className="py-10 text-center">No slides to display.</div>;
    }

    const currentSlideData = slides[currentSlide];
    const backgroundImage = isMobileView ? currentSlideData.mobileImageSrc : currentSlideData.imageSrc;

    return (
        <section className="relative h-[50vh] w-full overflow-hidden">
            <div
                className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-opacity duration-1000 ease-in-out md:bg-contain"
                style={{ backgroundImage: `url(${backgroundImage})` }}
            >
                <div className="absolute inset-0 md:bg-black/10"></div>
            </div>
            <div className="relative z-10 flex h-full flex-col items-center justify-end px-4 pb-10 text-center text-white md:justify-center md:pb-0">
                <Link
                    href={currentSlideData.isInertiaRoute ? route(currentSlideData.buttonHref) : currentSlideData.buttonHref}
                    className="bg-brand-primary hover:bg-brand-primary/50 px-8 py-3 text-sm font-bold uppercase text-white shadow-lg transition duration-300 ease-in-out md:text-lg"
                >
                    {currentSlideData.buttonText}
                </Link>
            </div>
            <button
                onClick={goToPrevSlide}
                className="bg-brand-primary hover:bg-brand-primary/50 absolute bottom-9 left-4 z-20 h-14 w-14 rounded-full bg-opacity-20 p-3 transition-all hover:cursor-pointer focus:outline-none md:top-1/2 md:-translate-y-1/2"
                aria-label="Previous Slide"
            >
                <ChevronLeft size={32} className="text-white" />
            </button>
            <button
                onClick={goToNextSlide}
                className="bg-brand-primary hover:bg-brand-primary/50 absolute bottom-9 right-4 z-20 h-14 w-14 rounded-full p-3 transition-all hover:cursor-pointer focus:outline-none md:top-1/2 md:-translate-y-1/2"
                aria-label="Next Slide"
            >
                <ChevronRight size={32} className="text-white" />
            </button>
        </section>
    );
}
