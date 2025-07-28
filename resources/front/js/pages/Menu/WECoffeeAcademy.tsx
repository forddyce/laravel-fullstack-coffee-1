import ClientLayout from '@/front/js/layouts/ClientLayout';
import { whatsappLink } from '@/front/js/utils/misc';
import { Head } from '@inertiajs/react';
import { BookOpen, Globe, User } from 'lucide-react';

export default function WeCoffeeAcademy() {
    return (
        <ClientLayout>
            <Head title="WE Coffee Academy" />
            <section
                className="relative h-[70vh] w-full bg-cover bg-center bg-no-repeat"
                style={{ backgroundImage: 'url(/images/academy/academy_hero.webp)' }}
            >
                <div className="absolute inset-0 bg-black/50"></div>
                <div className="relative z-10 flex h-full flex-col items-center justify-center px-4 text-center text-white">
                    <h1 className="mb-4 text-5xl font-extrabold uppercase drop-shadow-lg md:text-6xl">Learn, Roast, Lead The Industry</h1>
                    <p className="mb-8 max-w-2xl text-lg drop-shadow md:text-xl">
                        Mencetak ahli kopi masa depan dari biji hingga cangkir.
                        <br />
                        Daftar sekarang dan mulai perjalananmu bersama mentor terbaik di industri kopi!
                    </p>
                    <div className="flex space-x-4">
                        <a
                            href={whatsappLink}
                            target="_blank"
                            className="bg-brand-primary rounded-lg px-8 py-3 text-lg font-semibold uppercase text-white shadow-lg transition duration-300 ease-in-out hover:bg-red-700"
                        >
                            Daftar Sekarang
                        </a>
                        <a
                            href={whatsappLink}
                            target="_blank"
                            className="hover:text-brand-primary rounded-lg border-2 border-white px-8 py-3 text-lg font-semibold uppercase text-white shadow-lg transition duration-300 ease-in-out hover:bg-white"
                        >
                            Konsultasi Gratis
                        </a>
                    </div>
                </div>
            </section>

            <section className="bg-white py-16">
                <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
                    <h2 className="title-underline mb-6 text-4xl font-bold text-gray-900">Tentang WE Coffee Academy</h2>
                    <p className="mb-4 text-lg leading-relaxed text-gray-700">
                        Dengan pengalaman mencetak banyak alumni sukses lewat kelas roasting, WE Coffee tetap berdedikasi dalam Coffee Academy,
                        sebagai tempat belajar intensif yang dirancang untuk mempersiapkan tenaga ahli kopi dari berbagai daerah.
                    </p>
                    <p className="text-lg leading-relaxed text-gray-700">
                        Kami mengembangkan kurikulum yang terstruktur dan aplikatif – mulai dari dasar pemilihan biji kopi, teknik roasting, hingga
                        pengembangan produk siap konsumsi. Semua materi dibawakan oleh praktisi dan ahli profesional dari industri kopi tanah air.
                    </p>
                    <p className="mt-8 text-lg font-semibold text-gray-800">
                        Tujuan kami jelas: menciptakan dampak bagi industri kopi dari hulu ke hilir—petani, prosesor, roastery, hingga pemilik coffee
                        shop.
                    </p>
                </div>
            </section>

            <section className="bg-gray-50 py-16">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <h2 className="title-underline mb-12 text-center text-4xl font-bold text-gray-900">Kenapa Bergabung dengan WE Coffee Academy?</h2>
                    <div className="grid grid-cols-1 gap-8 text-center md:grid-cols-3">
                        <div className="flex flex-col items-center rounded-lg bg-white p-6 shadow-md">
                            <BookOpen className="text-brand-primary mb-4 h-20 w-20" /> {/* Lucide Icon */}
                            <h3 className="mb-2 text-xl font-bold text-gray-900">Kurikulum Komprehensif</h3>
                            <p className="text-sm leading-relaxed text-gray-700">
                                Dirancang dengan pendekatan praktik langsung dan studi kasus industri.
                            </p>
                        </div>
                        <div className="flex flex-col items-center rounded-lg bg-white p-6 shadow-md">
                            <User className="text-brand-primary mb-4 h-20 w-20" /> {/* Lucide Icon */}
                            <h3 className="mb-2 text-xl font-bold text-gray-900">Mentor Profesional</h3>
                            <p className="text-sm leading-relaxed text-gray-700">
                                Dipandu oleh para pelaku industri berpengalaman, termasuk Wiliam Edison.
                            </p>
                        </div>
                        <div className="flex flex-col items-center rounded-lg bg-white p-6 shadow-md">
                            <Globe className="text-brand-primary mb-4 h-20 w-20" /> {/* Lucide Icon */}
                            <h3 className="mb-2 text-xl font-bold text-gray-900">Jejaring Nasional</h3>
                            <p className="text-sm leading-relaxed text-gray-700">
                                Bergabung dalam komunitas kopi lintas wilayah yang saling terhubung dan saling menguatkan.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            <section className="bg-white py-16">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <h2 className="title-underline mb-12 text-center text-4xl font-bold text-gray-900">Program Unggulan</h2>
                    <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                        <div className="overflow-hidden rounded-lg bg-white shadow-md">
                            <div className="relative aspect-video overflow-hidden">
                                <img
                                    src="/images/academy/academy_1.webp"
                                    alt="Roasting Class"
                                    className="absolute inset-0 h-full w-full object-cover"
                                />
                            </div>
                            <div className="p-6">
                                <h3 className="mb-3 text-2xl font-bold text-gray-900">ROASTING CLASS BY WILLIAM EDISON</h3>
                                <ul className="mb-6 list-inside list-disc space-y-1 text-base text-gray-700">
                                    <li>Level: Pemula–Menengah</li>
                                    <li>Durasi: 7 Hari Intensif</li>
                                    <li>Lokasi: WE Coffee Lab</li>
                                </ul>
                                <a
                                    href={whatsappLink}
                                    target="_blank"
                                    className="inline-block rounded-md bg-green-500 px-8 py-3 text-base font-semibold uppercase text-white transition duration-300 ease-in-out hover:bg-green-600"
                                >
                                    Daftar Sekarang Via WhatsApp
                                </a>
                            </div>
                        </div>

                        <div className="overflow-hidden rounded-lg bg-white shadow-md">
                            <div className="relative aspect-video overflow-hidden">
                                <img
                                    src="/images/academy/academy_2.webp"
                                    alt="Coffee Profiling"
                                    className="absolute inset-0 h-full w-full object-cover"
                                />
                            </div>
                            <div className="p-6">
                                <h3 className="mb-3 text-2xl font-bold text-gray-900">COFFEE PROFILING & PRODUCT DEVELOPMENT</h3>
                                <p className="mb-6 text-base text-gray-700"></p>
                                <button
                                    disabled
                                    className="inline-block cursor-not-allowed rounded-md bg-gray-400 px-8 py-3 text-base font-semibold uppercase text-white"
                                >
                                    Coming Soon
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </ClientLayout>
    );
}
