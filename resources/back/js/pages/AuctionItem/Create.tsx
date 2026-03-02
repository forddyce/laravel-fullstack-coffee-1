import AuctionItemForm from '@/back/js/components/Forms/AuctionItemForm';
import AuthenticatedLayout from '@/back/js/layouts/AuthenticatedLayout';
import { PageProps } from '@inertiajs/core';
import { Head, usePage } from '@inertiajs/react';
import { Season } from 'types';

interface AuctionItemCreateProps extends PageProps {
    availableSeasons: Season[];
}

export default function AuctionItemCreate() {
    const { availableSeasons } = usePage<AuctionItemCreateProps>().props;

    return (
        <AuthenticatedLayout header={<p className="text-xl font-semibold leading-tight text-gray-800">Create New Auction Item</p>}>
            <Head title="Create Auction Item" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <AuctionItemForm availableSeasons={availableSeasons} />
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
