import AuthenticatedLayout from '@/back/js/layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';

export default function Settings() {
    return (
        <AuthenticatedLayout header={<h2 className="text-xl font-semibold leading-tight text-gray-800">Settings</h2>}>
            <Head title="Settings" />
            <div className="py-12">
                <div className="mx-auto max-w-7xl space-y-6 sm:px-6 lg:px-8">
                    <div className="bg-white p-4 shadow sm:rounded-lg sm:p-8">
                        <h3 className="mb-4 text-lg font-medium text-gray-900">Account Settings</h3>
                        <div className="flex flex-col space-y-2">
                            <Link
                                href={route('admin.settings.password')}
                                className="inline-flex items-center rounded bg-blue-500 px-4 py-2 font-bold text-white shadow-md transition duration-150 ease-in-out hover:bg-blue-600"
                            >
                                Change Password
                            </Link>
                            <Link
                                href={route('logout')}
                                method="post"
                                as="button"
                                className="inline-flex items-center rounded bg-red-500 px-4 py-2 font-bold text-white shadow-md transition duration-150 ease-in-out hover:bg-red-600"
                            >
                                Logout
                            </Link>
                        </div>
                    </div>

                    {/* Add other settings sections here later */}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
