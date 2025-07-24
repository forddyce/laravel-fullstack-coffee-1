import RoastCalculatorForm from '@/front/js/components/ROICalculator/RoastCalculatorForm';
import RoastCalculatorResult from '@/front/js/components/ROICalculator/RoastCalculatorResult'; // Import the result component
import ClientLayout from '@/front/js/layouts/ClientLayout';
import { Head } from '@inertiajs/react';
import { useState } from 'react';
import { RoastCalculatorFilterState } from 'types'; // Import the filter state type

export default function RoastCalculatorPage() {
    // Initialize the filter state with default values
    const [filter, setFilter] = useState<RoastCalculatorFilterState>({
        batchPerHour: 1,
        productionHourPerMonth: 176, // 22 hari * 8 jam/hari = 176 jam
        retailSalesPercent: 70,
        wholesaleSalesPercent: 30, // Derived
        retailSalePrice: 150000,
        wholesaleSalePrice: 120000,
        beanAcquisitionPrice: 80000,
        roastShrinkagePercent: 18,
        packagingRetailPrice: 3000,
        packagingWholesalePrice: 2000,
        workforceCost: 3500000,
        rentCost: 0,
        utilitiesCost: 1000000,
        maintenanceCost: 500000,
    });

    return (
        <ClientLayout>
            <Head title="ROI Calculator" />

            <div className="py-8">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <h1 className="title-underline mb-6 text-center text-4xl font-bold text-gray-900">ROI Calculator</h1>

                    {/* Calculator Form */}
                    <RoastCalculatorForm filter={filter} setFilter={setFilter} />

                    {/* Results Table Section (will be another component later) */}
                    <div id="roastingRoiTable" className="mt-12 bg-white py-8 shadow-md">
                        <h2 className="title-underline mb-6 text-center text-3xl font-bold text-gray-900">Hasil Perhitungan ROI</h2>
                        {/* Placeholder for results table */}
                        <RoastCalculatorResult data={filter} />
                    </div>
                </div>
            </div>
        </ClientLayout>
    );
}
