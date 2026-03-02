import SeasonForm from '@/back/js/components/Forms/SeasonForm';
import AuthenticatedLayout from '@/back/js/layouts/AuthenticatedLayout';
import { PageProps } from '@inertiajs/core';
import { Head, usePage } from '@inertiajs/react';
import { Season } from 'types';

interface SeasonEditProps extends PageProps {
    season: Season;
}

export default function SeasonEdit() {
    const { season } = usePage<SeasonEditProps>().props;

    return (
        <AuthenticatedLayout header={<p className="text-xl font-semibold leading-tight text-gray-800">Edit Season: {season.title}</p>}>
            <Head title={`Edit Season: ${season.title}`} />

            <div className="py-12">
                <div className="mx-auto max-w-2xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <SeasonForm season={season} />
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
