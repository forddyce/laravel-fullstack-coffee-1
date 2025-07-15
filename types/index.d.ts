declare global {
    interface Window {
        Ziggy: {
            url: string;
            port: number;
            defaults: Record<string, string>;
            routes: Record<string, { uri: string; methods: string[]; bindings?: Record<string, string>; parameters?: string[] }>;
        };
    }
}

export interface Role {
    id: number;
    name: string;
}

export interface User {
    id: number;
    name: string;
    email: string;
    email_verified_at: string | null;
    created_at: string;
    updated_at: string;
    roles: Role[];
}

declare module '@inertiajs/core' {
    interface PageProps {
        auth: {
            user: User | null;
        };
        flash: {
            success?: string;
            error?: string;
        };
    }
}

declare function route(name: string, params?: Record<string, string | number | boolean> | string | number, absolute?: boolean): string;
declare function route(): {
    current: (name?: string, params?: Record<string, string | number | boolean>) => boolean;
    has: (name: string) => boolean;
    params: Record<string, string | number | boolean>;
};
