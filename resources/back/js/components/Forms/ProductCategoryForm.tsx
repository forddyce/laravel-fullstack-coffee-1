import Button from '@/back/js/components/FormElements/Button';
import InputError from '@/back/js/components/FormElements/InputError';
import InputLabel from '@/back/js/components/FormElements/InputLabel';
import TextInput from '@/back/js/components/FormElements/TextInput';
import { useNotifications } from '@/back/js/hooks/useNotification';
import { useForm } from '@inertiajs/react';
import { ChangeEvent, FormEventHandler, useEffect } from 'react';
import type { ProductCategory } from 'types';

interface ProductCategoryFormProps {
    productCategory?: ProductCategory; // Optional, for editing
}

export default function ProductCategoryForm({ productCategory }: ProductCategoryFormProps) {
    const { data, setData, post, put, processing, errors, reset, recentlySuccessful } = useForm({
        title: productCategory?.title || '',
        is_active: productCategory?.is_active ?? true,
    });

    const { success, error } = useNotifications();

    useEffect(() => {
        setData({
            title: productCategory?.title || '',
            is_active: productCategory?.is_active ?? true,
        });
        reset();
    }, [productCategory]);

    const isSubmitDisabled = processing || !data.title;

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        if (productCategory) {
            put(route('admin.product-categories.update', productCategory.id), {
                onSuccess: () => {
                    success('Product category updated successfully!');
                },
                onError: (validationErrors) => {
                    error('Failed to update Product category. Please check the form.');
                    console.error('Update error:', validationErrors);
                },
            });
        } else {
            post(route('admin.product-categories.store'), {
                onSuccess: () => {
                    success('Product category created successfully!');
                    reset();
                },
                onError: (validationErrors) => {
                    error('Failed to create Product category. Please check the form.');
                    console.error('Create error:', validationErrors);
                },
            });
        }
    };

    useEffect(() => {
        if (recentlySuccessful) {
            success(productCategory ? 'Product Category updated successfully!' : 'Product Category created successfully!');
            if (!productCategory) {
                reset();
            }
        }
    }, [recentlySuccessful, productCategory, reset, success]);

    return (
        <form onSubmit={submit} className="space-y-6">
            <div>
                <TextInput
                    id="title"
                    type="text"
                    name="title"
                    value={data.title}
                    className="mt-1 block w-full"
                    isFocused
                    onChange={(e: ChangeEvent) => setData('title', (e.target as HTMLInputElement).value)}
                    required
                    label="Category Title"
                    error={errors.title}
                />
            </div>

            <div className="flex items-center">
                <input
                    id="is_active"
                    type="checkbox"
                    name="is_active"
                    checked={data.is_active}
                    className="rounded border-gray-300 text-indigo-600 shadow-sm focus:ring-indigo-500"
                    onChange={(e) => setData('is_active', e.target.checked)}
                />
                <InputLabel htmlFor="is_active" value="Active" className="mb-0 ml-2" />
                {errors.is_active && <InputError message={errors.is_active} className="mt-2" />}
            </div>

            <div className="flex items-center justify-end">
                <Button disabled={isSubmitDisabled} variant="primary">
                    {processing ? 'Saving...' : productCategory ? 'Update Category' : 'Create Category'}
                </Button>
            </div>
        </form>
    );
}
