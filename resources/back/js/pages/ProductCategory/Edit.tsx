import ProductCategoryForm from '@/back/js/components/Forms/ProductCategoryForm';
import AuthenticatedLayout from '@/back/js/layouts/AuthenticatedLayout';
import { PageProps } from '@inertiajs/core';
import { Head, usePage } from '@inertiajs/react';
import type { ProductCategory } from 'types';

interface ProductCategoryEditProps extends PageProps {
    productCategory: ProductCategory;
}

export default function ProductCategoryEdit() {
    const { productCategory } = usePage<ProductCategoryEditProps>().props;

    return (
        <AuthenticatedLayout
            header={<p className="text-xl font-semibold leading-tight text-gray-800">Edit Product Category: {productCategory.title}</p>}
        >
            <Head title={`Edit Product Category: ${productCategory.title}`} />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <ProductCategoryForm productCategory={productCategory} />
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
