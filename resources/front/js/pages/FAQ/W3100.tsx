import Accordion from '@/front/js/components/Accordion';
import ClientLayout from '@/front/js/layouts/ClientLayout';

import { w3100Items as items } from '@/front/js/utils/faq';
import { Head } from '@inertiajs/react';

export default function FaqW3100Page() {
    return (
        <ClientLayout>
            <Head title={'FAQ - W3100 / W3100 IR / W6100 / W6100 IR / W12k IR - WE Coffee Roasters'} />
            <div className="py-8">
                <div className="mx-auto max-w-4xl rounded-lg bg-white p-6 px-4 sm:px-6 lg:px-8">
                    <h1 className="title-underline mb-6 text-center text-4xl font-bold text-gray-900">
                        W3100 / W3100 IR / W6100 / W6100 IR / W12k IR
                    </h1>
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
