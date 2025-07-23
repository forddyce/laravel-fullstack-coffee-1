import { ReactNode } from 'react';
import ClientFooter from '../components/Footer';
import ClientHeader from '../components/Header';

interface ClientLayoutProps {
    children: ReactNode;
}

export default function ClientLayout({ children }: ClientLayoutProps) {
    return (
        <div className="flex min-h-screen flex-col bg-gray-50 antialiased">
            <ClientHeader />
            <main>{children}</main>
            <ClientFooter />
        </div>
    );
}
