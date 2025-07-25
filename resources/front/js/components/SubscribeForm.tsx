import Button from '@/back/js/components/FormElements/Button';
import TextInput from '@/back/js/components/FormElements/TextInput';
import { useSubscribeForm } from '@/front/js/hooks/useSubscribeForm';

export default function SubscribeFormSection() {
    const { email, processing, error, success, handleEmailChange, handleSubmit } = useSubscribeForm();

    return (
        <section className="bg-white py-16 text-center">
            <div className="md:max-w-1/2 mx-auto px-4 sm:px-6 lg:px-8">
                <h2 className="text-brand-primary mb-6 text-4xl font-bold">Subscribe to Our Newsletter</h2>
                <p className="mb-8 text-lg text-gray-700">Stay updated with our latest news, offers, and coffee insights!</p>

                <form onSubmit={handleSubmit} className="flex flex-col items-center justify-center gap-4 sm:flex-row">
                    <div className="w-full flex-grow sm:w-auto">
                        <TextInput
                            id="subscribe_email"
                            type="email"
                            name="email"
                            value={email}
                            onChange={handleEmailChange}
                            placeholder="Enter your email"
                            required
                            className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                        />
                    </div>
                    <div>
                        <Button
                            type="submit"
                            disabled={processing || !email}
                            variant="danger"
                            className="bg-brand-primary w-full sm:w-auto"
                            style={{ height: '59px' }}
                        >
                            {processing ? 'Subscribing...' : 'Subscribe'}
                        </Button>
                    </div>
                </form>

                {error && <p className="mt-4 text-sm text-red-600">{error}</p>}
                {success && <p className="mt-4 text-sm text-green-600">{success}</p>}
            </div>
        </section>
    );
}
