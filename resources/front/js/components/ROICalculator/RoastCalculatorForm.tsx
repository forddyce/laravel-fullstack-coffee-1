import Button from '@/back/js/components/FormElements/Button';
import InputLabel from '@/back/js/components/FormElements/InputLabel';
import React from 'react';
import { NumberFormatValues, NumericFormat } from 'react-number-format';
import { RoastCalculatorFilterState } from 'types';

interface RoastCalculatorFormProps {
    filter: RoastCalculatorFilterState;
    setFilter: React.Dispatch<React.SetStateAction<RoastCalculatorFilterState>>;
}

const RoastCalculatorForm = ({ filter, setFilter }: RoastCalculatorFormProps) => {
    const handleNumericChange = (setter: (value: number) => void) => {
        return (values: NumberFormatValues) => {
            setter(values.floatValue || 0);
        };
    };

    return (
        <div className="bg-white py-8">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-2">
                    <div className="space-y-6 rounded-lg bg-gray-50 p-6 shadow-md">
                        <div>
                            <InputLabel htmlFor="batchPerHour" value="Waktu Batch Produksi Per Jam" />
                            <input
                                id="batchPerHour"
                                type="range"
                                min="1"
                                max="6"
                                value={filter.batchPerHour}
                                onChange={(e) => {
                                    const value = parseInt(e.target.value);
                                    setFilter((prev) => ({
                                        ...prev,
                                        batchPerHour: value,
                                    }));
                                }}
                                className="range-theme-thumb mt-1 h-2 w-full cursor-pointer appearance-none rounded-lg bg-gray-200"
                            />
                            <p className="mt-2 text-right font-bold text-gray-700">
                                <span className="text-brand-primary">{filter.batchPerHour}</span> batch
                            </p>
                        </div>

                        <div>
                            <InputLabel htmlFor="productionHourPerMonth" value="Total Jam Produksi per Bulan" />
                            <div className="mt-1 flex items-center gap-2">
                                <NumericFormat
                                    id="productionHourPerMonth"
                                    allowNegative={false}
                                    className="form-input focus:border-brand-primary/50 focus:ring-brand-primary/50 flex-grow rounded-md border-gray-300 shadow-sm"
                                    value={filter.productionHourPerMonth}
                                    thousandSeparator=","
                                    onValueChange={handleNumericChange((value) => setFilter((prev) => ({ ...prev, productionHourPerMonth: value })))}
                                />
                                <span className="text-gray-700">Jam</span>
                            </div>
                        </div>

                        <div>
                            <InputLabel htmlFor="retailSalesPercent" value="Persentase Penjualan Retail" />
                            <div className="mt-1 flex items-center gap-2">
                                <input
                                    id="retailSalesPercent"
                                    type="number"
                                    min={0}
                                    max={100}
                                    value={filter.retailSalesPercent}
                                    onChange={(e) => {
                                        let value = parseInt(e.target.value);
                                        if (isNaN(value)) value = 0;
                                        if (value < 0) value = 0;
                                        if (value > 100) value = 100;
                                        setFilter((prev) => ({
                                            ...prev,
                                            retailSalesPercent: value,
                                            wholesaleSalesPercent: 100 - value,
                                        }));
                                    }}
                                />
                                <span className="text-gray-700">%</span>
                            </div>
                        </div>

                        <div>
                            <InputLabel htmlFor="wholesaleSalesPercent" value="Persentase Penjualan Wholesale" />
                            <div className="mt-1 flex items-center gap-2">
                                <input
                                    id="wholesaleSalesPercent"
                                    type="number"
                                    className="form-input focus:border-brand-primary/50 focus:ring-brand-primary/50 flex-grow rounded-md border-gray-300 bg-gray-200 shadow-sm"
                                    value={filter.wholesaleSalesPercent}
                                    disabled={true}
                                    readOnly={true}
                                />
                                <span className="text-gray-700">%</span>
                            </div>
                        </div>

                        <div>
                            <InputLabel htmlFor="retailSalePrice" value="Harga Jual Kopi Retail" />
                            <div className="mt-1 flex items-center gap-2">
                                <NumericFormat
                                    id="retailSalePrice"
                                    allowNegative={false}
                                    className="form-input focus:border-brand-primary/50 focus:ring-brand-primary/50 flex-grow rounded-md border-gray-300 shadow-sm"
                                    value={filter.retailSalePrice}
                                    thousandSeparator=","
                                    onValueChange={handleNumericChange((value) => setFilter((prev) => ({ ...prev, retailSalePrice: value })))}
                                />
                                <span className="text-gray-700">Per Kg</span>
                            </div>
                        </div>

                        <div>
                            <InputLabel htmlFor="wholesaleSalePrice" value="Harga Jual Kopi Wholesale" />
                            <div className="mt-1 flex items-center gap-2">
                                <NumericFormat
                                    id="wholesaleSalePrice"
                                    allowNegative={false}
                                    className="form-input focus:border-brand-primary/50 focus:ring-brand-primary/50 flex-grow rounded-md border-gray-300 shadow-sm"
                                    value={filter.wholesaleSalePrice}
                                    thousandSeparator=","
                                    onValueChange={handleNumericChange((value) => setFilter((prev) => ({ ...prev, wholesaleSalePrice: value })))}
                                />
                                <span className="text-gray-700">Per Kg</span>
                            </div>
                        </div>

                        <div>
                            <InputLabel htmlFor="beanAcquisitionPrice" value="Harga Perolehan Kopi Green Bean" />
                            <div className="mt-1 flex items-center gap-2">
                                <NumericFormat
                                    id="beanAcquisitionPrice"
                                    allowNegative={false}
                                    className="form-input focus:border-brand-primary/50 focus:ring-brand-primary/50 flex-grow rounded-md border-gray-300 shadow-sm"
                                    value={filter.beanAcquisitionPrice}
                                    thousandSeparator=","
                                    onValueChange={handleNumericChange((value) => setFilter((prev) => ({ ...prev, beanAcquisitionPrice: value })))}
                                />
                                <span className="text-gray-700">Per Kg</span>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-6 rounded-lg bg-gray-50 p-6 shadow-md">
                        <div>
                            <InputLabel htmlFor="roastShrinkagePercent" value="Penyusutan Roasting per Kg" />
                            <div className="mt-1 flex items-center gap-2">
                                <input
                                    id="roastShrinkagePercent"
                                    type="number"
                                    min={0}
                                    max={100}
                                    className="form-input focus:border-brand-primary/50 focus:ring-brand-primary/50 flex-grow rounded-md border-gray-300 shadow-sm"
                                    value={filter.roastShrinkagePercent}
                                    onChange={(e) => {
                                        let value = parseInt(e.target.value);
                                        if (isNaN(value)) value = 0;
                                        if (value < 0) value = 0;
                                        if (value > 100) value = 100;
                                        setFilter((prev) => ({ ...prev, roastShrinkagePercent: value }));
                                    }}
                                />
                                <span className="text-gray-700">%</span>
                            </div>
                        </div>

                        <div>
                            <InputLabel htmlFor="packagingRetailPrice" value="Biaya Packaging Retail" />
                            <div className="mt-1 flex items-center gap-2">
                                <NumericFormat
                                    id="packagingRetailPrice"
                                    allowNegative={false}
                                    className="form-input focus:border-brand-primary/50 focus:ring-brand-primary/50 flex-grow rounded-md border-gray-300 shadow-sm"
                                    value={filter.packagingRetailPrice}
                                    thousandSeparator=","
                                    onValueChange={handleNumericChange((value) => setFilter((prev) => ({ ...prev, packagingRetailPrice: value })))}
                                />
                                <span className="text-gray-700">Rp</span>
                            </div>
                        </div>

                        <div>
                            <InputLabel htmlFor="packagingWholesalePrice" value="Biaya Packaging Wholesale" />
                            <div className="mt-1 flex items-center gap-2">
                                <NumericFormat
                                    id="packagingWholesalePrice"
                                    allowNegative={false}
                                    className="form-input focus:border-brand-primary/50 focus:ring-brand-primary/50 flex-grow rounded-md border-gray-300 shadow-sm"
                                    value={filter.packagingWholesalePrice}
                                    thousandSeparator=","
                                    onValueChange={handleNumericChange((value) => setFilter((prev) => ({ ...prev, packagingWholesalePrice: value })))}
                                />
                                <span className="text-gray-700">Rp</span>
                            </div>
                        </div>

                        <div>
                            <InputLabel htmlFor="workforceCost" value="Tenaga Kerja" />
                            <div className="mt-1 flex items-center gap-2">
                                <NumericFormat
                                    id="workforceCost"
                                    allowNegative={false}
                                    className="form-input focus:border-brand-primary/50 focus:ring-brand-primary/50 flex-grow rounded-md border-gray-300 shadow-sm"
                                    value={filter.workforceCost}
                                    thousandSeparator=","
                                    onValueChange={handleNumericChange((value) => setFilter((prev) => ({ ...prev, workforceCost: value })))}
                                />
                                <span className="text-gray-700">Rp</span>
                            </div>
                        </div>

                        <div>
                            <InputLabel htmlFor="rentCost" value="Sewa Tempat" />
                            <div className="mt-1 flex items-center gap-2">
                                <NumericFormat
                                    id="rentCost"
                                    allowNegative={false}
                                    className="form-input focus:border-brand-primary/50 focus:ring-brand-primary/50 flex-grow rounded-md border-gray-300 shadow-sm"
                                    value={filter.rentCost}
                                    thousandSeparator=","
                                    onValueChange={handleNumericChange((value) => setFilter((prev) => ({ ...prev, rentCost: value })))}
                                />
                                <span className="text-gray-700">Rp</span>
                            </div>
                        </div>

                        <div>
                            <InputLabel htmlFor="utilitiesCost" value="Listrik dan Lain Lain" />
                            <div className="mt-1 flex items-center gap-2">
                                <NumericFormat
                                    id="utilitiesCost"
                                    allowNegative={false}
                                    className="form-input focus:border-brand-primary/50 focus:ring-brand-primary/50 flex-grow rounded-md border-gray-300 shadow-sm"
                                    value={filter.utilitiesCost}
                                    thousandSeparator=","
                                    onValueChange={handleNumericChange((value) => setFilter((prev) => ({ ...prev, utilitiesCost: value })))}
                                />
                                <span className="text-gray-700">Rp</span>
                            </div>
                        </div>

                        <div>
                            <InputLabel htmlFor="maintenanceCost" value="Biaya perawatan dan maintenance mesin" />
                            <div className="mt-1 flex items-center gap-2">
                                <NumericFormat
                                    id="maintenanceCost"
                                    allowNegative={false}
                                    className="form-input focus:border-brand-primary/50 focus:ring-brand-primary/50 flex-grow rounded-md border-gray-300 shadow-sm"
                                    value={filter.maintenanceCost}
                                    thousandSeparator=","
                                    onValueChange={handleNumericChange((value) => setFilter((prev) => ({ ...prev, maintenanceCost: value })))}
                                />
                                <span className="text-gray-700">Rp</span>
                            </div>
                        </div>

                        <div className="text-right">
                            <Button
                                type="button"
                                variant="primary"
                                onClick={(e) => {
                                    e.preventDefault();
                                    const element = document.getElementById('roastingRoiTable');
                                    if (element) {
                                        element.scrollIntoView({ behavior: 'smooth' });
                                    }
                                }}
                            >
                                Lihat Hasil
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RoastCalculatorForm;
