import { SelectOption } from '@/back/js/components/FormElements/CustomSelect';
import BlogForm from '@/back/js/components/Forms/BlogForm';
import AuthenticatedLayout from '@/back/js/layouts/AuthenticatedLayout';
import { PageProps } from '@inertiajs/core';
import { Head, usePage } from '@inertiajs/react';
import type { BlogTag } from 'types';

interface BlogCreateProps extends PageProps {
    availableTags: BlogTag[];
}

export default function BlogCreate() {
    const { availableTags } = usePage<BlogCreateProps>().props;

    const formattedAvailableTags: SelectOption[] = availableTags.map((tag) => ({
        value: tag.id.toString(),
        label: tag.title,
    }));

    return (
        <AuthenticatedLayout header={<p className="text-xl font-semibold leading-tight text-gray-800">Create New Blog Post</p>}>
            <Head title="Create Blog Post" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <BlogForm availableTags={formattedAvailableTags} />
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
