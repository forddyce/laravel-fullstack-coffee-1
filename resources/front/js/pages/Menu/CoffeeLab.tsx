import ClientLayout from '@/front/js/layouts/ClientLayout';
import { Head } from '@inertiajs/react';

export default function CoffeeLabPage() {
    return (
        <ClientLayout>
            <Head title={'Coffee Lab - WE Coffee Roasters'} />
            <div className="py-8">
                <div className="mx-auto max-w-4xl rounded-lg bg-white p-6 px-4 sm:px-6 lg:px-8">
                    <h1 className="mb-6 text-center text-4xl font-bold text-gray-900">Coffee Lab</h1>
                    <div className="prose static-content max-w-none leading-relaxed text-gray-700">
                        <h2 className="title-underline my-6 text-center text-3xl font-bold text-gray-900">WE Coffee Lab, Alam Sutera</h2>
                        <div className="my-5 flex flex-col gap-4 md:flex-row">
                            <img src="/images/coffee-lab/coffeelab_1.webp" alt="WE Coffee Lab, Alam Sutera" className="flex-1 object-contain" />
                        </div>
                        <p>
                            Nama WE Coffee Roaster telah beredar sejak tahun 2010. Berbekal pengalaman sukses dan semangat tinggi untuk memajukan
                            industri kopi Indonesia, Wiliam memutuskan untuk mendirikan WE Coffee Lab pada tahun 2018 yang berlokasi di Alam Sutera,
                            Tangerang.
                        </p>
                        <p>
                            Coffee Lab ini didirikan sebagai pusat sarana edukasi setiap insan yang memiliki keinginan untuk mempelajari manajemen
                            penyangraian kopi dimulai dari pemilihan biji yang sempurna, ilmu dibalik penyangraian kopi, hand-in roasting hingga
                            cupping.
                        </p>
                        <p>
                            Sebagai bagian dari komitmen kami untuk memajukan industri kopi Indonesia, maka pada tahun 2021 kami membuat sebuah kreasi
                            terbaru, WE Coffee Academy, yang bertujuan untuk membentuk individu-individu berkualitas untuk memperluas pengetahuan
                            mereka dalam bidang kopi.
                        </p>
                        <p>
                            Dengan menggandeng pelatih profesional dan menggunakan kurikulum berbasis internasional kami memiliki keinginan tinggi
                            agar melalui edukasi ini Kopi Indonesia dapat dikenal lebih luas lagi oleh dunia.
                        </p>
                        <p>
                            Kami pun mencatat banyaknya peminat WE Coffee Roaster yang datang dari berbagai daerah di Indonesia, maka di WE Coffee Lab
                            Alam Sutera pun terdapat showroom bagi anda yang ingin secara langsung mengenal dan menguji mesin roasting kami.
                        </p>

                        <h2 className="title-underline my-6 text-center text-3xl font-bold text-gray-900">20mL, Bali</h2>
                        <div className="my-5 flex flex-col gap-4 md:flex-row">
                            <img src="/images/coffee-lab/coffeelab_2.webp" alt="20mL, Bali" className="flex-1 object-contain" />
                        </div>
                        <p>
                            20ml Coffee. Nama kami, serta filosofi kami, berasal dari sebuah credo yang berbicara mengenai presisi, kesempurnaan dan
                            kecermatan dalam menyajikan kopi yang paling baik.
                        </p>

                        <p>
                            Lahir pada tahun 2020, 20ml Coffee adalah sebuah proyek gabungan dari passion kedua pendiri yaitu Wiliam Edison seorang
                            pembuat Coffee Roaster dan Ahli sangrai yang handal dengan Kevin James seorang hotelier berpengalaman dan seorang pebisnis
                            yang merupakan alumni dari WE Coffee Academy.
                        </p>

                        <p>
                            Keduanya berbagi Visi untuk menonjolkan potensi terbaik dari industri kopi Indonesia. Dengan memperkenalkan kopi sebagai
                            sistem holistik mulai dari green beans, roasting, brewing dan peralatan yang digunakan serta mengedepankan keterampilan
                            yang dimiliki insan Indonesia.
                        </p>

                        <p>
                            Visi mereka untuk memperkenalkan kopi sebagai pengalaman dan perjalanan yang mengembalikan tekad petani, produsen, dan
                            penyangrai kopi Indonesia.
                        </p>

                        <p>Oleh karena itu, kami memperlakukan kopi kami dengan penuh semangat, pengabdian dan dengan perhatian khusus.</p>
                    </div>
                </div>
            </div>
        </ClientLayout>
    );
}
