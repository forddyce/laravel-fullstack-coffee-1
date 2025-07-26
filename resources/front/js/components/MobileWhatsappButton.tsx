import { FaWhatsapp } from 'react-icons/fa';

export default function MobileWhatsappButton() {
    const whatsappLink = 'https://wa.link/czdx1y';

    return (
        <a
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="fixed bottom-4 right-4 z-50 flex items-center justify-center rounded-full bg-green-500 p-3 text-white shadow-lg transition-colors duration-200 hover:bg-green-600 md:hidden"
            aria-label="Chat on WhatsApp"
        >
            <FaWhatsapp size={28} />
        </a>
    );
}
