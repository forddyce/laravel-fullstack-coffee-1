import ClientLayout from '@/front/js/layouts/ClientLayout';
import { Head } from '@inertiajs/react';
import { BookOpen, Globe, User } from 'lucide-react';

const WA_REGISTER_LINK = 'https://wa.link/ovrhsn';

const academyPrograms = [
    {
        image: '/images/academy/sca.webp',
        imageLabel: 'SCA ROASTING CLASS',
        leftQA: [
            {
                q: 'Apa itu SCA?',
                a: 'Organisasi internasional yang menjadi standar global industri kopi specialty, hadir di lebih dari 99 negara dengan lebih dari 60.000 pelajar setiap tahunnya.',
            },
            {
                q: 'Apa perbedaan SCA Roasting Class?',
                a: 'Kelas SCA menggunakan kurikulum berstandar internasional, dilengkapi ujian resmi, dan sertifikat yang dapat diverifikasi secara global oleh siapa pun.',
            },
            {
                q: 'Apa yang dipelajari?',
                a: 'Terdiri dari tiga level: Foundation (dasar-dasar roasting), Intermediate (kontrol roast profile dan quality control), dan Professional (production roasting dan manajemen roastery).',
            },
        ],
        rightQA: [
            {
                q: 'Apa ada syaratnya?',
                a: 'Level Foundation tidak memiliki syarat khusus, siapa pun dapat langsung mendaftar. Intermediate memerlukan Foundation, dan Professional memerlukan Intermediate yang telah diselesaikan terlebih dahulu.',
            },
            {
                q: 'Biaya kelas SCA Roasting Class berapa?',
                a: 'Di WE Academy, biaya yang dikeluarkan berbanding lurus dengan fasilitas yang didapatkan: mentor berpengalaman, tim yang ahli dibidangnya, peralatan yang proper, dan suasana belajar yang interaktif. Untuk informasi biaya dan jadwal terbaru, silakan hubungi tim kami.',
            },
            {
                q: 'Apa manfaat sertifikat SCA?',
                a: 'Sertifikat terdaftar dan dapat diverifikasi di sistem global SCA. Setiap level menghasilkan poin kredit yang dapat dikumpulkan menuju SCA Skills Diploma, kualifikasi profesional yang diakui di industri kopi internasional.',
            },
        ],
        selengkapnyaHref:
            'https://wiliamedison.coffee/blog/apa-itu-sca-roasting-certificate-dan-kenapa-roaster-profesional-butuh-ini',
    },
    {
        image: '/images/academy/q-processing.webp',
        imageLabel: 'Q PROCESSING CLASS',
        leftQA: [
            {
                q: 'Q Processing Class itu apa?',
                a: 'Program sertifikasi dari Coffee Quality Institute (CQI) yang menghubungkan metode processing dengan flavor dan kualitas kopi dalam cangkir. Untuk semua pelaku industri, dari petani hingga roaster dan green buyer.',
            },
            {
                q: 'Ada berapa level?',
                a: 'Level 1 (Generalist) kelas 2 hari, cocok untuk siapa pun. Level 2 (Professional) kelas 6 hari berbasis lapangan, untuk yang sudah bekerja langsung di post-harvest processing.',
            },
            {
                q: 'Apa yang dipelajari?',
                a: 'Level 1 mencakup anatomi buah kopi, metode processing, fermentasi, pengeringan, dan comparative cupping. Level 2 lebih hands-on: pulping, washing, quality control, hingga integrated processing management.',
            },
        ],
        rightQA: [
            {
                q: 'Apa ada syaratnya?',
                a: 'Level 1 tidak ada syarat, langsung bisa daftar. Level 2 memerlukan Level 1 sebagai prasyarat.',
            },
            {
                q: 'Biaya kelas Q Processing Class berapa?',
                a: 'Di WE Academy, kamu belajar langsung bersama mentor yang expert, pengalaman yang didapat jauh melampaui materi di kelas. Investasi yang worth it untuk karir dan bisnis kopi kamu ke depannya. Untuk info biaya dan jadwal, silakan hubungi tim kami.',
            },
            {
                q: 'Apa manfaat sertifikat Q Processing?',
                a: 'Diterbitkan langsung oleh CQI dan diakui secara global. Pemegang sertifikat Level 1 bergalar Q Processing Generalist, Level 2 Q Processing Professional. Relevan untuk petani / processor, roaster, green buyer, maupun pemilik bisnis kopi.',
            },
        ],
        selengkapnyaHref:
            'https://wiliamedison.coffee/blog/apa-itu-cqi-q-processing-class-semua-yang-perlu-kamu-tahu-sebelum-ikut-kelasnya',
    },
];

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
                            href={WA_REGISTER_LINK}
                            target="_blank"
                            className="bg-brand-primary rounded-lg px-8 py-3 text-lg font-semibold uppercase text-white shadow-lg transition duration-300 ease-in-out hover:bg-red-700"
                        >
                            Daftar Sekarang
                        </a>
                        <a
                            href={WA_REGISTER_LINK}
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
                    <div className="flex flex-col gap-8">
                        {academyPrograms.map((program) => (
                            <div
                                key={program.imageLabel}
                                className="overflow-hidden rounded-2xl bg-white shadow-md"
                            >
                                <div className="flex flex-col md:flex-row">
                                    {/* Image */}
                                    <div className="relative w-full shrink-0 md:w-72 lg:w-80">
                                        <img
                                            src={program.image}
                                            alt={program.imageLabel}
                                            className="h-64 w-full object-cover object-top md:h-full md:object-center"
                                        />
                                        {/* Label: visible on mobile only, red bg with gradient fade at top */}
                                        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-b from-brand-primary/0 to-brand-primary px-4 pb-3 pt-10 md:hidden">
                                            <span className="text-sm font-bold uppercase tracking-widest text-white">
                                                {program.imageLabel}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Content */}
                                    <div className="flex flex-1 flex-col p-6">
                                        <div className="grid grid-cols-1 gap-x-8 gap-y-4 sm:grid-cols-2">
                                            {/* Left Q&A */}
                                            <div className="space-y-4">
                                                {program.leftQA.map((item) => (
                                                    <div key={item.q}>
                                                        <h4 className="text-brand-primary mb-1 text-base font-bold">{item.q}</h4>
                                                        <p className="text-sm leading-relaxed text-gray-700">{item.a}</p>
                                                    </div>
                                                ))}
                                            </div>
                                            {/* Right Q&A */}
                                            <div className="space-y-4">
                                                {program.rightQA.map((item) => (
                                                    <div key={item.q}>
                                                        <h4 className="text-brand-primary mb-1 text-base font-bold">{item.q}</h4>
                                                        <p className="text-sm leading-relaxed text-gray-700">{item.a}</p>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>

                                        {/* Buttons */}
                                        <div className="mt-6 flex flex-wrap justify-end gap-3">
                                            <a
                                                href={WA_REGISTER_LINK}
                                                target="_blank"
                                                className="border-brand-primary text-brand-primary hover:bg-brand-primary inline-flex items-center gap-1 rounded-md border px-5 py-2 text-sm font-semibold transition duration-200 hover:text-white"
                                            >
                                                Daftar Sekarang →
                                            </a>
                                            <a
                                                href={program.selengkapnyaHref}
                                                target="_blank"
                                                className="bg-brand-primary inline-flex items-center gap-1 rounded-md px-5 py-2 text-sm font-semibold text-white transition duration-200 hover:bg-red-700"
                                            >
                                                Selengkapnya →
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </ClientLayout>
    );
}
