import { useNotifications } from '@/back/js/hooks/useNotification';
import type { PageProps } from '@inertiajs/core';
import { useForm } from '@inertiajs/react';
import { FormEventHandler, useEffect } from 'react';
import type { Role, User } from 'types';
import Button from '../FormElements/Button';
import type { SelectOption } from '../FormElements/CustomSelect';
import CustomSelect from '../FormElements/CustomSelect';
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

    const roleOptions: SelectOption[] = availableRoles.map((role) => ({
        value: role.id.toString(),
        label: role.name,
    }));

    const handleRoleChange = (selected: SelectOption[]) => {
        setData(
            'roles',
            selected.map((option) => option.value),
        );
    };

    const selectedRoleOptions: SelectOption[] = roleOptions.filter((option) => data.roles.includes(option.value));

    const isSubmitDisabled = () => {
        if (processing) {
            return true;
        }

        if (!data.name || !data.email) {
            return true;
        }

        if (!user) {
            if (!data.password || !data.password_confirmation) {
                return true;
            }
        } else {
            if (data.password && !data.password_confirmation) {
                return true;
            }
        }
        return false;
    };

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

    return (
        <form onSubmit={submit}>
            <div>
                <TextInput
                    id="name"
                    type="text"
                    name="name"
                    value={data.name}
                    className="mt-1 block w-full"
                    autoComplete="name"
                    isFocused={true}
                    onChange={(e) => setData('name', e.target.value)}
                    required
                    label="Name"
                    error={errors.name}
                />
            </div>

            <div className="mt-4">
                <TextInput
                    id="email"
                    type="email"
                    name="email"
                    value={data.email}
                    className="mt-1 block w-full"
                    autoComplete="username"
                    onChange={(e) => setData('email', e.target.value)}
                    required
                    label="Email"
                    error={errors.email}
                />
            </div>

            <div className="mt-4">
                <TextInput
                    id="password"
                    type="password"
                    name="password"
                    value={data.password}
                    className="mt-1 block w-full"
                    autoComplete="new-password"
                    onChange={(e) => setData('password', e.target.value)}
                    required={!user}
                    label="Password"
                    error={errors.password}
                />
            </div>

            <div className="mt-4">
                <TextInput
                    id="password_confirmation"
                    type="password"
                    name="password_confirmation"
                    value={data.password_confirmation}
                    className="mt-1 block w-full"
                    autoComplete="new-password"
                    onChange={(e) => setData('password_confirmation', e.target.value)}
                    required={!user || data.password.length > 0}
                    label="Confirm Password"
                    error={errors.password_confirmation}
                />
            </div>

            <div className="mt-4">
                <CustomSelect
                    label="Assign Roles"
                    name="roles"
                    multi={true}
                    options={roleOptions}
                    values={selectedRoleOptions}
                    onChange={handleRoleChange}
                    error={errors.roles}
                    placeholder="Select roles for the user"
                />
            </div>

            <div className="mt-4 flex items-center justify-end">
                <Button className="ms-4" disabled={isSubmitDisabled()}>
                    {processing ? 'Submitting...' : user ? 'Update User' : 'Create User'}
                </Button>
            </div>
        </form>
    );
}
