import AuctionItemForm from '@/back/js/components/Forms/AuctionItemForm';
import AuthenticatedLayout from '@/back/js/layouts/AuthenticatedLayout';
import { PageProps } from '@inertiajs/core';
import { Head, usePage } from '@inertiajs/react';
import type { AuctionItem } from 'types';

interface AuctionItemEditProps extends PageProps {
    auctionItem: AuctionItem;
}

export default function AuctionItemEdit() {
    const { auctionItem } = usePage<AuctionItemEditProps>().props;

    return (
        <AuthenticatedLayout header={<p className="text-xl font-semibold leading-tight text-gray-800">Edit Auction Item: {auctionItem.title}</p>}>
            <Head title={`Edit Auction Item: ${auctionItem.title}`} />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <AuctionItemForm auctionItem={auctionItem} />
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
