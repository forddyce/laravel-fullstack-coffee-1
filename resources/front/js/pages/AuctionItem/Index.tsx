import ClientLayout from '@/front/js/layouts/ClientLayout';
import { Head, Link, usePage } from '@inertiajs/react';
import type { PageProps as BasePageProps } from '@inertiajs/core';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { FaWhatsapp } from 'react-icons/fa';
import type { AuctionItem, Season } from 'types';
import { whatsappLink } from '../../utils/misc';

interface PageProps extends BasePageProps {
    seasonSlug?: string;
    activeSeasons: Season[];
}

export default function AuctionItemIndexPage() {
    const { seasonSlug, activeSeasons } = usePage<PageProps>().props;

    const [auctionItems, setAuctionItems] = useState<AuctionItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const currentSeason = seasonSlug ? activeSeasons.find((s) => s.slug === seasonSlug) : null;

    useEffect(() => {
        setLoading(true);
        setAuctionItems([]);

        const fetchAuctionItems = async () => {
            try {
                const params: Record<string, string | number> = { perPage: 999 };
                if (seasonSlug) params.season = seasonSlug;

                const response = await axios.get(route('api.client.auction-items.index'), { params });
                setAuctionItems(response.data.data);
                setLoading(false);
            } catch (err) {
                setError('Failed to load auction items.');
                setLoading(false);
                console.error('API Error:', err);
            }
        };

        fetchAuctionItems();
    }, [seasonSlug]);

    const pageTitle = currentSeason
        ? `WE Kopi Kolaborasi ${currentSeason.title} - WE Coffee Roasters`
        : 'WE Kopi Kolaborasi - WE Coffee Roasters';

    const heading = currentSeason
        ? `Data Peserta Lelang WE Kopi Kolaborasi — ${currentSeason.title}`
        : 'Data Peserta Lelang WE Kopi Kolaborasi';

    return (
        <ClientLayout>
            <Head title={pageTitle} />
            <div className="py-8">
                <div className="mx-auto max-w-6xl rounded-lg bg-white p-6 px-4 sm:px-6 lg:px-8">
                    <h1 className="title-underline mb-6 text-center text-4xl font-bold text-gray-900">{heading}</h1>
                    <div className="static-content max-w-none leading-relaxed text-gray-700">
                        <div className="mb-8 text-center">
                            <a
                                href={whatsappLink}
                                target="_blank"
                                className="bg-brand-primary inline-flex items-center rounded-full px-6 py-3 text-lg font-semibold uppercase text-white shadow-md transition duration-300 ease-in-out hover:bg-red-500"
                            >
                                <FaWhatsapp size={18} className="mr-2" /> WhatsApp
                            </a>
                        </div>

                        {loading ? (
                            <div className="text-center text-gray-500">Loading auction items...</div>
                        ) : error ? (
                            <div className="text-center text-red-600">{error}</div>
                        ) : auctionItems.length === 0 ? (
                            <div className="text-center text-gray-500">No auction items found for this collaboration.</div>
                        ) : (
                            <div className="overflow-x-auto border border-gray-200 shadow-md">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-brand-primary">
                                        <tr>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-bold uppercase tracking-wider text-white">
                                                KODE KEMASAN
                                            </th>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-bold uppercase tracking-wider text-white">
                                                JENIS
                                            </th>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-bold uppercase tracking-wider text-white">
                                                ORIGIN
                                            </th>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-bold uppercase tracking-wider text-white">
                                                PROSES PASCA PANEN
                                            </th>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-bold uppercase tracking-wider text-white">
                                                PETANI/PROSESOR
                                            </th>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-bold uppercase tracking-wider text-white">
                                                SKOR
                                            </th>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-bold uppercase tracking-wider text-white">
                                                HARGA AWAL LELANG (PER KG)
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-200">
                                        {auctionItems &&
                                            auctionItems.map((item) => (
                                                <tr key={item.id} className="odd:bg-white even:bg-gray-200 hover:bg-amber-50">
                                                    <td className="text-brand-primary whitespace-nowrap px-6 py-4 text-sm font-medium">
                                                        <Link href={route('client.auction-items.show', item.slug)} className="hover:underline">
                                                            {item.title}
                                                        </Link>
                                                    </td>
                                                    <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-700">{item.info?.type || 'N/A'}</td>
                                                    <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-700">
                                                        {item.info?.origin || 'N/A'}
                                                    </td>
                                                    <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-700">
                                                        {item.info?.process || 'N/A'}
                                                    </td>
                                                    <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-700">
                                                        {item.info?.farmer || 'N/A'}
                                                    </td>
                                                    <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-700">{item.info?.score || 'N/A'}</td>
                                                    <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-700">
                                                        Rp. {item.info?.auction_price ? item.info.auction_price.toLocaleString('id-ID') : 'N/A'}
                                                    </td>
                                                </tr>
                                            ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </ClientLayout>
    );
}
