import { SVGProps } from 'react';

export default function ApplicationLogo(props: SVGProps<SVGSVGElement>) {
    return (
        <svg {...props} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
                d="M11.395 44.428C4.557 40.134 0 32.657 0 24 0 10.745 10.745 0 24 0s24 10.745 24 24c0 8.657-4.557 16.134-11.395 20.428z"
                fill="#6875F5"
            />
            <path d="M14.134 45.885C7.906 44.018 3.515 39.513 1.433 33.075L17.949 17.587L14.134 45.885z" fill="#6875F5" />
            <circle cx="24" cy="24" r="16" fill="#fff" />
            <text x="24" y="29" textAnchor="middle" fontSize="12" fontFamily="Arial" fill="#000">
                L
            </text>
        </svg>
    );
}
