import AgentForm from '@/back/js/components/Forms/AgentForm';
import AuthenticatedLayout from '@/back/js/layouts/AuthenticatedLayout';
import { PageProps } from '@inertiajs/core';
import { Head, usePage } from '@inertiajs/react';
import { Agent } from 'types';

interface AgentEditProps extends PageProps {
    agent: Agent;
}

export default function AgentEdit() {
    const { agent } = usePage<AgentEditProps>().props;

    return (
        <AuthenticatedLayout header={<p className="text-xl font-semibold leading-tight text-gray-800">Edit Agent: {agent.title}</p>}>
            <Head title={`Edit Agent: ${agent.title}`} />
            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <AgentForm agent={agent} />
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
