import { useNotifications } from '@/back/js/hooks/useNotification';
import { useForm } from '@inertiajs/react';
import { SubmitEventHandler, useEffect } from 'react';
import { Season } from 'types';
import Button from '../FormElements/Button';
import InputError from '../FormElements/InputError';
import InputLabel from '../FormElements/InputLabel';
import TextInput from '../FormElements/TextInput';

interface SeasonFormProps {
    season?: Season;
}

export default function SeasonForm({ season }: SeasonFormProps) {
    const { data, setData, post, put, processing, errors, reset } = useForm({
        title: season?.title || '',
        sort_order: season?.sort_order ?? 0,
        is_active: season?.is_active ?? true,
    });

    const { success, error } = useNotifications();

    useEffect(() => {
        setData({
            title: season?.title || '',
            sort_order: season?.sort_order ?? 0,
            is_active: season?.is_active ?? true,
        });
        reset();
    }, [season]);

    const submit: SubmitEventHandler = (e) => {
        e.preventDefault();

        if (season) {
            put(route('admin.seasons.update', season.id), {
                onSuccess: () => success('Season updated successfully!'),
                onError: () => error('Failed to update season. Please check the form.'),
            });
        } else {
            post(route('admin.seasons.store'), {
                onSuccess: () => {
                    success('Season created successfully!');
                    reset();
                },
                onError: () => error('Failed to create season. Please check the form.'),
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
                    isFocused
                    onChange={(e) => setData('title', e.target.value)}
                    required
                    label="Season Title"
                    error={errors.title}
                />
            </div>

            <div>
                <InputLabel htmlFor="sort_order" value="Sort Order" />
                <input
                    id="sort_order"
                    type="number"
                    name="sort_order"
                    min={0}
                    value={data.sort_order}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    onChange={(e) => setData('sort_order', parseInt(e.target.value) || 0)}
                />
                {errors.sort_order && <InputError message={errors.sort_order} className="mt-2" />}
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

            <div className="mt-6 flex items-center justify-end">
                <Button disabled={isSubmitDisabled} variant="primary">
                    {processing ? 'Saving...' : season ? 'Update Season' : 'Create Season'}
                </Button>
            </div>
        </form>
    );
}
