import Accordion from '@/front/js/components/Accordion';
import ClientLayout from '@/front/js/layouts/ClientLayout';

import { w60Items as items } from '@/front/js/utils/faq';
import { Head } from '@inertiajs/react';

export default function FaqW60Page() {
    return (
        <ClientLayout>
            <Head title={'FAQ - W 6.0 - WE Coffee Roasters'} />
            <div className="py-8">
                <div className="mx-auto max-w-4xl rounded-lg bg-white p-6 px-4 sm:px-6 lg:px-8">
                    <h1 className="title-underline mb-6 text-center text-4xl font-bold text-gray-900">W 6.0</h1>
                    <div className="static-content prose max-w-none leading-relaxed text-gray-700">
                        {items.map((item, index) => (
                            <Accordion key={index} question={item.title} answer={item.text} />
                        ))}
                    </div>
                </div>
            </div>
        </ClientLayout>
    );
}
