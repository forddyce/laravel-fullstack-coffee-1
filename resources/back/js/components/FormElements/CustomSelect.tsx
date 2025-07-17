import type { SelectProps } from 'react-dropdown-select';
import Select from 'react-dropdown-select';
import InputError from './InputError';
import InputLabel from './InputLabel';

export interface SelectOption {
    value: string;
    label: string;
    [key: string]: any;
}

interface CustomSelectProps extends SelectProps<SelectOption> {
    values: SelectOption[];
    onChange: (e: SelectOption[]) => void;
    options: SelectOption[];
    label: string;
    name: string;
    error?: string;
    className?: string;
}

export default function CustomSelect({ values, onChange, options, label, error, name, className = '', ...rest }: CustomSelectProps) {
    return (
        <div className={className}>
            <InputLabel htmlFor={name} value={label} />
            <Select<SelectOption>
                values={values}
                onChange={onChange}
                options={options}
                name={name}
                className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 ${className}`}
                {...rest}
            />
            {error && <InputError message={error} className="mt-2" />}
        </div>
    );
}
