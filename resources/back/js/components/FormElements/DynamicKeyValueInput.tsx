import Button from '../FormElements/Button';
import InputError from './InputError';
import InputLabel from './InputLabel';
import TextInput from './TextInput';

export interface KeyValueItem {
    name: string;
    value: string;
}

interface DynamicKeyValueInputProps {
    id: string;
    label: string;
    value: KeyValueItem[];
    onChange: (items: KeyValueItem[]) => void;
    error?: string;
    className?: string;
    placeholderName?: string;
    placeholderValue?: string;
}

export default function DynamicKeyValueInput({
    id,
    label,
    value,
    onChange,
    error,
    className = '',
    placeholderName = 'Name',
    placeholderValue = 'Value',
}: DynamicKeyValueInputProps) {
    const handleItemChange = (index: number, field: 'name' | 'value', itemValue: string) => {
        const newItems = [...value];
        newItems[index] = { ...newItems[index], [field]: itemValue };
        onChange(newItems);
    };

    const handleAddItem = () => {
        onChange([...value, { name: '', value: '' }]);
    };

    const handleRemoveItem = (index: number) => {
        const newItems = value.filter((_, i) => i !== index);
        onChange(newItems);
    };

    return (
        <div className={className}>
            <InputLabel htmlFor={id} value={label} />
            <div className="mt-1 space-y-3">
                {value.map((item, index) => (
                    <div key={index} className="flex items-end space-x-2">
                        <div className="flex-1">
                            <TextInput
                                id={`${id}-name-${index}`}
                                type="text"
                                value={item.name}
                                className="w-full"
                                onChange={(e) => handleItemChange(index, 'name', e.target.value)}
                                placeholder={placeholderName}
                            />
                        </div>
                        <div className="flex-1">
                            <TextInput
                                id={`${id}-value-${index}`}
                                type="text"
                                value={item.value}
                                className="w-full"
                                onChange={(e) => handleItemChange(index, 'value', e.target.value)}
                                placeholder={placeholderValue}
                            />
                        </div>
                        <Button type="button" onClick={() => handleRemoveItem(index)} variant="danger" className="shrink-0">
                            Remove
                        </Button>
                    </div>
                ))}
                <Button type="button" onClick={handleAddItem} variant="secondary">
                    Add Item
                </Button>
            </div>
            {error && <InputError message={error} className="mt-2" />}
        </div>
    );
}
