import ClientLayout from '@/front/js/layouts/ClientLayout';
import type { PageProps } from '@inertiajs/core';
import { Head, usePage } from '@inertiajs/react';
import type { AuctionItemInfo } from 'types';

interface AuctionItemShowProps extends PageProps {
    auctionItem: {
        id: number;
        title: string;
        slug: string;
        info: AuctionItemInfo;
        content: string | null;
        is_active: boolean;
        created_by: string | null;
        updated_by: string | null;
        created_at: string;
        updated_at: string;
    };
}

export default function AuctionItemShow() {
    const { auctionItem } = usePage<AuctionItemShowProps>().props;

    return (
        <ClientLayout>
            <Head title={`${auctionItem.title} - WE Coffee Roasters`} />

            <div className="py-8">
                <div className="mx-auto max-w-4xl rounded-lg bg-white p-6 px-4 shadow-md sm:px-6 lg:px-8">
                    <h1 className="title-underline mb-6 text-center text-4xl font-bold text-gray-900">{auctionItem.title}</h1>
                    <div className="mb-8 rounded-md bg-gray-50 p-4">
                        <dl className="grid grid-cols-1 gap-x-6 gap-y-4 text-sm sm:grid-cols-2">
                            <div>
                                <dt className="font-medium text-gray-600">Type:</dt>
                                <dd className="font-bold text-gray-900">{auctionItem.info?.type || 'N/A'}</dd>
                            </div>
                            <div>
                                <dt className="font-medium text-gray-600">Score:</dt>
                                <dd className="font-bold text-gray-900">{auctionItem.info?.score || 'N/A'}</dd>
                            </div>
                            <div>
                                <dt className="font-medium text-gray-600">Farmer:</dt>
                                <dd className="font-bold text-gray-900">{auctionItem.info?.farmer || 'N/A'}</dd>
                            </div>
                            <div>
                                <dt className="font-medium text-gray-600">Origin:</dt>
                                <dd className="font-bold text-gray-900">{auctionItem.info?.origin || 'N/A'}</dd>
                            </div>
                            <div>
                                <dt className="font-medium text-gray-600">Process:</dt>
                                <dd className="font-bold text-gray-900">{auctionItem.info?.process || 'N/A'}</dd>
                            </div>
                            <div>
                                <dt className="font-medium text-gray-600">Auction Price:</dt>
                                <dd className="font-bold text-gray-900">
                                    Rp. {auctionItem.info?.auction_price ? auctionItem.info.auction_price.toLocaleString('id-ID') : 'N/A'}
                                </dd>
                            </div>
                        </dl>
                    </div>

                    {auctionItem.content && (
                        <div className="prose max-w-none leading-relaxed text-gray-700" dangerouslySetInnerHTML={{ __html: auctionItem.content }} />
                    )}
                    {!auctionItem.content && <p className="text-center text-gray-500">No additional content available for this auction item.</p>}
                </div>
            </div>
        </ClientLayout>
    );
}
