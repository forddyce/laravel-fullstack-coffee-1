import type { PageProps } from '@inertiajs/core';
import { router, usePage } from '@inertiajs/react';
import { OptionsObject, SnackbarKey, useSnackbar, VariantType } from 'notistack';
import { useCallback, useEffect } from 'react';

interface AppSpecificPageProps extends PageProps {
    flash: {
        success?: string;
        error?: string;
    };
}

interface ConfirmActionProps {
    snackbarKey: SnackbarKey;
    onConfirm: () => void;
    onCancel: () => void;
    confirmText?: string;
    cancelText?: string;
}

const ConfirmAction = ({ snackbarKey, onConfirm, onCancel, confirmText = 'Confirm', cancelText = 'Cancel' }: ConfirmActionProps) => {
    const { closeSnackbar } = useSnackbar();

    const handleConfirm = () => {
        onConfirm();
        closeSnackbar(snackbarKey);
    };

    const handleCancel = () => {
        onCancel();
        closeSnackbar(snackbarKey);
    };

    return (
        <>
            <button
                onClick={handleConfirm}
                className="rounded-md px-2 py-1 text-sm font-bold text-white transition-colors hover:bg-green-600"
                style={{ backgroundColor: 'rgba(255,255,255,0.2)' }} // Example styling
            >
                {confirmText}
            </button>
            <button
                onClick={handleCancel}
                className="ml-2 rounded-md px-2 py-1 text-sm font-bold text-white transition-colors hover:bg-red-600"
                style={{ backgroundColor: 'rgba(255,255,255,0.2)' }} // Example styling
            >
                {cancelText}
            </button>
        </>
    );
};

export const useNotifications = () => {
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();
    const { props, url } = usePage<AppSpecificPageProps>();
    const { flash } = props;

    const showNotification = useCallback(
        (message: string, variant: VariantType, options?: OptionsObject) => {
            enqueueSnackbar(message, { variant, ...options });
        },
        [enqueueSnackbar],
    );

    const success = useCallback((message: string, options?: OptionsObject) => showNotification(message, 'success', options), [showNotification]);
    const error = useCallback((message: string, options?: OptionsObject) => showNotification(message, 'error', options), [showNotification]);
    const warning = useCallback((message: string, options?: OptionsObject) => showNotification(message, 'warning', options), [showNotification]);
    const info = useCallback((message: string, options?: OptionsObject) => showNotification(message, 'info', options), [showNotification]);

    const confirm = useCallback(
        (message: string, onConfirmCallback: () => void, onCancelCallback?: () => void, confirmOptions?: OptionsObject) => {
            enqueueSnackbar(message, {
                variant: 'warning',
                persist: true,
                action: (snackbarKey) => (
                    <ConfirmAction
                        snackbarKey={snackbarKey}
                        onConfirm={onConfirmCallback}
                        onCancel={onCancelCallback || (() => {})}
                        confirmText="Yes"
                        cancelText="No"
                    />
                ),
                ...confirmOptions,
            });
        },
        [enqueueSnackbar],
    );

    useEffect(() => {
        if (flash?.success) {
            success(flash.success);
            router.get(url, {}, { preserveScroll: true, preserveState: true });
        }
        if (flash?.error) {
            error(flash.error);
            router.get(url, {}, { preserveScroll: true, preserveState: true });
        }
    }, [flash, success, error]);

    return { success, error, warning, info, confirm, closeSnackbar };
};
