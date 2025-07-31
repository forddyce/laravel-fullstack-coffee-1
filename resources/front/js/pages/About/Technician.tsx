import Accordion from '@/front/js/components/Accordion';
import ClientLayout from '@/front/js/layouts/ClientLayout';
import { grinderNordicItems, w3100Items, w600Items, wexsujiItems } from '@/front/js/utils/faq';
import { Head } from '@inertiajs/react';

export default function AboutTechnicianPage() {
    return (
        <ClientLayout>
            <Head title={'Our Technician - WE Coffee Roasters'} />
            <div className="py-8">
                <div className="mx-auto max-w-4xl rounded-lg bg-white p-6 px-4 sm:px-6 lg:px-8">
                    <h1 className="title-underline mb-6 text-center text-4xl font-bold text-gray-900">Our Technician</h1>
                    <div className="static-content prose max-w-none leading-relaxed text-gray-700">
                        <p>
                            Dengan rekam jejak penjualan yang terbukti dari banyaknya Roasting Machine yang terjual dari hulu hingga ke hilir, WE
                            Coffee Roaster berkomitmen untuk menyediakan layanan pelanggan yang dapat diandalkan.
                        </p>
                        <div className="my-5 flex flex-col gap-4 md:flex-row">
                            <img src="/images/technician/3.webp" alt="Technician 1" className="w-full flex-1 object-contain md:w-1/2" />
                            <img src="/images/technician/4.webp" alt="Technician 2" className="w-full flex-1 object-contain md:w-1/2" />
                        </div>
                        <p>
                            Layanan purna jual kami merupakan kurasi yang menjunjung tinggi kepuasan agar dapat memaksimalkan pengalaman dari setiap
                            pembelian yang anda lakukan.
                        </p>

                        <ul className="list-inside list-disc space-y-2 leading-relaxed text-gray-700">
                            <li>
                                Untuk setiap mesin yang terjual kami menyediakan garansi yang mudah diklaim, berlaku untuk 6 bulan dan 12 bulan
                                (Sesuai dengan tipe mesin).
                            </li>
                            <li>
                                Layanan ini termasuk penggantian suku cadang yang merupakan cacat bawaan dari pabrik pada saat pengecekan mesin saat
                                mesin diterima.
                            </li>
                            <li>Teknisi terampil kami dapat melakukan layanan kunjungan di area JADETABEK.</li>
                            <li>Ketentuan berlaku untuk layanan kunjungan di luar JADETABEK area.</li>
                            <li>Teknisi kami dapat memberikan panduan troubleshooting melalui panggilan suara atau panggilan video.</li>
                            <li>Layanan berbayar tersedia saat garansi produk sudah berakhir.</li>
                        </ul>

                        <h2 className="title-underline my-6 text-center text-3xl font-bold text-gray-900">FAQ</h2>

                        <div className="my-10">
                            <p className="heading-6 mb-3 font-bold">W600i/ W600i SE</p>
                            {w600Items.slice(0, 3).map((item, index) => (
                                <Accordion key={index} question={item.title} answer={item.text} />
                            ))}
                        </div>

                        <div className="my-10">
                            <p className="heading-6 mb-3 font-bold">W3100 / W3100 IR / W6100 / W6100 IR / W12k IR</p>
                            {w3100Items.slice(0, 3).map((item, index) => (
                                <Accordion key={index} question={item.title} answer={item.text} />
                            ))}
                        </div>

                        <div className="my-10">
                            <p className="heading-6 mb-3 font-bold">WExSUJI</p>
                            {wexsujiItems.slice(0, 3).map((item, index) => (
                                <Accordion key={index} question={item.title} answer={item.text} />
                            ))}
                        </div>

                        <div className="my-10">
                            <p className="heading-6 mb-3 font-bold">GRINDER NORDIC</p>
                            {grinderNordicItems.slice(0, 3).map((item, index) => (
                                <Accordion key={index} question={item.title} answer={item.text} />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </ClientLayout>
    );
}
