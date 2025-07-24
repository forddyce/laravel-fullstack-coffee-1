import ClientLayout from '@/front/js/layouts/ClientLayout';
import { Head } from '@inertiajs/react';

const items = [
    '/images/factory/1.webp',
    '/images/factory/2.webp',
    '/images/factory/3.webp',
    '/images/factory/4.webp',
    '/images/factory/5.webp',
    '/images/factory/6.webp',
    '/images/factory/7.webp',
    '/images/factory/8.webp',
    '/images/factory/9.webp',
    '/images/factory/10.webp',
    '/images/factory/11.webp',
];

export default function AboutFactoryPage() {
    return (
        <ClientLayout>
            <Head title={'Our Factory - WE Coffee Roasters'} />
            <div className="py-8">
                <div className="mx-auto max-w-4xl rounded-lg bg-white p-6 px-4 sm:px-6 lg:px-8">
                    <h1 className="title-underline mb-6 text-center text-4xl font-bold text-gray-900">Our Factory</h1>
                    <div className="prose static-content max-w-none leading-relaxed text-gray-700">
                        <div className="flex flex-wrap">
                            {items.map((item, index) => {
                                return (
                                    <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/2 xl:w-1/2" key={`factory-${index}`}>
                                        <img src={item} alt="Factory Image" className="h-auto w-full rounded object-cover shadow-md" />
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </ClientLayout>
    );
}
