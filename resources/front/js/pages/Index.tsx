import AboutUsCTA from '@/front/js/components/Home/AboutUsCTA';
import ExperienceCTA from '@/front/js/components/Home/ExperienceCTA';
import FeatureSection from '@/front/js/components/Home/FeatureSection';
import HeroSlider from '@/front/js/components/Home/HeroSlider';
import LatestNews from '@/front/js/components/Home/LatestNews';
import ProductCTASection from '@/front/js/components/Home/ProductCTASection';
import ClientLayout from '@/front/js/layouts/ClientLayout';
import { Head } from '@inertiajs/react';

export default function Index() {
    return (
        <ClientLayout>
            <Head title="WE Coffee Roasters" />
            <HeroSlider />
            <FeatureSection />
            <AboutUsCTA />
            <ProductCTASection />
            <ExperienceCTA />
            <LatestNews />
        </ClientLayout>
    );
}
