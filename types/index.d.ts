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
    guard_name: string;
    created_at: string;
    updated_at: string;
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

export interface BlogTag {
    id: number;
    title: string;
    slug: string;
    is_active: boolean;
    created_by: string | null;
    updated_by: string | null;
    created_at: string;
    updated_at: string;
}

export interface Blog {
    id: number;
    title: string;
    slug: string;
    content: string | null;
    summary: string | null;
    featured_image: string | null;
    is_active: boolean;
    published_date: string;
    created_by: string | null;
    updated_by: string | null;
    created_at: string;
    updated_at: string;
    tags: BlogTag[];
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
