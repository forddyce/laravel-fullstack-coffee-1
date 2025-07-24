import axios from 'axios';
import { useSnackbar } from 'notistack';
import { FormEventHandler, useCallback, useState } from 'react';

interface SubscribeFormState {
    email: string;
    processing: boolean;
    error: string | null;
    success: string | null;
}

export const useSubscribeForm = () => {
    const [formState, setFormState] = useState<SubscribeFormState>({
        email: '',
        processing: false,
        error: null,
        success: null,
    });
    const { enqueueSnackbar } = useSnackbar();

    const handleEmailChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setFormState((prevState) => ({
            ...prevState,
            email: e.target.value,
            error: null,
            success: null,
        }));
    }, []);

    const handleSubmit: FormEventHandler = useCallback(
        async (e) => {
            e.preventDefault();
            setFormState((prevState) => ({ ...prevState, processing: true, error: null, success: null }));

            try {
                const response = await axios.post(route('api.client.subscribe'), { email: formState.email });

                const { type, message } = response.data;

                if (type === 'success') {
                    setFormState((prevState) => ({ ...prevState, success: message, email: '' }));
                    enqueueSnackbar(message, { variant: 'success' });
                } else if (type === 'info') {
                    setFormState((prevState) => ({ ...prevState, success: message }));
                    enqueueSnackbar(message, { variant: 'info' });
                } else {
                    setFormState((prevState) => ({ ...prevState, error: message }));
                    enqueueSnackbar(message, { variant: 'error' });
                }
                // eslint-disable-next-line
            } catch (err: any) {
                let errorMessage = 'An unexpected error occurred.';
                if (axios.isAxiosError(err) && err.response) {
                    if (err.response.data && err.response.data.message) {
                        errorMessage = err.response.data.message;
                    }
                }
                setFormState((prevState) => ({ ...prevState, error: errorMessage }));
                enqueueSnackbar(errorMessage, { variant: 'error' });
                console.error('Subscription API error:', err);
            } finally {
                setFormState((prevState) => ({ ...prevState, processing: false }));
            }
        },
        [formState.email, enqueueSnackbar],
    );

    return {
        email: formState.email,
        processing: formState.processing,
        error: formState.error,
        success: formState.success,
        handleEmailChange,
        handleSubmit,
    };
};
