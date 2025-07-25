// The names/IDs of roasting machines (match keys in result state)
export const machines = ['w1', 'w3', 'w3100', 'w6100', 'w12'];

// Full names for display in table headers
export const machineDisplayNames = {
    w1: 'W1.0/W1.1',
    w3: 'W3.0',
    w3100: 'W3100IR',
    w6100: 'W6100IR',
    w12: 'W12k',
};

// Default capacities (kg/batch)
export const defaultMachineUnit = {
    w1: 1,
    w3: 3,
    w3100: 3,
    w6100: 6,
    w12: 12,
};

// Default prices (Rp)
export const defaultMachinePrice = {
    w1: 49000000,
    w3: 98000000,
    w3100: 84000000,
    w6100: 123000000,
    w12: 175000000,
};
