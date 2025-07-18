import { SelectOption } from '@/back/js/components/FormElements/CustomSelect';
import ProductForm from '@/back/js/components/Forms/ProductForm';
import AuthenticatedLayout from '@/back/js/layouts/AuthenticatedLayout';
import { PageProps } from '@inertiajs/core';
import { Head, usePage } from '@inertiajs/react';
import { Product, ProductCategory } from 'types';

interface ProductEditProps extends PageProps {
    product: Product;
    availableCategories: ProductCategory[];
}

export default function ProductEdit() {
    const { product, availableCategories } = usePage<ProductEditProps>().props;

    const formattedAvailableCategories: SelectOption[] = availableCategories.map((category) => ({
        value: category.id.toString(),
        label: category.title,
    }));

    return (
        <AuthenticatedLayout header={<p className="text-xl font-semibold leading-tight text-gray-800">Edit Product: {product.title}</p>}>
            <Head title={`Edit Product: ${product.title}`} />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <ProductForm product={product} availableCategories={formattedAvailableCategories} />
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
