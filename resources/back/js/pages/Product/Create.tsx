import type { SelectOption } from '@/back/js/components/FormElements/CustomSelect';
import ProductForm from '@/back/js/components/Forms/ProductForm';
import AuthenticatedLayout from '@/back/js/layouts/AuthenticatedLayout';
import { PageProps } from '@inertiajs/core';
import { Head, usePage } from '@inertiajs/react';
import { ProductCategory } from 'types';

interface ProductCreateProps extends PageProps {
    availableCategories: ProductCategory[];
}

export default function ProductCreate() {
    const { availableCategories } = usePage<ProductCreateProps>().props;

    const formattedAvailableCategories: SelectOption[] = availableCategories.map((category) => ({
        value: category.id.toString(),
        label: category.title,
    }));

    return (
        <AuthenticatedLayout header={<p className="text-xl font-semibold leading-tight text-gray-800">Create New Product</p>}>
            <Head title="Create Product" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-auto bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <ProductForm availableCategories={formattedAvailableCategories} />
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
