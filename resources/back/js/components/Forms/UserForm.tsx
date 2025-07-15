import type { PageProps } from '@inertiajs/core';
import { useForm } from '@inertiajs/react';
import React, { FormEventHandler, useEffect } from 'react';
import type { Role, User } from 'types';
import { useNotifications } from '../../hooks/useNotification';
import InputError from '../FormElements/InputError';
import InputLabel from '../FormElements/InputLabel';
import PrimaryButton from '../FormElements/PrimaryButton';
import TextInput from '../FormElements/TextInput';

interface UserFormProps extends PageProps {
    user?: User;
    availableRoles: Role[];
}

export default function UserForm({ user, availableRoles }: UserFormProps) {
    const { data, setData, post, put, processing, errors, reset } = useForm({
        name: user?.name || '',
        email: user?.email || '',
        password: '',
        password_confirmation: '',
        roles: user ? user.roles.map((role) => role.id.toString()) : [],
    });

    const { success, error } = useNotifications();

    useEffect(() => {
        reset('password', 'password_confirmation');
    }, [user]);

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        if (user) {
            put(route('admin.users.update', user.id), {
                onSuccess: () => {
                    success('User updated successfully!');
                },
                onError: (errors) => {
                    error('Failed to update user. Please check the form.');
                    console.error('Update error:', errors);
                },
            });
        } else {
            post(route('admin.users.store'), {
                onSuccess: () => {
                    success('User created successfully!');
                    reset();
                },
                onError: (errors) => {
                    error('Failed to create user. Please check the form.');
                    console.error('Create error:', errors);
                },
            });
        }
    };

    const handleRoleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedOptions = Array.from(e.target.selectedOptions).map((option) => option.value);
        setData('roles', selectedOptions);
    };

    return (
        <form onSubmit={submit}>
            <div>
                <InputLabel htmlFor="name" value="Name" />
                <TextInput
                    id="name"
                    name="name"
                    value={data.name}
                    className="mt-1 block w-full"
                    autoComplete="name"
                    isFocused={true}
                    onChange={(e) => setData('name', e.target.value)}
                    required
                />
                <InputError message={errors.name} className="mt-2" />
            </div>

            <div className="mt-4">
                <InputLabel htmlFor="email" value="Email" />
                <TextInput
                    id="email"
                    type="email"
                    name="email"
                    value={data.email}
                    className="mt-1 block w-full"
                    autoComplete="username"
                    onChange={(e) => setData('email', e.target.value)}
                    required
                />
                <InputError message={errors.email} className="mt-2" />
            </div>

            <div className="mt-4">
                <InputLabel htmlFor="password" value="Password" />
                <TextInput
                    id="password"
                    type="password"
                    name="password"
                    value={data.password}
                    className="mt-1 block w-full"
                    autoComplete="new-password"
                    onChange={(e) => setData('password', e.target.value)}
                    required={!user}
                />
                <InputError message={errors.password} className="mt-2" />
            </div>

            <div className="mt-4">
                <InputLabel htmlFor="password_confirmation" value="Confirm Password" />
                <TextInput
                    id="password_confirmation"
                    type="password"
                    name="password_confirmation"
                    value={data.password_confirmation}
                    className="mt-1 block w-full"
                    autoComplete="new-password"
                    onChange={(e) => setData('password_confirmation', e.target.value)}
                    required={!user || data.password.length > 0}
                />
                <InputError message={errors.password_confirmation} className="mt-2" />
            </div>

            <div className="mt-4">
                <InputLabel htmlFor="roles" value="Assign Roles" />
                <select
                    id="roles"
                    name="roles[]"
                    multiple
                    value={data.roles}
                    onChange={handleRoleChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                >
                    {availableRoles.map((role) => (
                        <option key={role.id} value={role.id.toString()}>
                            {role.name}
                        </option>
                    ))}
                </select>
                <InputError message={errors.roles} className="mt-2" />
            </div>

            <div className="mt-4 flex items-center justify-end">
                <PrimaryButton className="ms-4" disabled={processing}>
                    {user ? 'Update User' : 'Create User'}
                </PrimaryButton>
            </div>
        </form>
    );
}
