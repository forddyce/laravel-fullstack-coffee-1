import ProductCategoryForm from '@/back/js/components/Forms/ProductCategoryForm';
import AuthenticatedLayout from '@/back/js/layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

export default function ProductCategoryCreate() {
    return (
        <AuthenticatedLayout header={<p className="text-xl font-semibold leading-tight text-gray-800">Create New Product Category</p>}>
            <Head title="Create Product Category" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <ProductCategoryForm />
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
