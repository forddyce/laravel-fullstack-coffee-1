import SeasonForm from '@/back/js/components/Forms/SeasonForm';
import AuthenticatedLayout from '@/back/js/layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

export default function SeasonCreate() {
    return (
        <AuthenticatedLayout header={<p className="text-xl font-semibold leading-tight text-gray-800">Create New Season</p>}>
            <Head title="Create Season" />

            <div className="py-12">
                <div className="mx-auto max-w-2xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <SeasonForm />
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
