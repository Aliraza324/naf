import { Flag, Mail } from "lucide-react";
import React from "react";

const PaymentView = () => {
    return (
        <div className="min-h-screen bg-[#0B0B0C] text-white p-6">

            {/* HEADER */}
            <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4 mb-6">

                {/* LEFT HEADER */}
                <div>
                    <div className="flex items-center gap-3">
                        <p className="text-xs text-gray-400 uppercase tracking-wider">
                            Transaction Record
                        </p>

                        <span className="text-[10px] bg-green-500/10 text-green-400 border border-green-500 px-2 py-0.5 rounded">
                            PAID SECURE
                        </span>
                    </div>

                    <h1 className="text-3xl font-bold mt-2">#TRX-982341</h1>

                    <p className="text-sm text-gray-400 mt-1">
                        Payment finalized on Oct 24, 2023 at 14:30 PM
                    </p>
                </div>

                {/* RIGHT HEADER */}
                <div className="text-left lg:text-right">
                    <p className="text-xs text-gray-400 uppercase">Total Payload</p>
                    <h2 className="text-4xl font-bold text-white">$1,250.00</h2>
                </div>
            </div>

            {/* MAIN GRID */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                {/* LEFT SIDE - ORDER SUMMARY */}
                <div className="lg:col-span-2 bg-[#121213] border border-white/10 rounded-xl p-5">

                    {/* TITLE */}
                    <div className="flex items-center justify-between mb-5">
                        <h2 className="text-lg font-semibold">Order Summary</h2>
                        <span className="text-xs text-red-500 font-medium">#ORD-7721</span>
                    </div>

                    {/* TABLE HEADER */}
                    <div className="grid grid-cols-12 text-xs text-gray-400 border-b border-white/10 pb-3">
                        <div className="col-span-5">Product</div>
                        <div className="col-span-2">SKU</div>
                        <div className="col-span-2">Price</div>
                        <div className="col-span-3">Qty / Total</div>
                    </div>

                    {/* ITEM 1 */}
                    <div className="grid grid-cols-12 items-center py-4 border-b border-white/10">
                        <div className="col-span-5">
                            <p className="font-medium">Tactical Vest Plate Carrier</p>
                            <p className="text-xs text-gray-400">Color: Multicam Black</p>
                        </div>
                        <div className="col-span-2 text-sm text-gray-300">
                            TV-PC-MCB-01
                        </div>
                        <div className="col-span-2 text-sm">$245.00</div>
                        <div className="col-span-3 text-sm">$490.00 (x2)</div>
                    </div>

                    {/* ITEM 2 */}
                    <div className="grid grid-cols-12 items-center py-4 border-b border-white/10">
                        <div className="col-span-5">
                            <p className="font-medium">Advanced Combat Helmet</p>
                            <p className="text-xs text-gray-400">Size: Large</p>
                        </div>
                        <div className="col-span-2 text-sm text-gray-300">
                            ACH-L-ODG-44
                        </div>
                        <div className="col-span-2 text-sm">$650.00</div>
                        <div className="col-span-3 text-sm">$650.00 (x1)</div>
                    </div>

                    {/* ITEM 3 */}
                    <div className="grid grid-cols-12 items-center py-4">
                        <div className="col-span-5">
                            <p className="font-medium">IFAK Trauma Kit Pro</p>
                            <p className="text-xs text-gray-400">Standard Loadout</p>
                        </div>
                        <div className="col-span-2 text-sm text-gray-300">
                            TK-PRO-STD
                        </div>
                        <div className="col-span-2 text-sm">$100.00</div>
                        <div className="col-span-3 text-sm">$100.00 (x1)</div>
                    </div>

                    {/* TOTAL */}
                    <div className="mt-6 border-t border-white/10 pt-4 text-right">
                        <p className="text-sm text-gray-400">Net Subtotal: $1,250.00</p>
                        <p className="text-sm text-gray-400">Tax (0%): $0.00</p>

                        <h3 className="text-xl font-medium  mt-2 text-[#FF3E3E]">
                            TOTAL PAYLOAD:{" "}
                            <span className="text-white">$1,250.00</span>
                        </h3>
                    </div>
                </div>

                {/* RIGHT SIDE */}
                <div className="space-y-6">

                    {/* CUSTOMER CARD */}
                    <div className="bg-[#121213] border border-white/10 rounded-xl p-5">
                        <h3 className="text-sm text-gray-400 mb-4">Customer Intel</h3>

                        <div className="space-y-4">
                            <div className="flex items-start gap-3">
                                <div className="w-8 h-8 bg-white/10 rounded flex items-center justify-center">
                                    <Flag size={20} />
                                </div>
                                <div>
                                    <p className="text-xs text-gray-400">Entity Name</p>
                                    <p className="font-semibold">John Doe</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-3">
                                <div className="w-8 h-8 bg-white/10 rounded flex items-center justify-center">
                                    <Mail size={20} />
                                </div>
                                <div>
                                    <p className="text-xs text-gray-400">Comms Email</p>
                                    <p className="font-semibold">john.doe@example.com</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* PAYMENT METHOD */}
                    <div className="bg-[#121213] border border-white/10 rounded-xl p-5">
                        <h3 className="text-sm text-gray-400 mb-4">Method Details</h3>

                        <div className="flex items-center justify-between mb-3">
                            <p className="font-semibold">VISA **** 4242</p>
                            <span className="text-xs bg-white text-black px-2 py-0.5 rounded">
                                VISA
                            </span>
                        </div>

                        <div className="bg-[#1A1A1B] border border-white/10 p-3 rounded">
                            <p className="text-xs text-gray-400">Gateway Trace</p>
                            <p className="text-sm">TXN-584921-982341-ALPHA</p>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default PaymentView;