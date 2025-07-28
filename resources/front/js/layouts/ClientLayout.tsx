import ClientFooter from '@/front/js/components/Footer';
import ClientHeader from '@/front/js/components/Header';
import MobileWhatsappButton from '@/front/js/components/MobileWhatsappButton';
import SubscribeFormSection from '@/front/js/components/SubscribeForm';
import { ReactNode } from 'react';

interface ClientLayoutProps {
    children: ReactNode;
}

export default function ClientLayout({ children }: ClientLayoutProps) {
    return (
        <div className="pt-18 flex min-h-screen flex-grow flex-col bg-gray-50 antialiased">
            <ClientHeader />
            <main>{children}</main>
            <SubscribeFormSection />
            <ClientFooter />
            <MobileWhatsappButton />
        </div>
    );
}
