import ClientLayout from '@/front/js/layouts/ClientLayout';
import { Head } from '@inertiajs/react';

export default function PrivacyPage() {
    return (
        <ClientLayout>
            <Head title={'Privacy Policy - WE Coffee Roasters'} />
            <div className="py-8">
                <div className="mx-auto max-w-4xl rounded-lg bg-white p-6 px-4 sm:px-6 lg:px-8">
                    <h1 className="title-underline mb-6 text-center text-4xl font-bold text-gray-900">Terms & Privacy</h1>
                    <div className="static-content prose max-w-none leading-relaxed text-gray-700">
                        <p className="mb-4 text-lg leading-relaxed text-gray-700">
                            Selamat datang di wiliamedison.coffee. Kami menghargai kepercayaan Anda dan berkomitmen untuk melindungi data pribadi
                            serta memberikan pengalaman belajar dan bertransaksi yang aman. Dengan mengakses situs ini, Anda menyetujui Syarat dan
                            Ketentuan serta Kebijakan Privasi berikut:
                        </p>
                        <h2 className="mb-4 mt-8 text-3xl font-bold text-gray-900">Syarat Penggunaan</h2>
                        <h3 className="mb-2 text-2xl font-semibold text-gray-800">1. Kepemilikan Konten</h3>
                        <p className="mb-4 text-base leading-relaxed text-gray-700">
                            Seluruh konten, materi, dan informasi di situs ini merupakan milik Wiliam Edison dan dilindungi oleh undang-undang hak
                            cipta. Anda tidak diperbolehkan menyalin, menyebarluaskan, atau memodifikasi konten tanpa izin tertulis.
                        </p>
                        <h3 className="mb-2 text-2xl font-semibold text-gray-800">2. Penggunaan Situs</h3>
                        <p className="mb-4 text-base leading-relaxed text-gray-700">
                            Anda setuju untuk tidak menyalahgunakan situs ini untuk tujuan yang melanggar hukum atau merugikan pihak lain.
                        </p>
                        <h3 className="mb-2 text-2xl font-semibold text-gray-800">3. Perubahan Layanan</h3>
                        <p className="mb-4 text-base leading-relaxed text-gray-700">
                            Kami berhak mengubah, menambah, atau menghentikan layanan atau konten kapan pun tanpa pemberitahuan sebelumnya.
                        </p>
                        <h2 className="mb-4 mt-8 text-3xl font-bold text-gray-900">Kebijakan Privasi</h2>
                        <h3 className="mb-2 text-2xl font-semibold text-gray-800">1. Data yang Dikumpulkan</h3>
                        <p className="mb-4 text-base leading-relaxed text-gray-700">
                            Kami mengumpulkan informasi seperti nama, email, dan data transaksi saat Anda menggunakan layanan, mengisi formulir, atau
                            mengikuti kursus.
                        </p>
                        <h3 className="mb-2 text-2xl font-semibold text-gray-800">2. Penggunaan Data</h3>
                        <ul className="mb-4 list-inside list-disc space-y-1 text-base leading-relaxed text-gray-700">
                            <li>Menyediakan layanan sesuai permintaan Anda </li>
                            <li>Mengirim informasi terkait produk, kursus, atau konten edukatif </li>
                            <li>Meningkatkan pengalaman pengguna dan kualitas layanan </li>
                        </ul>
                        <h3 className="mb-2 text-2xl font-semibold text-gray-800">3. Perlindungan Data</h3>
                        <p className="mb-4 text-base leading-relaxed text-gray-700">
                            Kami menjaga keamanan data Anda dengan teknologi enkripsi dan perlindungan server.
                        </p>
                        <h3 className="mb-2 text-2xl font-semibold text-gray-800">4. Pihak Ketiga</h3>
                        <p className="mb-4 text-base leading-relaxed text-gray-700">
                            Data Anda tidak dibagikan ke pihak ketiga tanpa persetujuan, kecuali untuk proses layanan seperti pembayaran atau
                            pengiriman.
                        </p>
                        <h2 className="mb-4 mt-8 text-3xl font-bold text-gray-900">Hak atas Kursus Digital</h2>
                        <h3 className="mb-2 text-2xl font-semibold text-gray-800">1. Lisensi Penggunaan</h3>
                        <p className="mb-4 text-base leading-relaxed text-gray-700">
                            Setelah Anda membeli atau mengakses kursus digital melalui situs ini, Anda mendapatkan lisensi pribadi, non-eksklusif, dan
                            tidak dapat dipindahtangankan untuk mengakses materi.
                        </p>
                        <h3 className="mb-2 text-2xl font-semibold text-gray-800">2. Larangan Distribusi</h3>
                        <p className="mb-4 text-base leading-relaxed text-gray-700">
                            Anda tidak diperbolehkan menduplikasi, memperjualbelikan kembali, atau membagikan akses kursus dalam bentuk apa pun, baik
                            sebagian maupun seluruhnya.
                        </p>
                        <h3 className="mb-2 text-2xl font-semibold text-gray-800">3. Akses dan Durasi</h3>
                        <p className="mb-4 text-base leading-relaxed text-gray-700">
                            Akses ke kursus digital bersifat terbatas pada waktu yang ditentukan sesuai dengan ketentuan produk. Kami tidak menjamin
                            akses seumur hidup, kecuali dinyatakan secara eksplisit.
                        </p>
                        <h3 className="mb-2 text-2xl font-semibold text-gray-800">4. Pelanggaran Hak Cipta</h3>
                        <p className="mb-4 text-base leading-relaxed text-gray-700">
                            Pelanggaran terhadap hak atas kursus akan dikenakan tindakan hukum sesuai hukum yang berlaku di Indonesia.
                        </p>
                        <h2 className="mb-4 mt-8 text-3xl font-bold text-gray-900">Pertanyaan atau Kontak</h2>
                        <p className="mb-2 text-base leading-relaxed text-gray-700">
                            <strong>PT WILLINDO JAYA UTAMA</strong>
                        </p>
                        <address className="mb-4 text-base not-italic leading-relaxed text-gray-700">
                            Alamat : De Mansion Blok E No. 3, Alamsutera, RT.001/RW.014, Kunciran, Kec. Pinang, Tangerang Kota, Banten 15143
                        </address>
                        <p className="mb-4 text-base leading-relaxed text-gray-700">Email: inquiry@wiliamedison.coffee</p>
                        <p className="text-sm text-gray-500">Halaman ini terakhir diperbarui pada: Juli 2025</p>
                    </div>
                </div>
            </div>
        </ClientLayout>
    );
}
