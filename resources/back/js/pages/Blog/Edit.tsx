import { SelectOption } from '@/back/js/components/FormElements/CustomSelect';
import BlogForm from '@/back/js/components/Forms/BlogForm';
import AuthenticatedLayout from '@/back/js/layouts/AuthenticatedLayout';
import { PageProps } from '@inertiajs/core';
import { Head, usePage } from '@inertiajs/react';
import { Blog, BlogTag } from 'types';

interface BlogEditProps extends PageProps {
    blog: Blog;
    availableTags: BlogTag[];
}

export default function BlogEdit() {
    const { blog, availableTags } = usePage<BlogEditProps>().props;

    const formattedAvailableTags: SelectOption[] = availableTags.map((tag) => ({
        value: tag.id.toString(),
        label: tag.title,
    }));

    return (
        <AuthenticatedLayout header={<p className="text-xl font-semibold leading-tight text-gray-800">Edit Blog Post</p>}>
            <Head title={`Edit Blog Post: ${blog.title}`} />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <BlogForm blog={blog} availableTags={formattedAvailableTags} />
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
