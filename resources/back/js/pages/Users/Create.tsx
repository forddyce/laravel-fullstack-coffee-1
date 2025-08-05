import UserForm from '@/back/js/components/Forms/UserForm';
import AuthenticatedLayout from '@/back/js/layouts/AuthenticatedLayout';
import type { PageProps } from '@inertiajs/core';
import { Head, usePage } from '@inertiajs/react';
import type { Role } from 'types';

interface UserCreatePageProps extends PageProps {
    availableRoles: Role[];
}

export default function UserCreate() {
    const { availableRoles } = usePage<UserCreatePageProps>().props;

    return (
        <AuthenticatedLayout header={<p className="text-xl font-semibold leading-tight text-gray-800">Create New User</p>}>
            <Head title="Create User" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <UserForm
                                availableRoles={availableRoles}
                                auth={{
                                    user: null,
                                }}
                                flash={{
                                    success: undefined,
                                    error: undefined,
                                }}
                                ziggy={undefined}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
