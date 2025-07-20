import { Link } from '@inertiajs/react';
import { ReactNode } from 'react';

interface FeatureCardData {
    id: number;
    icon: ReactNode;
    title: string;
    description: string;
    buttonText: string;
    buttonHref: string;
}

const features: FeatureCardData[] = [
    {
        id: 1,
        icon: <img src="/images/home/icon_coffee_roaster.webp" alt="Reliable Coffee Roaster Icon" className="h-20 w-20" />,
        title: 'Reliable Coffee Roaster',
        description: 'Kami fokus mengembangkan mesin sangrai kopi yang dapat diandalkan dan berkualitas yang merupakan karya anak bangsa.',
        buttonText: 'View Collections',
        buttonHref: 'client.products.index',
    },
    {
        id: 2,
        icon: <img src="/images/home/icon_equitable_education.webp" alt="Equitable Education Icon" className="h-20 w-20" />,
        title: 'Equitable Education',
        description:
            'Mendukung edukasi kopi di berbagai daerah Indonesia untuk memberi bekal pengetahuan yang dapat berguna dan praktis di aplikasikan.',
        buttonText: 'View More',
        buttonHref: 'client.static.coffee-lab',
    },
    {
        id: 3,
        icon: <img src="/images/home/icon_local_community.webp" alt="Local Community Icon" className="h-20 w-20" />,
        title: 'Local Community',
        description: 'WE merangkul komunitas yang bergerak di bidang kopi dengan tujuan untuk bersama memajukan industri kopi Indonesia.',
        buttonText: 'Read More',
        buttonHref: 'client.static.about-us',
    },
    {
        id: 4,
        icon: <img src="/images/home/icon_collab.webp" alt="Kolaborasi Icon" className="h-20 w-20" />,
        title: 'Kolaborasi',
        description:
            'Di WE Coffee, melalui koneksi yang luas dan almamater dari Coffee Academy, beliau memiliki inisiatif untuk menciptakan Gerakan yang bertujuan, baik secara internal maupun eksternal, untuk mencapai tujuan dan memecahkan masalah melalui kolaborasi berbagai, keterampilan, kekuatan dan perspektif di Industri Kopi Indonesia.',
        buttonText: 'Read More',
        buttonHref: 'client.static.collaborations',
    },
];

export default function FeatureSection() {
    return (
        <section className="bg-white py-16">
            <div className="mx-auto">
                <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
                    {features.map((feature) => (
                        <div key={feature.id} className="flex flex-col items-center rounded-lg bg-white p-6 text-center shadow-md">
                            <div className="text-brand-primary mb-4">{feature.icon}</div>
                            <h3 className="text-brand-primary mb-3 text-xl font-bold">{feature.title}</h3>
                            <p className="mb-6 flex-grow text-sm leading-relaxed text-gray-700">{feature.description}</p>
                            <Link
                                href={feature.buttonHref}
                                className="bg-brand-primary inline-block rounded-md px-6 py-2 text-sm font-medium uppercase text-white transition duration-300 ease-in-out hover:bg-red-700"
                            >
                                {feature.buttonText}
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
