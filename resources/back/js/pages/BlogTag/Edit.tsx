import BlogTagForm from '@/back/js/components/Forms/BlogTagForm';
import AuthenticatedLayout from '@/back/js/layouts/AuthenticatedLayout';
import { PageProps } from '@inertiajs/core';
import { Head, usePage } from '@inertiajs/react';
import { BlogTag } from 'types';

interface BlogTagEditProps extends PageProps {
    blogTag: BlogTag;
}

export default function BlogTagEdit() {
    const { blogTag } = usePage<BlogTagEditProps>().props;

    return (
        <AuthenticatedLayout header={<p className="text-xl font-semibold leading-tight text-gray-800">Edit Blog Tag: {blogTag.title}</p>}>
            <Head title={`Edit Blog Tag: ${blogTag.title}`} />
            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <BlogTagForm blogTag={blogTag} />
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
