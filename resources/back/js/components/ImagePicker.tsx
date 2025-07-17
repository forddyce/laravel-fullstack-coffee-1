import React, { useCallback, useEffect, useRef, useState } from 'react';
import Button from './FormElements/Button';
import InputError from './FormElements/InputError';
import InputLabel from './FormElements/InputLabel';
import TextInput from './FormElements/TextInput';

interface ImagePickerProps {
    id: string;
    name: string;
    value: string | null;
    label: string;
    error?: string;
    onChange: (value: string | null) => void;
    className?: string;
}

declare global {
    interface Window {
        SetUrl?: (url: string) => void;
        [key: `lfmCallback_${number}`]: (url: string) => void;
    }
}

let tempImagePickerSetUrlFunction: ((image: any) => void) | undefined = undefined;

export default function ImagePicker({ id, name, value, label, error, onChange, className }: ImagePickerProps) {
    const [previewUrl, setPreviewUrl] = useState<string | null>(value);
    const [inputValue, setInputValue] = useState<string>(value || '');

    const lfmCallbackNameRef = useRef<string | null>(null);
    const originalSetUrlRef = useRef<((image: any) => void) | undefined>(undefined);

    useEffect(() => {
        return () => {
            if (lfmCallbackNameRef.current && window[lfmCallbackNameRef.current as any]) {
                delete window[lfmCallbackNameRef.current as any];
            }

            if (window.SetUrl === tempImagePickerSetUrlFunction) {
                if (originalSetUrlRef.current !== undefined) {
                    window.SetUrl = originalSetUrlRef.current;
                } else {
                    delete window.SetUrl;
                }
            }
        };
    }, []);

    useEffect(() => {
        setPreviewUrl(value);
        setInputValue(value || '');
    }, [value]);

    const openFileManager = useCallback(() => {
        if (typeof route === 'undefined') {
            console.error('Ziggy route function is not available. Please ensure Ziggy is configured.');
            return;
        }

        const type = 'image';
        const multiple = 0;
        const uniqueCallbackName = `lfmCallback_${Date.now()}`;
        lfmCallbackNameRef.current = uniqueCallbackName;

        window[uniqueCallbackName as any] = (image: any) => {
            console.log({ image });
            onChange(image[0].url);
            delete window[uniqueCallbackName as any];
            lfmCallbackNameRef.current = null;
            if (window.SetUrl === tempImagePickerSetUrlFunction) {
                if (originalSetUrlRef.current !== undefined) {
                    window.SetUrl = originalSetUrlRef.current;
                } else {
                    delete window.SetUrl;
                }
            }
        };

        if (typeof window.SetUrl === 'undefined' || window.SetUrl !== tempImagePickerSetUrlFunction) {
            originalSetUrlRef.current = window.SetUrl;
            tempImagePickerSetUrlFunction = (url: string) => {
                if (window[uniqueCallbackName as any]) {
                    window[uniqueCallbackName as any](url);
                } else {
                    console.warn('LFM called window.SetUrl, but the specific dynamic callback was not found or already cleaned up.');
                }
            };
            window.SetUrl = tempImagePickerSetUrlFunction;
        }

        const lfmUrl = route('unisharp.lfm.show') + `?type=${type}&multiple=${multiple}&callback=${uniqueCallbackName}`;

        window.open(
            lfmUrl,
            'FileManager',
            'width=900,height=600,directories=no,toolbar=no,location=no,status=no,menubar=no,scrollbars=no,resizable=no',
        );
    }, [id, onChange]);

    const handleClear = useCallback(() => {
        onChange(null);
        setPreviewUrl(null);
        setInputValue('');
    }, [onChange]);

    const handleInputChange = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            const url = e.target.value;
            setInputValue(url);
            if (url.startsWith('http') || url.startsWith('/') || url === '') {
                setPreviewUrl(url);
                onChange(url);
            }
        },
        [onChange],
    );

    return (
        <div className={className}>
            <InputLabel htmlFor={id} value={label} />
            <div className="mt-1 flex items-center space-x-2">
                <TextInput
                    id={id}
                    type="text"
                    name={name}
                    value={inputValue}
                    className="flex-grow"
                    onChange={handleInputChange}
                    placeholder="Enter image URL or browse..."
                    error={error}
                />
                <Button type="button" onClick={openFileManager}>
                    Browse
                </Button>
                {previewUrl && (
                    <Button variant="secondary" type="button" onClick={handleClear}>
                        Clear
                    </Button>
                )}
            </div>

            {error && <InputError message={error} className="mt-2" />}

            {previewUrl && (
                <div className="mt-4 flex items-center justify-center rounded-md border bg-gray-50 p-2">
                    <img
                        src={previewUrl}
                        alt="Image Preview"
                        className="h-auto max-h-60 max-w-full object-contain"
                        onError={(e) => {
                            e.currentTarget.onerror = null;
                            e.currentTarget.src = 'https://placehold.co/150?text=Image+Load+Error';
                            e.currentTarget.alt = 'Image could not be loaded';
                        }}
                    />
                </div>
            )}
        </div>
    );
}
