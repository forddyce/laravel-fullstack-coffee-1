import AgentForm from '@/back/js/components/Forms/AgentForm';
import AuthenticatedLayout from '@/back/js/layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

export default function AgentCreate() {
    return (
        <AuthenticatedLayout header={<p className="text-xl font-semibold leading-tight text-gray-800">Create New Agent</p>}>
            <Head title="Create Agent" />
            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <AgentForm />
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
