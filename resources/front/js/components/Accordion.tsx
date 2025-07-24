import { ChevronUp } from 'lucide-react';
import { useState } from 'react';

interface AccordionProps {
    question: string;
    answer: string;
    defaultOpen?: boolean;
}

export default function Accordion({ question, answer, defaultOpen = false }: AccordionProps) {
    const [isOpen, setIsOpen] = useState(defaultOpen);

    const toggleAccordion = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="mb-2 overflow-hidden rounded-md border border-gray-200">
            <button
                className="bg-brand-primary hover:bg-brand-primary/50 flex w-full items-center justify-between px-4 py-3 transition-colors duration-200 hover:cursor-pointer focus:outline-none"
                onClick={toggleAccordion}
                aria-expanded={isOpen}
                aria-controls={`accordion-content-${question.replace(/\s/g, '-')}`}
            >
                <span className="flex-grow text-left font-semibold text-white">{question}</span>
                <ChevronUp className={`h-5 w-5 transform text-white transition-transform duration-300 ${isOpen ? 'rotate-0' : 'rotate-180'}`} />
            </button>

            <div
                id={`accordion-content-${question.replace(/\s/g, '-')}`}
                role="region"
                className={`transition-all duration-300 ease-in-out ${
                    isOpen ? 'max-h-96 py-3 opacity-100' : 'max-h-0 py-0 opacity-0'
                } overflow-hidden`}
            >
                <div className="px-4 text-sm leading-relaxed text-gray-700" dangerouslySetInnerHTML={{ __html: answer }} />
            </div>
        </div>
    );
}
