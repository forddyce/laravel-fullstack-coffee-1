import Button from '@/back/js/components/FormElements/Button';
import InputError from '@/back/js/components/FormElements/InputError';
import InputLabel from '@/back/js/components/FormElements/InputLabel';
import TextInput from '@/back/js/components/FormElements/TextInput';
import RichTextEditor from '@/back/js/components/RichTextEditor';
import { useNotifications } from '@/back/js/hooks/useNotification';
import { router, useForm } from '@inertiajs/react';
import { FormEventHandler, useEffect } from 'react';
import type { AuctionItem, AuctionItemInfo } from 'types';

interface AuctionItemFormProps {
    auctionItem?: AuctionItem;
}

export default function AuctionItemForm({ auctionItem }: AuctionItemFormProps) {
    const {
        data,
        setData,
        processing,
        errors: rawErrors,
        reset,
        recentlySuccessful,
    } = useForm({
        title: auctionItem?.title || '',
        slug: auctionItem?.slug || '',
        info:
            auctionItem?.info ||
            ({
                type: '',
                score: '',
                farmer: '',
                origin: '',
                process: '',
                auction_price: 0,
            } as any),
        content: auctionItem?.content || '',
        is_active: auctionItem?.is_active ?? true,
    });

    const errors = rawErrors as Record<string, string | undefined>;

    const { success, error } = useNotifications();

    useEffect(() => {
        setData({
            title: auctionItem?.title || '',
            slug: auctionItem?.slug || '',
            info: (auctionItem?.info || {
                type: '',
                score: '',
                farmer: '',
                origin: '',
                process: '',
                auction_price: 0,
            }) as AuctionItemInfo,
            content: auctionItem?.content || '',
            is_active: auctionItem?.is_active ?? true,
        });
        reset();
    }, [auctionItem]);

    const isSubmitDisabled = processing || !data.title;

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        const submitData = {
            ...data,
            info: {
                ...data.info,
                auction_price: parseFloat(data.info.auction_price as any),
            },
        };

        if (auctionItem) {
            router.put(route('admin.auction-items.update', auctionItem.id), submitData, {
                onSuccess: () => {
                    success('Item updated successfully!');
                },
                onError: (validationErrors) => {
                    error('Failed to update item. Please check the form.');
                    console.error('Update error:', validationErrors);
                },
            });
        } else {
            router.post(route('admin.auction-items.store'), submitData, {
                onSuccess: () => {
                    success('Item create successfully!');
                },
                onError: (validationErrors) => {
                    error('Failed to create item. Please check the form.');
                    console.error('Update error:', validationErrors);
                },
            });
        }
    };

    useEffect(() => {
        if (recentlySuccessful) {
            success(auctionItem ? 'Auction Item updated successfully!' : 'Auction Item created successfully!');
            if (!auctionItem) {
                reset();
            }
        }
    }, [recentlySuccessful, auctionItem, reset, success]);

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

            <div className="space-y-4 rounded-md border bg-gray-50 p-4">
                <h3 className="text-lg font-semibold text-gray-800">Item Information</h3>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <div>
                        <TextInput
                            id="info_type"
                            type="text"
                            name="info.type"
                            value={data.info.type}
                            onChange={(e) => setData('info', { ...data.info, type: e.target.value })}
                            label="Type"
                            error={errors['info.type']}
                        />
                    </div>
                    <div>
                        <TextInput
                            id="info_score"
                            type="text"
                            name="info.score"
                            value={data.info.score}
                            onChange={(e) => setData('info', { ...data.info, score: e.target.value })}
                            label="Score"
                            error={errors['info.score']}
                        />
                    </div>
                    <div>
                        <TextInput
                            id="info_farmer"
                            type="text"
                            name="info.farmer"
                            value={data.info.farmer}
                            onChange={(e) => setData('info', { ...data.info, farmer: e.target.value })}
                            label="Farmer"
                            error={errors['info.farmer']}
                        />
                    </div>
                    <div>
                        <TextInput
                            id="info_origin"
                            type="text"
                            name="info.origin"
                            value={data.info.origin}
                            onChange={(e) => setData('info', { ...data.info, origin: e.target.value })}
                            label="Origin"
                            error={errors['info.origin']}
                        />
                    </div>
                    <div>
                        <TextInput
                            id="info_process"
                            type="text"
                            name="info.process"
                            value={data.info.process}
                            onChange={(e) => setData('info', { ...data.info, process: e.target.value })}
                            label="Process"
                            error={errors['info.process']}
                        />
                    </div>
                    <div>
                        <TextInput
                            id="info_auction_price"
                            type="number"
                            step="0.01"
                            name="info.auction_price"
                            value={data.info.auction_price}
                            onChange={(e) => setData('info', { ...data.info, auction_price: parseFloat(e.target.value) })}
                            label="Auction Price"
                            error={errors['info.auction_price']}
                        />
                    </div>
                </div>
            </div>

            <div>
                <RichTextEditor
                    id="content"
                    name="content"
                    label="Content"
                    value={data.content}
                    onChange={(html) => setData('content', html)}
                    error={errors.content}
                />
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
                    {processing ? 'Saving...' : auctionItem ? 'Update Auction Item' : 'Create Auction Item'}
                </Button>
            </div>
        </form>
    );
}
