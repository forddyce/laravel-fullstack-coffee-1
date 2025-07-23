import CatalogCTA from '@/front/js/components/Home/CatalogCTA';
import FeatureSection from '@/front/js/components/Home/FeatureSection';
import HeroSlider from '@/front/js/components/Home/HeroSlider';
import LatestNews from '@/front/js/components/Home/LatestNews';
import MobileHero from '@/front/js/components/Home/MobileHero';
import ClientLayout from '@/front/js/layouts/ClientLayout';
import { Head } from '@inertiajs/react';

export default function Index() {
    return (
        <ClientLayout>
            <Head title="WE Coffee Roasters" />
            <HeroSlider />
            <MobileHero />
            <FeatureSection />
            <CatalogCTA />
            <LatestNews />
        </ClientLayout>
    );
}
