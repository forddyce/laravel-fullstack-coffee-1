import ClientLayout from '@/front/js/layouts/ClientLayout';
import { Head } from '@inertiajs/react';
import axios from 'axios';
import { useEffect, useState } from 'react';
import type { Agent } from 'types';

export default function RoastAndBrewPage() {
    const [agents, setAgents] = useState<Agent[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchAgents = async () => {
            try {
                const response = await axios.get(route('api.client.agents.index'));
                setAgents(response.data);
                setLoading(false);
            } catch (err) {
                setError('Failed to load agent locations.');
                setLoading(false);
                console.error('API Error:', err);
            }
        };

        fetchAgents();
    }, []);

    if (loading) {
        return <div className="py-8 text-center text-gray-500">Loading agent locations...</div>;
    }

    if (error) {
        return <div className="py-8 text-center text-red-600">{error}</div>;
    }

    if (agents.length === 0) {
        return <div className="py-8 text-center text-gray-500">No agent locations found.</div>;
    }

    return (
        <ClientLayout>
            <Head title={'Roast & Brew - WE Coffee Roasters'} />
            <div className="py-8">
                <div className="mx-auto max-w-4xl rounded-lg bg-white p-6 px-4 sm:px-6 lg:px-8">
                    <h1 className="title-underline mb-6 text-center text-4xl font-bold text-gray-900">Roast & Brew</h1>
                    <div className="static-content prose max-w-none leading-relaxed text-gray-700">
                        <h2 className="my-6 text-center text-3xl font-bold text-gray-900">Silahkan datang ke salah satu Roast & Brew Point kami!</h2>
                        <ul className="m-0 list-none p-0">
                            {agents.map((agent) => (
                                <li key={agent.id} className="mb-4">
                                    <a
                                        href={`https://www.google.com/maps/search/?api=1&query=${agent.latitude},${agent.longitude}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-brand-primary block text-xl font-semibold transition-colors duration-200 hover:text-red-700"
                                    >
                                        {agent.title}
                                    </a>
                                    {agent.content && <p className="mt-1 text-sm leading-relaxed text-gray-700">{agent.content}</p>}
                                </li>
                            ))}
                        </ul>

                        <p>
                            Tempat dimana Anda bisa menikmati ritual menyangrai kopi serta menyeduhnya secara langsung, dan menikmati hasil seduhannya
                            seketika. Barista di Roast &amp; Brew Point pun akan bertutur mengenai cerita tentang biji kopi yang Anda pilih.
                        </p>
                        <p>
                            <span className="font-bold italic">Tinggal Selangkah Lagi!</span> Anda bisa terlibat menjadi mata rantai dalam industri
                            kopi Indonesia: sebagai pembeli green bean, penyangrai, penyeduh, sekaligus penikmat secangkir kopi lokal berkualitas.
                        </p>
                        <p>
                            <span className="font-bold italic">
                                Wujudkan Impian Anda,
                                <br />
                                Nikmati Kopi Terbaik Indonesia.
                            </span>
                        </p>

                        <div className="grid grid-cols-1 items-stretch gap-8 md:grid-cols-2">
                            <div className="flex flex-col justify-between rounded-lg bg-gray-50 p-8 shadow-md">
                                <div>
                                    <h3 className="mb-4 text-3xl font-bold text-gray-900">Roast & Brew Program</h3>
                                    <p className="mb-6 text-base leading-relaxed text-gray-700">
                                        Klik Button, agar kamu tahu Benefit yang akan kamu dapatkan!
                                    </p>
                                </div>
                                <div className="mt-auto">
                                    <a
                                        href="https://drive.google.com/file/d/14BcK6tNarY0lTPwhSk2RYUWWCPvGgFyk/view?usp=sharing"
                                        target="_blank"
                                        className={`not-prose bg-brand-primary inline-block rounded-md px-8 py-3 text-lg font-medium uppercase text-white shadow-lg transition duration-300 ease-in-out hover:bg-red-700`}
                                    >
                                        Google Drive
                                    </a>
                                </div>
                            </div>

                            <div className="flex flex-col justify-between rounded-lg bg-gray-50 p-8 shadow-md">
                                <div>
                                    <h3 className="mb-4 text-3xl font-bold text-gray-900">Konsultasikan dengan tim kami</h3>
                                    <p className="mb-6 text-base leading-relaxed text-gray-700">
                                        Jika kamu ada pertanyaan dan ingin tahu lebih lanjut, silahkan hubungi dengan Klik Button "Whatsapp" dibawah
                                    </p>
                                </div>
                                <div className="mt-auto">
                                    <a
                                        href="https://taplink.cc/roastandbrew"
                                        target="_blank"
                                        className={`not-prose bg-brand-primary inline-block rounded-md px-8 py-3 text-lg font-medium uppercase text-white shadow-lg transition duration-300 ease-in-out hover:bg-red-700`}
                                    >
                                        WhatsApp
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </ClientLayout>
    );
}
