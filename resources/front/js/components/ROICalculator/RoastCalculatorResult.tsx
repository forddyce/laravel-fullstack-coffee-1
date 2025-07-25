import { defaultMachinePrice, defaultMachineUnit, machineDisplayNames, machines } from '@/front/js/utils/roastMachine';
import { Fragment, useCallback, useEffect, useState } from 'react';
import type { RoastCalculatorFilterState, RoastCalculatorResultState } from 'types';

interface RoastCalculatorResultProps {
    data: RoastCalculatorFilterState;
}

const RoastCalculatorResult = ({ data }: RoastCalculatorResultProps) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [machineUnit, setMachineUnit] = useState<Record<string, number>>(defaultMachineUnit);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [machinePrice, setMachinePrice] = useState<Record<string, number>>(defaultMachinePrice);

    const [result, setResult] = useState<RoastCalculatorResultState>(() => {
        return machines.reduce((acc: RoastCalculatorResultState, m: string) => {
            acc[m] = {
                salesPerMonthKg: 0,
                avgRetailSales: 0,
                avgWholesaleSales: 0,
                salesPerMonthRetailRevenue: 0,
                salesPerMonthWholesaleRevenue: 0,
                cogsRetail: 0,
                cogsWholesale: 0,
                operationalWorkforceCost: 0,
                operationalRentCost: 0,
                operationalUtilitiesCost: 0,
                operationalMaintenanceCost: 0,
                operationalTotal: 0,
                cleanProfit: 0,
                totalCoffeeProduction: 0,
                cleanProfitMachine: 0,
                roiTimeMachine: 0,
                bep: 0,
                roiPerYear: 0,
            };
            return acc;
        }, {});
    });

    useEffect(() => {
        const calculateResults = () => {
            const newResults: RoastCalculatorResultState = {};

            machines.forEach((m) => {
                const machineCapacity = machineUnit[m];
                const totalProductionPerMonth =
                    data.batchPerHour * data.productionHourPerMonth * machineCapacity -
                    (data.roastShrinkagePercent / 100) * (data.batchPerHour * data.productionHourPerMonth);

                const retailKg = (data.retailSalesPercent / 100) * totalProductionPerMonth;
                const wholesaleKg = (data.wholesaleSalesPercent / 100) * totalProductionPerMonth;
                const cogsCalculation = data.beanAcquisitionPrice - data.beanAcquisitionPrice * (data.roastShrinkagePercent / 100);
                const cogsRetail = (cogsCalculation + data.packagingRetailPrice) * retailKg;
                const cogsWholesale = (cogsCalculation + data.packagingWholesalePrice) * wholesaleKg;

                const totalOperationalCost = data.workforceCost + data.rentCost + data.utilitiesCost + data.maintenanceCost;

                const retailRevenue = retailKg * data.retailSalePrice;
                const wholesaleRevenue = wholesaleKg * data.wholesaleSalePrice;
                const totalRevenue = retailRevenue + wholesaleRevenue;
                const netProfit = totalRevenue - cogsRetail - cogsWholesale - totalOperationalCost;

                const priceOfMachine = machinePrice[m];

                const roastedBeanProduction = (machineCapacity - machineCapacity * (data.roastShrinkagePercent / 100)) * data.batchPerHour;
                const cleanProfitMachine = netProfit / data.productionHourPerMonth;
                const roiTimeMachine = Math.round(priceOfMachine / cleanProfitMachine);
                const bep = cleanProfitMachine > 0 ? Math.round(priceOfMachine / netProfit) : 0;
                const roiPerYear = Math.round((netProfit * 12) / (priceOfMachine * 0.01));

                newResults[m] = {
                    salesPerMonthKg: totalProductionPerMonth,
                    avgRetailSales: retailKg,
                    avgWholesaleSales: wholesaleKg,
                    salesPerMonthRetailRevenue: retailRevenue,
                    salesPerMonthWholesaleRevenue: wholesaleRevenue,
                    cogsRetail: cogsRetail,
                    cogsWholesale: cogsWholesale,
                    operationalWorkforceCost: data.workforceCost,
                    operationalRentCost: data.rentCost,
                    operationalUtilitiesCost: data.utilitiesCost,
                    operationalMaintenanceCost: data.maintenanceCost,
                    operationalTotal: totalOperationalCost,
                    cleanProfit: netProfit,
                    totalCoffeeProduction: roastedBeanProduction,
                    cleanProfitMachine: cleanProfitMachine,
                    roiTimeMachine: roiTimeMachine,
                    bep: bep,
                    roiPerYear: roiPerYear,
                };
            });

            setResult(newResults);
        };

        calculateResults();
    }, [data, machineUnit, machinePrice]);

    const formatRp = useCallback((value: number | string) => {
        if (typeof value === 'string') {
            value = parseFloat(value.replace(/[^0-9.-]+/g, ''));
        }
        if (typeof value !== 'number' || value === null) return 'N/A';
        return 'Rp ' + Math.round(value).toLocaleString('id-ID');
    }, []);

    const formatPercent = useCallback((value: number | string) => {
        if (typeof value === 'string') {
            value = parseFloat(value.replace(/[^0-9.-]+/g, ''));
        }
        if (isNaN(value) || value === null) return 'N/A';
        return value.toFixed(2) + '%';
    }, []);

    // const MachinePriceRows = () => {
    //     return (
    //         <tr>
    //             <td className="px-6 py-4 text-sm font-medium text-gray-900">Harga Perolehan Mesin Roaster</td>
    //             {machines.map((m: string, index: number) => {
    //                 return (
    //                     <Fragment key={`row-input-machine-price-${m}`}>
    //                         <td className="px-3 py-2">
    //                             <NumericFormat
    //                                 allowNegative={false}
    //                                 className="block w-full rounded-md border-gray-300 bg-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-sm"
    //                                 value={machinePrice[m]}
    //                                 thousandSeparator=","
    //                                 onValueChange={handleMachineNumericChange(m, setMachinePrice)}
    //                             />
    //                         </td>
    //                         <td className="px-3 py-2 text-sm text-gray-700">Rp</td>
    //                     </Fragment>
    //                 );
    //             })}
    //         </tr>
    //     );
    // };

    return (
        <div className="max-h-150 overflow-x-auto border border-gray-200">
            <table className="min-w-full table-fixed divide-y divide-gray-200">
                <thead className="sticky top-0 z-10 bg-gray-100">
                    <tr>
                        <th className="bg-brand-primary w-1/4 px-6 py-3 text-left text-xs font-bold uppercase tracking-wider text-white">
                            Type Mesin
                        </th>
                        {machines.map((m: string) => (
                            <th
                                key={m}
                                colSpan={2}
                                className="bg-brand-primary w-1/6 px-3 py-3 text-right text-xs font-bold uppercase tracking-wider text-white"
                            >
                                {machineDisplayNames[m as keyof typeof machineDisplayNames]}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody className="h-96 divide-y divide-gray-200 overflow-y-auto bg-white">
                    <tr>
                        <td className="px-6 py-4 text-sm font-medium text-gray-900">Kapasitas Mesin (kg)</td>
                        {machines.map((m) => (
                            <Fragment key={`sales-per-month-kg-${m}`}>
                                <td colSpan={2} className="px-3 py-2 text-right text-sm text-gray-700">
                                    {machineUnit[m]}
                                </td>
                            </Fragment>
                        ))}
                    </tr>
                    <tr>
                        <td className="px-6 py-4 text-sm font-medium text-gray-900">Penjualan Kopi Roasted Per Bulan (Kg)</td>
                        {machines.map((m) => (
                            <Fragment key={`sales-per-month-kg-${m}`}>
                                <td colSpan={2} className="px-3 py-2 text-right text-sm text-gray-700">
                                    {result[m].salesPerMonthKg.toFixed(2)}
                                </td>
                            </Fragment>
                        ))}
                    </tr>
                    <tr>
                        <td className="px-6 py-4 text-sm font-medium text-gray-900">Rata-rata Penjualan Retail per Bulan (Kg)</td>
                        {machines.map((m) => (
                            <Fragment key={`avg-retail-sales-${m}`}>
                                <td colSpan={2} className="px-3 py-2 text-right text-sm text-gray-700">
                                    {result[m].avgRetailSales.toFixed(2)}
                                </td>
                            </Fragment>
                        ))}
                    </tr>

                    <tr>
                        <td className="px-6 py-4 text-sm font-medium text-gray-900">Rata-rata Penjualan Wholesale per Bulan (Kg)</td>
                        {machines.map((m) => (
                            <Fragment key={`avg-wholesale-sales-${m}`}>
                                <td colSpan={2} className="px-3 py-2 text-right text-sm text-gray-700">
                                    {result[m].avgWholesaleSales.toFixed(2)}
                                </td>
                            </Fragment>
                        ))}
                    </tr>

                    <tr>
                        <td className="px-6 py-4 text-sm font-medium text-gray-900">Harga Jual Kopi Retail (Per Kg)</td>
                        {machines.map((m) => (
                            <Fragment key={`retail-sale-price-display-${m}`}>
                                <td colSpan={2} className="px-3 py-2 text-right text-sm text-gray-700">
                                    {formatRp(data.retailSalePrice)}
                                </td>
                            </Fragment>
                        ))}
                    </tr>

                    <tr>
                        <td className="px-6 py-4 text-sm font-medium text-gray-900">Harga Jual Kopi Wholesale (Per Kg)</td>
                        {machines.map((m) => (
                            <Fragment key={`wholesale-sale-price-display-${m}`}>
                                <td colSpan={2} className="px-3 py-2 text-right text-sm text-gray-700">
                                    {formatRp(data.wholesaleSalePrice)}
                                </td>
                            </Fragment>
                        ))}
                    </tr>

                    <tr>
                        <td className="px-6 py-4 text-sm font-medium text-gray-900">Total Penjualan Retail Per Bulan</td>
                        {machines.map((m) => (
                            <Fragment key={`sales-per-month-retail-revenue-${m}`}>
                                <td colSpan={2} className="px-3 py-2 text-right text-sm text-gray-700">
                                    {formatRp(result[m].salesPerMonthRetailRevenue)}
                                </td>
                            </Fragment>
                        ))}
                    </tr>

                    <tr>
                        <td className="px-6 py-4 text-sm font-medium text-gray-900">Total Penjualan Wholesale Per Bulan</td>
                        {machines.map((m) => (
                            <Fragment key={`sales-per-month-wholesale-revenue-${m}`}>
                                <td colSpan={2} className="px-3 py-2 text-right text-sm text-gray-700">
                                    {formatRp(result[m].salesPerMonthWholesaleRevenue)}
                                </td>
                            </Fragment>
                        ))}
                    </tr>

                    <tr>
                        <td className="px-6 py-4 text-sm font-medium text-gray-900">COGS Retail kopi</td>
                        {machines.map((m) => (
                            <Fragment key={`cogs-retail-${m}`}>
                                <td colSpan={2} className="px-3 py-2 text-right text-sm text-gray-700">
                                    {formatRp(result[m].cogsRetail)}
                                </td>
                            </Fragment>
                        ))}
                    </tr>

                    <tr>
                        <td className="px-6 py-4 text-sm font-medium text-gray-900">COGS Wholesale kopi</td>
                        {machines.map((m) => (
                            <Fragment key={`cogs-wholesale-${m}`}>
                                <td colSpan={2} className="px-3 py-2 text-right text-sm text-gray-700">
                                    {formatRp(result[m].cogsWholesale)}
                                </td>
                            </Fragment>
                        ))}
                    </tr>

                    <tr>
                        <td colSpan={11} className="py-2">
                            &nbsp;
                        </td>
                    </tr>

                    <tr>
                        <td colSpan={11} className="bg-brand-primary px-3 py-2 font-bold uppercase text-white">
                            Biaya Operasional
                        </td>
                    </tr>

                    <tr>
                        <td className="px-6 py-4 text-sm font-medium text-gray-900">Tenaga Kerja</td>
                        {machines.map((m) => (
                            <Fragment key={`operational-total-${m}`}>
                                <td colSpan={2} className="px-3 py-2 text-right text-sm text-gray-700">
                                    {formatRp(result[m].operationalWorkforceCost)}
                                </td>
                            </Fragment>
                        ))}
                    </tr>

                    <tr>
                        <td className="px-6 py-4 text-sm font-medium text-gray-900">Sewa Tempat</td>
                        {machines.map((m) => (
                            <Fragment key={`operational-total-${m}`}>
                                <td colSpan={2} className="px-3 py-2 text-right text-sm text-gray-700">
                                    {formatRp(result[m].operationalRentCost)}
                                </td>
                            </Fragment>
                        ))}
                    </tr>

                    <tr>
                        <td className="px-6 py-4 text-sm font-medium text-gray-900">Listrik dan Lain Lain</td>
                        {machines.map((m) => (
                            <Fragment key={`operational-total-${m}`}>
                                <td colSpan={2} className="px-3 py-2 text-right text-sm text-gray-700">
                                    {formatRp(result[m].operationalUtilitiesCost)}
                                </td>
                            </Fragment>
                        ))}
                    </tr>

                    <tr>
                        <td className="px-6 py-4 text-sm font-medium text-gray-900">Biaya perawatan dan maintenance mesin</td>
                        {machines.map((m) => (
                            <Fragment key={`operational-total-${m}`}>
                                <td colSpan={2} className="px-3 py-2 text-right text-sm text-gray-700">
                                    {formatRp(result[m].operationalMaintenanceCost)}
                                </td>
                            </Fragment>
                        ))}
                    </tr>

                    <tr>
                        <td className="px-6 py-4 text-sm font-medium text-gray-900">Total Biaya Operasional per Bulan</td>
                        {machines.map((m) => (
                            <Fragment key={`operational-total-${m}`}>
                                <td colSpan={2} className="px-3 py-2 text-right text-sm text-gray-700">
                                    {formatRp(result[m].operationalTotal)}
                                </td>
                            </Fragment>
                        ))}
                    </tr>

                    <tr>
                        <td colSpan={11} className="py-2">
                            &nbsp;
                        </td>
                    </tr>

                    <tr>
                        <td className="px-6 py-4 text-sm font-medium text-gray-900">Profit Bersih</td>
                        {machines.map((m) => (
                            <Fragment key={`clean-profit-${m}`}>
                                <td colSpan={2} className="px-3 py-2 text-right text-sm text-gray-700">
                                    {formatRp(result[m].cleanProfit)}
                                </td>
                            </Fragment>
                        ))}
                    </tr>

                    <tr>
                        <td colSpan={11} className="py-2">
                            &nbsp;
                        </td>
                    </tr>

                    <tr>
                        <td className="px-6 py-4 text-sm font-medium text-gray-900">Total produksi kg kopi roasted per jam produksi</td>
                        {machines.map((m) => (
                            <Fragment key={`total-coffee-production-${m}`}>
                                <td colSpan={2} className="px-3 py-2 text-right text-sm text-gray-700">
                                    {result[m].totalCoffeeProduction.toFixed(2)}
                                </td>
                            </Fragment>
                        ))}
                    </tr>

                    <tr>
                        <td className="px-6 py-4 text-sm font-medium text-gray-900">Pendapatan Bersih Per Jam Mesin Roaster</td>
                        {machines.map((m) => (
                            <Fragment key={`clean-profit-machine-${m}`}>
                                <td colSpan={2} className="px-3 py-2 text-right text-sm text-gray-700">
                                    {formatRp(result[m].cleanProfitMachine)}
                                </td>
                            </Fragment>
                        ))}
                    </tr>

                    {/* {MachinePriceRows()} */}

                    <tr>
                        <td className="px-6 py-4 text-sm font-medium text-gray-900">Total Jam Produksi yang dibutuhkan untuk ROI Mesin Roaster</td>
                        {machines.map((m) => (
                            <Fragment key={`roi-time-machine-${m}`}>
                                <td colSpan={2} className="px-3 py-2 text-right text-sm text-gray-700">
                                    {result[m].roiTimeMachine.toFixed(0)}
                                </td>
                            </Fragment>
                        ))}
                    </tr>

                    <tr>
                        <td className="px-6 py-4 text-sm font-medium text-gray-900">BEP</td>
                        {machines.map((m) => (
                            <Fragment key={`bep-${m}`}>
                                <td colSpan={2} className="px-3 py-2 text-right text-sm text-gray-700">
                                    {result[m].bep}
                                </td>
                            </Fragment>
                        ))}
                    </tr>

                    <tr>
                        <td className="px-6 py-4 text-sm font-medium text-gray-900">ROI / YEAR</td>
                        {machines.map((m) => (
                            <Fragment key={`roi-per-year-${m}`}>
                                <td colSpan={2} className="px-3 py-2 text-right text-sm text-gray-700">
                                    {formatPercent(result[m].roiPerYear)}
                                </td>
                            </Fragment>
                        ))}
                    </tr>
                </tbody>
            </table>
        </div>
    );
};

export default RoastCalculatorResult;
