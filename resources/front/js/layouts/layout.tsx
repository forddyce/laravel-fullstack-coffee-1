import { ReactNode } from 'react';
import ClientFooter from '../components/Footer';
import ClientHeader from '../components/Header';

interface ClientLayoutProps {
    children: ReactNode;
}

export default function ClientLayout({ children }: ClientLayoutProps) {
    return (
        <div className="flex min-h-screen flex-col bg-gray-50 font-sans text-gray-800 antialiased">
            <ClientHeader />
            <main className="container mx-auto flex-grow px-4 py-8 sm:px-6 lg:px-8">{children}</main>
            <ClientFooter />
        </div>
    );
}
