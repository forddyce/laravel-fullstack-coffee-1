import axios from 'axios';
import { Instagram as InstagramIcon } from 'lucide-react';
import { useEffect, useState } from 'react';

interface InstagramImage {
    id: string;
    url: string;
    thumbnail_url: string;
    permalink: string;
    caption: string;
    timestamp: string;
}

export default function InstagramSection() {
    const [images, setImages] = useState<InstagramImage[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchInstagramFeed = async () => {
            try {
                const response = await axios.get(route('api.client.instagram.latest'));
                console.log({ response });
                setImages(response.data.data);
                setLoading(false);
            } catch (err) {
                setError('Failed to load Instagram feed. (Ensure API key is valid)');
                setLoading(false);
                console.error('Instagram API Error:', err);
            }
        };

        fetchInstagramFeed();
    }, []);

    if (loading) {
        return <section className="bg-white py-16 text-center">Loading Instagram feed...</section>;
    }

    if (error) {
        return <section className="bg-white py-16 text-center text-red-600">{error}</section>;
    }

    if (images.length === 0) {
        return <section className="bg-white py-16 text-center text-gray-500">No Instagram images to display.</section>;
    }

    return (
        <section className="bg-white pt-16">
            <div className="relative overflow-hidden">
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
                    {images.map((image) => (
                        <a
                            key={image.id}
                            href={image.permalink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group relative block aspect-square overflow-hidden"
                        >
                            <img
                                src={image.thumbnail_url}
                                alt={image.caption || 'Instagram Post'}
                                className="absolute inset-0 h-full w-full object-contain transition-transform duration-300 group-hover:scale-105"
                                onError={(e) => {
                                    e.currentTarget.onerror = null;
                                    e.currentTarget.src = 'https://placehold.co/300x300?text=Image+Error';
                                }}
                            />
                            <div className="absolute inset-0 flex items-center justify-center">
                                <InstagramIcon size={32} className="text-white opacity-0 group-hover:opacity-100" />
                            </div>
                        </a>
                    ))}
                </div>
            </div>
        </section>
    );
}
