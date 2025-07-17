import TextInput from '@/back/js/components/FormElements/TextInput';
import GuestLayout from '@/back/js/layouts/GuestLayout';
import { Head, useForm } from '@inertiajs/react';
import { useEffect } from 'react';
import Button from '../../components/FormElements/Button';

export default function Login() {
    const { data, setData, post, processing, errors, reset } = useForm<{
        email: string;
        password: string;
        remember: boolean;
    }>({
        email: '',
        password: '',
        remember: false,
    });

    useEffect(() => {
        return () => {
            reset('password');
        };
    }, []);

    const submit = (e: React.FormEvent) => {
        if (processing) return true;
        e.preventDefault();
        post(route('admin.login'));
    };

    return (
        <GuestLayout>
            <Head title="Admin Log in" />
            <form onSubmit={submit} className="rounded-lg bg-white p-6">
                <h2 className="mb-6 text-center text-2xl font-bold">Admin Login</h2>

                <div>
                    <TextInput
                        id="email"
                        type="email"
                        name="email"
                        value={data.email}
                        className="mt-1 block w-full"
                        autoComplete="username"
                        isFocused={true}
                        onChange={(e) => setData('email', e.target.value)}
                        label="Email"
                        error={errors.email}
                        required={true}
                    />
                </div>

                <div className="mt-4">
                    <TextInput
                        id="password"
                        type="password"
                        name="password"
                        value={data.password}
                        className="mt-1 block w-full"
                        autoComplete="current-password"
                        onChange={(e) => setData('password', e.target.value)}
                        label="Password"
                        error={errors.password}
                        required={true}
                    />
                </div>

                <div className="mt-4 block">
                    <label className="flex items-center">
                        <input
                            type="checkbox"
                            name="remember"
                            checked={data.remember}
                            onChange={(e) => setData('remember', (e.target as HTMLInputElement).checked)}
                            className="rounded border-gray-300 text-indigo-600 shadow-sm focus:ring-indigo-500"
                        />
                        <span className="ms-2 text-sm text-gray-600">Remember me</span>
                    </label>
                </div>

                <div className="mt-4 flex items-center justify-end">
                    <Button className="ms-4" disabled={processing}>
                        {processing ? 'Logging in...' : 'Log in'}
                    </Button>
                </div>
            </form>
        </GuestLayout>
    );
}
