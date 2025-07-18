import Button from '@/back/js/components/FormElements/Button';
import CustomSelect, { SelectOption } from '@/back/js/components/FormElements/CustomSelect';
import DynamicKeyValueInput from '@/back/js/components/FormElements/DynamicKeyValueInput';
import InputError from '@/back/js/components/FormElements/InputError';
import InputLabel from '@/back/js/components/FormElements/InputLabel';
import TextAreaInput from '@/back/js/components/FormElements/TextAreaInput';
import TextInput from '@/back/js/components/FormElements/TextInput';
import RichTextEditor from '@/back/js/components/RichTextEditor';
import { useNotifications } from '@/back/js/hooks/useNotification';
import { router, useForm } from '@inertiajs/react';
import { FormEventHandler, useCallback, useEffect, useRef } from 'react';
import type { Product } from 'types';

interface ProductFormProps {
    product?: Product;
    availableCategories: SelectOption[];
}

declare global {
    interface Window {
        lfmProductImageCallback_?: (items: any[]) => void;
        [key: `lfmCallback_${string}`]: (url: string) => void;
    }
}

let tempImagePickerSetUrlFunction: ((image: any) => void) | undefined = undefined;

export default function ProductForm({ product, availableCategories }: ProductFormProps) {
    const { data, setData, processing, errors, reset, recentlySuccessful } = useForm({
        title: product?.title || '',
        slug: product?.slug || '',
        primary_image: product?.primary_image || null,
        content: product?.content || '',
        summary: product?.summary || '',
        specifications: product?.specifications || [],
        images: (product?.images || []) as string[],
        is_active: product?.is_active ?? true,
        favorite: product?.favorite ?? 0,
        price: product?.price || 0,
        category_ids: product?.categories?.map((cat) => cat.id.toString()) || [],
    });

    const { success, error } = useNotifications();

    const lfmCallbackNameRef = useRef<string | null>(null);
    const originalSetUrlRef = useRef<((image: any) => void) | undefined>(undefined);

    useEffect(() => {
        return () => {
            if (lfmCallbackNameRef.current && window[lfmCallbackNameRef.current as any]) {
                delete window[lfmCallbackNameRef.current as any];
            }

            if (window.SetUrl === tempImagePickerSetUrlFunction) {
                if (originalSetUrlRef.current !== undefined) {
                    window.SetUrl = originalSetUrlRef.current;
                } else {
                    delete window.SetUrl;
                }
            }
        };
    }, []);

    useEffect(() => {
        if (recentlySuccessful) {
            success(product ? 'Product updated successfully!' : 'Product created successfully!');
            if (!product) {
                reset();
            }
        }
    }, [recentlySuccessful, product, reset, success]);

    const isSubmitDisabled = processing || !data.title || !data.price;

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        const submitData = {
            ...data,
            specifications: data.specifications,
            images: data.images,
            category_ids: data.category_ids.map((id) => id),
            price: parseFloat(data.price as any),
        };

        if (product) {
            router.put(route('admin.products.update', product.id), submitData, {
                onSuccess: () => {
                    success('Product updated successfully!');
                },
                onError: (validationErrors) => {
                    error('Failed to update product. Please check the form.');
                    console.error('Update error:', validationErrors);
                },
            });
        } else {
            router.post(route('admin.products.store'), submitData, {
                onSuccess: () => {
                    success('Product create successfully!');
                },
                onError: (validationErrors) => {
                    error('Failed to create product. Please check the form.');
                    console.error('Create error:', validationErrors);
                },
            });
        }
    };

    const handleAddImages = useCallback(() => {
        if (typeof route === 'undefined') {
            console.error('Ziggy route function is not available.');
            alert('File manager not available. Ziggy routes missing.');
            return;
        }

        const lfmCallbackName = `lfmProductImageCallback_${Date.now()}`;
        lfmCallbackNameRef.current = lfmCallbackName;

        window[lfmCallbackName as any] = (items: any[]) => {
            const newImageUrls = items.map((item) => item.url);
            setData((prevData) => {
                const updatedImages = [...prevData.images, ...newImageUrls];
                if (!prevData.primary_image && updatedImages.length > 0) {
                    return { ...prevData, images: updatedImages, primary_image: updatedImages[0] };
                }
                return { ...prevData, images: updatedImages };
            });
            delete window[lfmCallbackName as any];
            lfmCallbackNameRef.current = null;
            if (window.SetUrl === tempImagePickerSetUrlFunction) {
                if (originalSetUrlRef.current !== undefined) {
                    window.SetUrl = originalSetUrlRef.current;
                } else {
                    delete window.SetUrl;
                }
            }
        };

        if (typeof window.SetUrl === 'undefined' || window.SetUrl !== tempImagePickerSetUrlFunction) {
            originalSetUrlRef.current = window.SetUrl;
            tempImagePickerSetUrlFunction = (url: string) => {
                if (window[lfmCallbackName as any]) {
                    window[lfmCallbackName as any](url);
                } else {
                    console.warn('LFM called window.SetUrl, but the specific dynamic callback was not found or already cleaned up.');
                }
            };
            window.SetUrl = tempImagePickerSetUrlFunction;
        }

        window.open(
            route('unisharp.lfm.show') + `?type=image&multiple=1&callback=${lfmCallbackName}`,
            'LaravelFileManager',
            'width=900,height=600,directories=no,toolbar=no,location=no,status=no,menubar=no,scrollbars=no,resizable=no',
        );
    }, [setData]);

    const handleRemoveImage = useCallback(
        (indexToRemove: number) => {
            setData((prevData) => {
                const updatedImages = prevData.images.filter((_, index) => index !== indexToRemove);
                if (prevData.primary_image === prevData.images[indexToRemove]) {
                    return { ...prevData, images: updatedImages, primary_image: updatedImages[0] || null };
                }
                return { ...prevData, images: updatedImages };
            });
        },
        [setData],
    );

    const handleSetPrimaryImage = useCallback(
        (imageUrl: string) => {
            setData('primary_image', imageUrl);
        },
        [setData],
    );

    return (
        <form onSubmit={submit} className="space-y-6">
            <div>
                <TextInput
                    id="title"
                    type="text"
                    name="title"
                    value={data.title}
                    className="mt-1 block w-full"
                    label="Title"
                    error={errors.title}
                    isFocused
                    onChange={(e) => setData('title', e.target.value)}
                    required
                />
            </div>
            <div>
                <TextAreaInput
                    id="summary"
                    label="Summary"
                    name="summary"
                    value={data.summary}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    onChange={(e) => setData('summary', e.target.value)}
                />
            </div>
            <div>
                <RichTextEditor
                    id="content"
                    name="content"
                    label="Content"
                    value={data.content}
                    onChange={(html) => setData('content', html)}
                    error={errors.content}
                />
                <InputError message={errors.content} className="mt-2" />
            </div>
            <div className="flex space-x-4">
                <div className="flex-1">
                    <TextInput
                        id="price"
                        type="number"
                        name="price"
                        value={data.price}
                        className="mt-1 block w-full"
                        label="Price"
                        error={errors.price}
                        onChange={(e) => setData('price', parseFloat(e.target.value))}
                        required
                    />
                </div>
                <div className="flex-1">
                    <TextInput
                        id="favorite"
                        type="number"
                        name="favorite"
                        value={data.favorite}
                        className="mt-1 block w-full"
                        label="Favorite (0-255)"
                        error={errors.favorite}
                        onChange={(e) => setData('favorite', parseInt(e.target.value))}
                    />
                </div>
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
                <InputError message={errors.is_active} className="mt-2" />
            </div>

            <DynamicKeyValueInput
                id="specifications"
                label="Specifications"
                value={data.specifications}
                onChange={(items) => setData('specifications', items)}
                error={errors.specifications}
            />

            <div className="mt-6">
                <InputLabel htmlFor="images" value="Product Images" />
                <div className="mt-1 rounded-md border bg-gray-50 p-4">
                    <div className="mb-4 flex flex-wrap gap-4">
                        {data.images.length > 0 ? (
                            data.images.map((imageUrl, index) => (
                                <div key={index} className="relative h-48 w-48 overflow-hidden rounded-md border bg-white shadow-sm">
                                    <img
                                        src={imageUrl}
                                        alt={`Product Image ${index + 1}`}
                                        className="h-full w-full object-cover"
                                        onError={(e) => (e.currentTarget.src = 'https://via.placeholder.com/128?text=Error')}
                                    />
                                    <div className="absolute inset-0 flex flex-col justify-end bg-opacity-50 p-1 text-xs text-white">
                                        <label className="bg-opactity-50 flex items-center space-x-1 bg-black p-1">
                                            <input
                                                type="radio"
                                                name="primary_image_select"
                                                checked={data.primary_image === imageUrl}
                                                onChange={() => handleSetPrimaryImage(imageUrl)}
                                                className="text-indigo-600"
                                            />
                                            <span>Primary</span>
                                        </label>
                                        <Button
                                            type="button"
                                            onClick={() => handleRemoveImage(index)}
                                            variant="danger"
                                            className="mt-1 w-full px-1 py-0.5 text-center text-xs"
                                        >
                                            Remove
                                        </Button>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p className="text-sm text-gray-500">No images selected yet.</p>
                        )}
                    </div>
                    <Button type="button" onClick={handleAddImages} variant="secondary">
                        Add Images
                    </Button>
                    <InputError message={errors.images} className="mt-2" />
                    {errors.primary_image && <InputError message={errors.primary_image} className="mt-2" />}
                </div>
            </div>

            <div className="mt-4">
                <CustomSelect
                    label="Categories"
                    name="categories"
                    options={availableCategories}
                    values={availableCategories.filter((cat) => data.category_ids.includes(cat.value))}
                    onChange={(selectedOptions) =>
                        setData(
                            'category_ids',
                            selectedOptions.map((opt) => opt.value),
                        )
                    }
                    error={errors.category_ids}
                    multi={true}
                    placeholder="Select product categories"
                />
            </div>

            <div className="mt-4 flex items-center justify-end">
                <Button disabled={isSubmitDisabled} variant="primary">
                    {processing ? 'Saving...' : product ? 'Update Product' : 'Create Product'}
                </Button>
            </div>
        </form>
    );
}
