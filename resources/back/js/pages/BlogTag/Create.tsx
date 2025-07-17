import BlogTagForm from '@/back/js/components/Forms/BlogTagForm';
import AuthenticatedLayout from '@/back/js/layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

export default function BlogTagCreate() {
    return (
        <AuthenticatedLayout header={<p className="text-xl font-semibold leading-tight text-gray-800">Create Blog Tag</p>}>
            <Head title="Create Blog Tag" />
            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <BlogTagForm />
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
