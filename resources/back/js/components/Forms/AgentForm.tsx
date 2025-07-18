import Button from '@/back/js/components/FormElements/Button';
import InputError from '@/back/js/components/FormElements/InputError';
import InputLabel from '@/back/js/components/FormElements/InputLabel';
import TextAreaInput from '@/back/js/components/FormElements/TextAreaInput';
import TextInput from '@/back/js/components/FormElements/TextInput';
import { useNotifications } from '@/back/js/hooks/useNotification';
import { useForm } from '@inertiajs/react';
import { ChangeEvent, FormEventHandler, useEffect } from 'react';
import type { Agent } from 'types';

interface AgentFormProps {
    agent?: Agent;
}

export default function AgentForm({ agent }: AgentFormProps) {
    const { data, setData, post, put, processing, errors, reset, recentlySuccessful } = useForm({
        title: agent?.title || '',
        content: agent?.content || '',
        latitude: agent?.latitude || 0,
        longitude: agent?.longitude || 0,
        is_active: agent?.is_active ?? true,
    });

    const { success, error } = useNotifications();

    useEffect(() => {
        setData({
            title: agent?.title || '',
            content: agent?.content || '',
            latitude: agent?.latitude || 0,
            longitude: agent?.longitude || 0,
            is_active: agent?.is_active ?? true,
        });
        reset();
    }, [agent]);

    const isSubmitDisabled = processing || !data.title || data.latitude === null || data.longitude === null;

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        if (agent) {
            put(route('admin.agents.update', agent.id), {
                onSuccess: () => {
                    success('Agent updated successfully!');
                },
                onError: (validationErrors) => {
                    error('Failed to update agent. Please check the form.');
                    console.error('Update error:', validationErrors);
                },
            });
        } else {
            post(route('admin.agents.store'), {
                onSuccess: () => {
                    success('Agent created successfully!');
                    reset();
                },
                onError: (validationErrors) => {
                    error('Failed to create agent. Please check the form.');
                    console.error('Create error:', validationErrors);
                },
            });
        }
    };

    useEffect(() => {
        if (recentlySuccessful) {
            success(agent ? 'Agent updated successfully!' : 'Agent created successfully!');
            if (!agent) {
                reset();
            }
        }
    }, [recentlySuccessful, agent, reset, success]);

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
                    label="Title"
                    error={errors.title}
                />
            </div>

            <div>
                <TextAreaInput
                    id="content"
                    name="content"
                    label="Content"
                    value={data.content}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    onChange={(e) => setData('content', e.target.value)}
                />
            </div>

            <div>
                <TextInput
                    id="latitude"
                    type="number"
                    step="any"
                    name="latitude"
                    value={data.latitude}
                    className="mt-1 block w-full"
                    onChange={(e) => setData('latitude', parseFloat(e.target.value))}
                    required
                    label="Latitude"
                    error={errors.latitude}
                />
            </div>

            <div>
                <TextInput
                    id="longitude"
                    type="number"
                    step="any"
                    name="longitude"
                    value={data.longitude}
                    className="mt-1 block w-full"
                    onChange={(e: ChangeEvent) => setData('longitude', parseFloat((e.target as HTMLInputElement).value))}
                    required
                    label="Longitude"
                    error={errors.longitude}
                />
            </div>

            <div className="flex items-center">
                <input
                    id="is_active"
                    type="checkbox"
                    name="is_active"
                    checked={data.is_active}
                    className="rounded border-gray-300 text-indigo-600 shadow-sm focus:ring-indigo-500"
                    onChange={(e) => setData('is_active', (e.target as HTMLInputElement).checked)}
                />
                <InputLabel htmlFor="is_active" value="Active" className="mb-0 ml-2" />
                {errors.is_active && <InputError message={errors.is_active} className="mt-2" />}
            </div>

            <div className="flex items-center justify-end">
                <Button disabled={isSubmitDisabled} variant="primary">
                    {processing ? 'Saving...' : agent ? 'Update Agent' : 'Create Agent'}
                </Button>
            </div>
        </form>
    );
}
