import { Clock, Facebook, Instagram, Mail, MapPin, Phone, Youtube } from 'lucide-react';

export default function ClientFooter() {
    return (
        <footer className="bg-brand-primary mt-auto py-12 text-white">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
                    <div>
                        <div className="mb-4 flex items-center">
                            <img src="/logo-white.webp" alt="WE Coffee" className="mr-3 h-16 w-auto" />
                        </div>
                        <p className="text-sm leading-relaxed">
                            Hello! We are William Edison Production, a company that is passionate about making and selling coffee with a great flavor.
                            Our team of dedicated coffee experts celebrates exceptional coffee brands and roasters by providing our guests the unique
                            opportunity to try coffee the highest quality.
                        </p>
                    </div>

                    <div></div>

                    <div>
                        <h3 className="mb-4 text-xl font-semibold">Contact Information</h3>
                        <div className="space-y-3">
                            <div className="flex items-start">
                                <MapPin className="mr-3 mt-1 h-5 w-5" />
                                <p className="text-sm">
                                    De Mansion Blok E No. 3, Alamsutera, <br />
                                    RT.001/RW.014, Kunciran, Kec. Pinang, Tangerang <br />
                                    Kota, Banten 15143
                                </p>
                            </div>
                            <div className="flex items-start">
                                <Clock className="mr-3 mt-1 h-5 w-5" />
                                <p className="text-sm">
                                    Monday - Friday: 08.00 AM - 05.00 PM <br />
                                    Saturday: 08.00 AM - 02.00 PM <br />
                                    Sunday: Closed
                                </p>
                            </div>
                            <div className="flex items-center">
                                <Phone className="mr-3 h-5 w-5" />
                                <p className="text-sm">
                                    +62 819-2959-6675 <br />
                                    +62 821-2476-2004 <br />
                                    +62 878-1653-8759
                                </p>
                            </div>
                            <div className="flex items-center">
                                <Mail className="mr-3 h-5 w-5" />
                                <p className="text-sm">inquiry@wiliamedison.coffee</p>
                            </div>
                            <div className="mt-4 flex items-center space-x-4">
                                <a
                                    href="https://www.instagram.com/wiliamedison.coffee/"
                                    target="_blank"
                                    aria-label="Instagram"
                                    className="hover:text-gray-300"
                                >
                                    <Instagram className="h-6 w-6" />
                                </a>
                                <a
                                    href="https://www.facebook.com/wiliamedison.coffee/"
                                    target="_blank"
                                    aria-label="Facebook"
                                    className="hover:text-gray-300"
                                >
                                    <Facebook className="h-6 w-6" />
                                </a>
                                <a
                                    href="https://www.youtube.com/user/wiliamedison"
                                    target="_blank"
                                    aria-label="YouTube"
                                    className="hover:text-gray-300"
                                >
                                    <Youtube className="h-6 w-6" />
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-8 border-t border-white pt-6 text-center text-sm">&copy; 2025 WE Coffee. All Rights Reserved.</div>
            </div>
        </footer>
    );
}
