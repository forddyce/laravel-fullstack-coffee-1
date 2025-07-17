import { Editor } from '@tinymce/tinymce-react';
import { useEffect, useRef } from 'react';
import InputError from './FormElements/InputError';
import InputLabel from './FormElements/InputLabel';

interface RichTextEditorProps {
    id: string;
    name: string;
    value: string;
    label: string;
    error?: string;
    onChange: (content: string) => void;
    className?: string;
    height?: number;
}

declare global {
    interface Window {
        SetUrl?: (url: string) => void;
        [key: `lfmTinymceCallback_${number}`]: (url: string) => void;
    }
}

let temporarySetUrlFunction: ((image: any) => void) | undefined = undefined;

export default function RichTextEditor({ id, value, label, error, onChange, className, height = 500 }: RichTextEditorProps) {
    const editorRef = useRef<any>(null);
    const lfmCallbackNameRef = useRef<string | null>(null);
    const originalSetUrlRef = useRef<((image: any) => void) | undefined>(undefined);

    useEffect(() => {
        return () => {
            if (lfmCallbackNameRef.current && window[lfmCallbackNameRef.current as any]) {
                delete window[lfmCallbackNameRef.current as any];
            }

            if (window.SetUrl === temporarySetUrlFunction) {
                if (originalSetUrlRef.current !== undefined) {
                    window.SetUrl = originalSetUrlRef.current;
                } else {
                    delete window.SetUrl;
                }
            }
        };
    }, []);

    const fileBrowserCallback = (cb: (value: string, meta?: any) => void, value: string, meta: any) => {
        if (typeof route === 'undefined') {
            console.error('Ziggy route function is not available. Please ensure Ziggy is configured.');
            alert('File manager not available. Ziggy routes missing.');
            return;
        }

        const type = meta.filetype === 'image' ? 'image' : 'file';
        const lfmUrl = route('unisharp.lfm.show') + `?type=${type}&multiple=0`;

        const uniqueCallbackName = `lfmTinymceCallback_${Date.now()}`;
        lfmCallbackNameRef.current = uniqueCallbackName;

        window[uniqueCallbackName as any] = (image: any) => {
            cb(image[0].url);
            delete window[uniqueCallbackName as any];
            lfmCallbackNameRef.current = null;
            if (window.SetUrl === temporarySetUrlFunction) {
                if (originalSetUrlRef.current !== undefined) {
                    window.SetUrl = originalSetUrlRef.current;
                } else {
                    delete window.SetUrl;
                }
            }
        };

        if (typeof window.SetUrl === 'undefined' || window.SetUrl !== temporarySetUrlFunction) {
            originalSetUrlRef.current = window.SetUrl;
            temporarySetUrlFunction = (url: string) => {
                if (window[uniqueCallbackName as any]) {
                    window[uniqueCallbackName as any](url);
                } else {
                    console.warn('LFM called window.SetUrl, but the specific dynamic callback was not found or already cleaned up.');
                }
            };
            window.SetUrl = temporarySetUrlFunction;
        }

        window.open(
            lfmUrl + `&callback=${uniqueCallbackName}`,
            'FileManager',
            'width=900,height=600,directories=no,toolbar=no,location=no,status=no,menubar=no,scrollbars=no,resizable=no',
        );
    };

    return (
        <div className={className}>
            <InputLabel htmlFor={id} value={label} className="mb-1" />
            <Editor
                id={id}
                apiKey={import.meta.env.VITE_TINY_MCE_API_KEY || ''}
                onInit={(evt, editor) => (editorRef.current = editor)}
                value={value}
                onEditorChange={onChange}
                init={{
                    height: height,
                    menubar: false,
                    plugins: [
                        'advlist',
                        'autolink',
                        'lists',
                        'link',
                        'image',
                        'charmap',
                        'preview',
                        'anchor',
                        'searchreplace',
                        'visualblocks',
                        'code',
                        'fullscreen',
                        'insertdatetime',
                        'media',
                        'table',
                        'code',
                        'help',
                        'wordcount',
                    ],
                    toolbar:
                        'undo redo | blocks | ' +
                        'bold italic forecolor | alignleft aligncenter ' +
                        'alignright alignjustify | bullist numlist outdent indent | ' +
                        'link image media | code | removeformat | help',
                    content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
                    image_advtab: true,
                    relative_urls: false,
                    remove_script_host: false,
                    file_picker_callback: fileBrowserCallback,
                }}
            />
            {error && <InputError message={error} className="mt-2" />}
        </div>
    );
}
