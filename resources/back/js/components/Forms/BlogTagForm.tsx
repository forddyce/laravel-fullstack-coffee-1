import { useNotifications } from '@/back/js/hooks/useNotification';
import { useForm } from '@inertiajs/react';
import { FormEventHandler, useEffect } from 'react';
import { BlogTag } from 'types';
import Button from '../FormElements/Button';
import TextInput from '../FormElements/TextInput';

interface BlogTagFormProps {
    blogTag?: BlogTag;
}

export default function BlogTagForm({ blogTag }: BlogTagFormProps) {
    const { data, setData, post, put, processing, errors, reset } = useForm({
        title: blogTag?.title || '',
        is_active: blogTag?.is_active ?? true,
    });

    const { success, error } = useNotifications();

    useEffect(() => {
        setData({
            title: blogTag?.title || '',
            is_active: blogTag?.is_active ?? true,
        });
        reset();
    }, [blogTag]);

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        if (blogTag) {
            put(route('admin.blog-tags.update', blogTag.id), {
                onSuccess: () => {
                    success('Blog Tag updated successfully!');
                },
                onError: (validationErrors) => {
                    error('Failed to update blog tag. Please check the form.');
                    console.error('Update error:', validationErrors);
                },
            });
        } else {
            post(route('admin.blog-tags.store'), {
                onSuccess: () => {
                    success('Blog Tag created successfully!');
                    reset();
                },
                onError: (validationErrors) => {
                    error('Failed to create blog tag. Please check the form.');
                    console.error('Create error:', validationErrors);
                },
            });
        }
    };

    const isSubmitDisabled = processing || !data.title;

    return (
        <form onSubmit={submit} className="space-y-6">
            <div>
                <TextInput
                    id="title"
                    type="text"
                    name="title"
                    value={data.title}
                    className="mt-1 block w-full"
                    autoComplete="title"
                    isFocused={true}
                    onChange={(e) => setData('title', e.target.value)}
                    required
                    label="Tag Title"
                    error={errors.title}
                />
            </div>

            <div className="flex items-center">
                <input
                    type="checkbox"
                    id="is_active"
                    name="is_active"
                    checked={data.is_active}
                    onChange={(e) => setData('is_active', e.target.checked)}
                    className="rounded border-gray-300 text-indigo-600 shadow-sm focus:ring-indigo-500"
                />
                <label htmlFor="is_active" className="ml-2 text-sm text-gray-600">
                    Is Active
                </label>
            </div>
            {errors.is_active && <p className="text-sm text-red-600">{errors.is_active}</p>}

            <div className="flex items-center justify-end">
                <Button disabled={isSubmitDisabled}>{processing ? 'Saving...' : blogTag ? 'Update Tag' : 'Create Tag'}</Button>
            </div>
        </form>
    );
}
