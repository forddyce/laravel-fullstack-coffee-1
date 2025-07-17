import Button from '@/back/js/components/FormElements/Button';
import CustomSelect, { SelectOption } from '@/back/js/components/FormElements/CustomSelect';
import InputError from '@/back/js/components/FormElements/InputError';
import InputLabel from '@/back/js/components/FormElements/InputLabel';
import TextAreaInput from '@/back/js/components/FormElements/TextAreaInput';
import TextInput from '@/back/js/components/FormElements/TextInput';
import ImagePicker from '@/back/js/components/ImagePicker';
import RichTextEditor from '@/back/js/components/RichTextEditor';
import { useNotifications } from '@/back/js/hooks/useNotification';
import { router, useForm } from '@inertiajs/react';
import { ChangeEvent, FormEventHandler, useEffect } from 'react';
import type { Blog } from 'types';

interface BlogFormProps {
    blog?: Blog;
    availableTags: SelectOption[];
}

export default function BlogForm({ blog, availableTags }: BlogFormProps) {
    const { data, setData, processing, errors, reset, recentlySuccessful } = useForm({
        title: blog?.title || '',
        summary: blog?.summary || '',
        featured_image: blog?.featured_image || null,
        content: blog?.content || '',
        is_active: blog?.is_active ?? true,
        published_date: blog?.published_date ? new Date(blog.published_date).toISOString().slice(0, 16) : new Date().toISOString().slice(0, 16),
        tags: blog?.tags?.map((tag) => ({ value: tag.id.toString(), label: tag.title })) || [],
    });

    const { success, error } = useNotifications();

    useEffect(() => {
        if (recentlySuccessful) {
            success(blog ? 'Blog post updated successfully!' : 'Blog post created successfully!');
            if (!blog) {
                reset();
            }
        }
    }, [recentlySuccessful, blog, reset, success]);

    const isSubmitDisabled = processing;

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        // eslint-disable-next-line
        const submitData: any = {
            ...data,
            tags: data.tags.map((tag) => tag.value),
        };

        if (blog) {
            router.put(route('admin.blogs.update', blog.id), submitData, {
                onSuccess: () => {
                    success('Blog updated successfully!');
                },
                onError: (validationErrors) => {
                    error('Failed to update blog. Please check the form.');
                    console.error('Update error:', validationErrors);
                },
            });
        } else {
            router.post(route('admin.blogs.store'), submitData, {
                onSuccess: () => {
                    success('Blog create successfully!');
                },
                onError: (validationErrors) => {
                    error('Failed to create blog. Please check the form.');
                    console.error('Update error:', validationErrors);
                },
            });
        }
    };

    return (
        <form onSubmit={submit} className="space-y-6">
            <div>
                <TextInput
                    id="title"
                    type="text"
                    name="title"
                    label="Title"
                    value={data.title}
                    className="mt-1 block w-full"
                    isFocused
                    onChange={(e) => setData('title', e.target.value)}
                    error={errors.title}
                />
            </div>

            <div>
                <TextAreaInput
                    id="summary"
                    name="summary"
                    label="Summary"
                    value={data.summary}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    onChange={(e) => setData('summary', e.target.value)}
                />
            </div>

            <ImagePicker
                id="featured_image"
                name="featured_image"
                label="Featured Image"
                value={data.featured_image}
                onChange={(url) => setData('featured_image', url)}
                error={errors.featured_image}
            />

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

            <CustomSelect
                label="Tags"
                name="tags"
                options={availableTags}
                values={data.tags}
                onChange={(selectedOptions: SelectOption[]) => setData('tags', selectedOptions as SelectOption[])}
                error={errors.tags}
                multi={true}
            />

            <div>
                <TextInput
                    id="published_date"
                    type="datetime-local"
                    name="published_date"
                    label="Published Date"
                    value={data.published_date}
                    className="mt-1 block w-full"
                    onChange={(e: ChangeEvent) => setData('published_date', (e.target as HTMLInputElement).value)}
                    error={errors.published_date}
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
                <InputError message={errors.is_active} className="mt-2" />
            </div>

            <div className="flex items-center justify-end">
                <Button disabled={isSubmitDisabled} variant="primary">
                    {processing ? 'Saving...' : blog ? 'Update Blog Post' : 'Create Blog Post'}
                </Button>
            </div>
        </form>
    );
}
