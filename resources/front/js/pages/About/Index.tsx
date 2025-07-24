import ClientLayout from '@/front/js/layouts/ClientLayout';
import { Head } from '@inertiajs/react';

const items = [
    {
        image: '/images/about/about_1.webp',
        title: '2010',
        description: '<strong>One Bean Coffee & Roastery dibuka</strong>, outlet ini adalah Coffee Shop Pertama dari WE',
    },
    {
        image: '/images/about/about_2.webp',
        title: 'Mid 2010',
        description: '<strong>Prototype Mesin Trial & Error</strong> sedang dijalankan',
    },
    {
        image: '/images/about/about_3.webp',
        title: '2011',
        description: 'Mesin Roasting pertama <strong>W600i</strong> dengan kapasitas 1 kg mulai dipasarkan',
    },
    {
        image: '/images/about/about_4.webp',
        title: '2012',
        description: 'Mesin <strong>W600i</strong> semakin dikenal dan telah banyak berperan membantu para petani mengolah kopi',
    },
    {
        image: '/images/about/about_5.webp',
        title: '2013',
        description: '<strong>W3100</strong> lahir sebagai mesin dengan kapasitas 3 kg, diikuti dengan Mesin Kapasitas 6 kg dan 12 kg',
    },
    {
        image: '/images/about/about_6.webp',
        title: '2015',
        description: '<strong>WE Coffee Roasting Class</strong> lahir dan sukses mencetak banyak penggiat industri kopi hingga sekarang',
    },
    {
        image: '/images/about/about_7.webp',
        title: '2016',
        description: '<strong>Roadshow Roasting Class</strong> di berbagai daerah di Indonesia',
    },
    {
        image: '/images/about/about_8.webp',
        title: '2018',
        description: '<strong>WE Coffee Lab Alam Sutera</strong> resmi didirikan sebagai Showroom dan tempat Roasting Class diadakan',
    },
    {
        image: '/images/about/about_9.webp',
        title: 'Mid 2018',
        description:
            '<strong>WE bersama dengan Suji Premium Handcrafted</strong> melakukan pengembangan mesin roasting portable yang belum pernah ada di Indonesia',
    },
    {
        image: '/images/about/about_10.webp',
        title: '2019',
        description: '<strong>WExSUJI Mini Roaster</strong> pertama di Indonesia diluncurkan',
    },
    {
        image: '/images/about/about_11.webp',
        title: '2020',
        description: '<strong>20mL Coffee</strong> di Bali resmi dibuka',
    },
];

export default function AboutIndexPage() {
    return (
        <ClientLayout>
            <Head title={'About Us - WE Coffee Roasters'} />
            <div className="py-8">
                <div className="mx-auto max-w-4xl rounded-lg bg-white p-6 px-4 sm:px-6 lg:px-8">
                    <h1 className="title-underline mb-6 text-center text-4xl font-bold text-gray-900">About Us</h1>
                    <div className="prose static-content max-w-none leading-relaxed text-gray-700">
                        <p>
                            Pada tahun 2010, WE Coffee Roaster memulai perjalanannya untuk menjadi pemimpin pasar dalam permesinan sangrai kopi dengan
                            harga terjangkau.
                        </p>
                        <p>
                            Pendiri kami, Wiliam Edison, menganggap kesulitan untuk menemukan mesin sangrai kopi yang sempurna sebagai tantangan untuk
                            merancang mesing sangrai sendiri. Menggabungkan pengetahuannya tentang kopi dan keahlian dalam desain mesin, beliau
                            merakit mesin sangrai yang mampu bersaing dengan kualitas yang sama seperti merk lain yang memiliki harga cenderung mahal
                            di pasaran, kemudian lahirlah Coffee Roaster Handal dan terpercaya di Indonesia.
                        </p>
                        <p>
                            Dengan nilai ekonomi yang tinggi, pertumbuhan industri kopi sebagai komoditas kebanggaan Indonesia berkembang pesat
                            seiring dengan semakin banyaknya konsumen yang menikmati kopi kualitas tinggi.
                        </p>
                        <p>
                            Di WE Coffee Roaster, kami percaya untuk menghasilkan biji kopi berkualitas tinggi untuk mendukung siklus tersebut
                            membutuhkan peralatan yang tepat dan pengetahuan yang luas. Hal tersebut menjadi nilai inti kami untuk menghasilkan mesin
                            sangrai kopi kualitas tinggi yang tangguh dan efisien dalam konsumsi energi. Kami menciptakan mesin yang kokoh dan mudah
                            dioperasikan yang membuat kesan pengalaman tersendiri saat anda menyangrai.
                        </p>
                        <p>Dengan berbagai pilihan kapasitas yang tersedia untuk memenuhi berbagai jenis kebutuhan, kami memiliki semuanya.</p>
                        <p>
                            Hanya dalam beberapa tahun kami telah berhasil menjadikan WE Coffee Roaster sebagai pelopor dalam produksi mesin sangrai
                            dengan harga terjangkau di Indonesia dan banyak terlibat dalam kegiatan ekspor ke lebih dari 16 negara dari Asia Tenggara
                            hingga Eropa.
                        </p>
                        <p>
                            Dengan tekad mempromosikan Pendidikan agar menjangkau antusiasme yang meluas, kami merancang edukasi sangrai kopi yang
                            komprehensif, sebuah Gerakan yang membawa kami membentuk WE Coffee Academy dengan tujuan membawa kemakmuran pada setiap
                            aspek industri kopi.
                        </p>
                        <p>Kami percaya setiap passion, jika diikuti dengan ketekunan akan membawa kebaikan dalam segala hal yang kami lakukan.</p>
                        <p>
                            WE Coffee Roaster lebih dari sekedar mesin. WE Coffee Roaster adalah sebuah kesatuan dari semangat, Pendidikan, fungsi dan
                            kualitas yang diproduksi oleh seorang pakar kopi. Pendiri kami, Wiliam Edison, adalah seorang visioner, inovator sosial,
                            dan jiwa socialpreneur yang berupaya membuat komunitas lebih baik dan berkelanjutan. Seiring dengan penemuan inovatif yang
                            direncanakan Pendiri kami untuk masa depan perusahaan, kami bekerja sama dengan komunitas lokal untuk memastikan
                            perjuangan kami bergerak maju adalah sebagai satu kesatuan yaitu Industri Kopi Indonesia.
                        </p>

                        <div className="yearly-timeline">
                            {items.map((item, index) => {
                                return (
                                    <div className="timeline" key={`item-${index}`}>
                                        <div className="timeline-content">
                                            <img className="timeline-image" src={item.image} alt={item.title} />
                                            <h3 className="title">{item.title}</h3>
                                            <p className="description" dangerouslySetInnerHTML={{ __html: item.description }} />
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </ClientLayout>
    );
}
