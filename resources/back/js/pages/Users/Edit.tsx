import UserForm from '@/back/js/components/Forms/UserForm';
import AuthenticatedLayout from '@/back/js/layouts/AuthenticatedLayout';
import type { PageProps } from '@inertiajs/core';
import { Head, usePage } from '@inertiajs/react';
import type { Role, User } from 'types';

interface UserEditPageProps extends PageProps {
    user: User;
    availableRoles: Role[];
}

export default function UserEdit() {
    const { user, availableRoles } = usePage<UserEditPageProps>().props;

    return (
        <AuthenticatedLayout header={<h2 className="text-xl font-semibold leading-tight text-gray-800">Edit User: {user.name}</h2>}>
            <Head title={`Edit User: ${user.name}`} />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <UserForm
                                user={user}
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
