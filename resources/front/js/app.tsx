import '../css/app.css';

import { createInertiaApp, router } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { SnackbarProvider } from 'notistack';
import { createRoot } from 'react-dom/client';
import { initializeTheme } from './hooks/use-appearance';

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

createInertiaApp({
    title: (title) => (title ? `${title} - ${appName}` : appName),
    resolve: (name) => resolvePageComponent(`./pages/${name}.tsx`, import.meta.glob('./pages/**/*.tsx')),
    setup({ el, App, props }) {
        const root = createRoot(el);
        root.render(
            <SnackbarProvider maxSnack={3} autoHideDuration={3000}>
                <App {...props} />
            </SnackbarProvider>,
        );
    },
    progress: {
        color: '#4B5563',
    },
});

router.on('finish', () => {
    if (typeof window.gtag === 'function') {
        window.gtag('event', 'page_view', {
            page_title: document.title,
            page_location: window.location.href,
            page_path: window.location.pathname + window.location.search,
            send_to: 'G-HVKXZ6B3VD',
        });
    }
});

// This will set light / dark mode on load...
initializeTheme();
