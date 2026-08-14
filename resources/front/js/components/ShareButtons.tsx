import { Link2 } from 'lucide-react';
import { useSnackbar } from 'notistack';
import { FaFacebookF, FaWhatsapp } from 'react-icons/fa';
import { FaTiktok, FaThreads, FaXTwitter } from 'react-icons/fa6';

interface ShareButtonsProps {
    title: string;
    url: string;
    className?: string;
}

export default function ShareButtons({ title, url, className = '' }: ShareButtonsProps) {
    const { enqueueSnackbar } = useSnackbar();
    const encodedUrl = encodeURIComponent(url);
    const encodedTitle = encodeURIComponent(title);

    const shareLinks = [
        {
            name: 'X',
            href: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
            icon: FaXTwitter,
            color: 'bg-black hover:bg-gray-800',
        },
        {
            name: 'Threads',
            href: `https://www.threads.net/intent/post?text=${encodedTitle}%20${encodedUrl}`,
            icon: FaThreads,
            color: 'bg-black hover:bg-gray-800',
        },
        {
            name: 'Facebook',
            href: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
            icon: FaFacebookF,
            color: 'bg-[#1877F2] hover:bg-[#1565c0]',
        },
        {
            name: 'WhatsApp',
            href: `https://wa.me/?text=${encodedTitle}%20${encodedUrl}`,
            icon: FaWhatsapp,
            color: 'bg-[#25D366] hover:bg-[#1ebc57]',
        },
        {
            name: 'TikTok',
            href: 'https://www.tiktok.com/upload',
            icon: FaTiktok,
            color: 'bg-black hover:bg-gray-800',
        },
    ];

    const handleCopyLink = async () => {
        try {
            await navigator.clipboard.writeText(url);
            enqueueSnackbar('Link copied to clipboard', { variant: 'success' });
        } catch {
            enqueueSnackbar('Failed to copy link', { variant: 'error' });
        }
    };

    return (
        <div className={`flex flex-wrap items-center gap-3 ${className}`}>
            <span className="text-sm font-medium text-gray-600">Share:</span>
            {shareLinks.map((link) => (
                <a
                    key={link.name}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Share on ${link.name}`}
                    className={`flex h-9 w-9 items-center justify-center rounded-full text-white transition-all duration-200 hover:scale-105 ${link.color}`}
                >
                    <link.icon className="h-4 w-4" />
                </a>
            ))}
            <button
                type="button"
                onClick={handleCopyLink}
                aria-label="Copy link"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-600 text-white transition-all duration-200 hover:scale-105 hover:bg-gray-700"
            >
                <Link2 className="h-4 w-4" />
            </button>
        </div>
    );
}
