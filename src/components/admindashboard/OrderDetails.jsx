import React from "react";
import {
  FaUser,
  FaMapMarkerAlt,
  FaTruck,
  FaCreditCard,
  FaDownload,
  FaPrint,
} from "react-icons/fa";
import productOne from '../../assets/images/productone.png'
import productTwo from '../../assets/images/producttwo.png'
import productThree from '../../assets/images/productthree.png'
import { CirclePlus } from "lucide-react";

const OrderDetails = () => {
  return (
    <div className="min-h-screen bg-black text-white p-4 lg:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold">Order #5680</h1>

          <div className="flex flex-wrap items-center gap-3 mt-2 text-sm text-gray-400">
            <span>Oct 24, 2023 at 2:30 PM</span>

            <span className="px-3 py-1 rounded-full bg-red-500/20 text-red-500 border border-red-500/20">
              Processing
            </span>
          </div>
        </div>

        <div className="grid lg:grid-cols-12 gap-6">
          {/* LEFT SIDE */}
          <div className="lg:col-span-8 space-y-6">
            {/* Top Cards */}
            <div className="grid md:grid-cols-2 gap-6">
              {/* Customer */}
              <div className="bg-[#0f1117] border border-gray-800 rounded-xl p-5">
                <h3 className="text-sm uppercase text-gray-400 mb-4 flex items-center gap-2">
                  <FaUser />
                  Customer Info
                </h3>

                <div className="flex items-center gap-4">
                  <img
                    src="https://i.pravatar.cc/100"
                    alt=""
                    className="w-14 h-14 rounded-full"
                  />

                  <div>
                    <h4 className="font-semibold text-lg">
                      Marcus Reynolds
                    </h4>

                    <p className="text-gray-400 text-sm">
                      m.reynolds@example.com
                    </p>

                    <p className="text-gray-400 text-sm">
                      +1 (555) 019-2834
                    </p>
                  </div>
                </div>
              </div>

              {/* Address */}
              <div className="bg-[#0f1117] border border-gray-800 rounded-xl p-5">
                <h3 className="text-sm uppercase text-gray-400 mb-4 flex items-center gap-2">
                  <FaMapMarkerAlt />
                  Shipping Address
                </h3>

                <div className="space-y-1 text-gray-300">
                  <p>Marcus Reynolds</p>
                  <p>1284 Tactical Way, Suite 300</p>
                  <p>Austin, TX 78701</p>
                  <p>United States</p>
                </div>
              </div>
            </div>

            {/* Order Items */}
            <div className="bg-[#0f1117] border border-gray-800 rounded-xl overflow-hidden">
              <div className="p-5 border-b border-gray-800">
                <h2 className="font-semibold text-lg">Order Items</h2>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full min-w-[640px]">
                  <thead>
                    <tr className="bg-[#131722] text-gray-400 text-sm">
                      <th className="text-left p-3">Product</th>
                      <th className="text-left p-3">SKU</th>
                      <th className="text-left p-3">Price</th>
                      <th className="text-left p-3">Qty</th>
                      <th className="text-right p-3">Total</th>
                    </tr>
                  </thead>

                  <tbody>
                    {[
                      {
                        name: "Tactical Vest Plate Carrier",
                        size: "L/XL",
                        sku: "TV-PC-MCB-01",
                        price: "$245.00",
                        qty: 2,
                        total: "$490.00",
                        image: productOne,
                      },
                      {
                        name: "Advanced Combat Helmet",
                        size: "M/L",
                        sku: "ACH-L-ODG-44",
                        price: "$650.00",
                        qty: 1,
                        total: "$650.00",
                        image: productTwo,
                      },
                      {
                        name: "IFAK Trauma Kit Pro",
                        size: "Standard",
                        sku: "TK-PRO-STD",
                        price: "$100.00",
                        qty: 1,
                        total: "$100.00",
                        image: productThree,
                      },
                    ].map((item, index) => (
                      <tr key={index} className="border-t border-gray-800">
                        <td className="p-3">
                          <div className="flex items-center gap-3">
                            <div className="h-12 w-12 shrink-0 overflow-hidden rounded-md bg-gray-800">
                              <img src={item.image} alt={item.name} className="h-full w-full object-cover" />
                            </div>
                            <div>
                              <div className="text-[10px]">{item.name}</div>
                              <div className="text-[10px]">{item.size}</div>
                            </div>
                          </div>
                        </td>
                        <td className="p-3 text-gray-400 text-[10px]">{item.sku}</td>
                        <td className="p-3 text-gray-400 text-[10px]">{item.price}</td>
                        <td className="p-3 text-[10px]">{item.qty}</td>
                        <td className="p-3 text-right font-medium text-[10px]">{item.total}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Bottom Cards */}
            <div className="grid md:grid-cols-2 gap-6">
              {/* Shipping */}
              <div className="bg-[#0f1117] border border-gray-800 rounded-xl p-5">
                <h3 className="text-sm uppercase text-gray-400 mb-4 flex items-center gap-2">
                  <FaTruck />
                  Shipping Info
                </h3>

                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Method</span>
                    <span>FedEx Priority</span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-gray-400">Tracking</span>
                    <span className="text-red-500">
                      772839401283
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-gray-400">Status</span>
                    <span className="text-yellow-400">
                      In Transit
                    </span>
                  </div>
                </div>
              </div>

              {/* Payment */}
              <div className="bg-[#0f1117] border border-gray-800 rounded-xl p-5">
                <h3 className="text-sm uppercase text-gray-400 mb-4 flex items-center gap-2">
                  <FaCreditCard />
                  Payment Details
                </h3>

                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Method</span>
                    <span>Visa **** 4242</span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-gray-400">Status</span>
                    <span className="text-green-500">
                      Paid
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-gray-400">
                      Transaction
                    </span>
                    <span>txn_8932fd982</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Notes */}
            <div className="bg-[#0f1117] border-l border-yellow-500 rounded-xl p-5">
              <h3 className="text-[#CA8A04] font-semibold mb-4">
                Internal Notes (Admin Only)
              </h3>

              <p className="text-gray-300">
                Urgent Delivery: Customer requested expedited
                processing for upcoming deployment. Ensure QA check
                is prioritized.
              </p>
            </div>
          </div>

          {/* RIGHT SIDE */}
          <div className="lg:col-span-4">
            <div className="bg-[#0f1117] border border-gray-800 rounded-xl p-6 sticky top-5">
              <div className="flex justify-between mb-8">
                <div className="">
                  <div className="flex items-center gap-2 mb-1">
                    <h2 className="text-2xl font-semibold flex items-center gap-2">
                      <CirclePlus size={24} />
                      NAF Supply
                    </h2>
                  </div>
                  <p className="text-gray-400 text-sm">
                    Tactical Gear & Equipment
                  </p>
                </div>

                <div className="text-right">
                  <p className="text-gray-400 text-sm">
                    Invoice
                  </p>
                  <p className="font-semibold">INV-5680</p>
                </div>
              </div>

              <div className="space-y-3 text-sm border-b border-gray-800 pb-6">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>$1240.00</span>
                </div>

                <div className="flex justify-between">
                  <span>Tax</span>
                  <span>$102.30</span>
                </div>

                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>$45.00</span>
                </div>

                <div className="flex justify-between text-green-500">
                  <span>Discount</span>
                  <span>-$124.00</span>
                </div>
              </div>

              <div className="flex justify-between py-6 text-xl font-bold">
                <span>Total Amount</span>
                <span>$1263.30</span>
              </div>

              <div className="space-y-3">
                <button className="w-full bg-red-600 hover:bg-red-700 py-3 rounded-lg flex items-center justify-center gap-2">
                  <FaDownload />
                  Download Invoice
                </button>

                <button className="w-full border border-gray-700 py-3 rounded-lg flex items-center justify-center gap-2">
                  <FaPrint />
                  Print Copy
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;