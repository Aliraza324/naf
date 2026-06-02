import React, { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AiOutlineSearch, AiOutlineEye, AiOutlineDelete } from 'react-icons/ai'
import { FaCcVisa, FaCcPaypal, FaCcMastercard } from 'react-icons/fa'
import Pagination from './Pagination'

const transactions = [
    {
        id: 'TXN-8921-A',
        customer: 'Sarah Jenkins',
        method: 'Visa',
        amount: '$1,250.00',
        status: 'Paid',
        date: 'Oct 24, 14:32',
        initials: 'SJ',
        image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&h=100&q=80',
    },
    {
        id: 'TXN-8920-B',
        customer: 'Michael Chen',
        method: 'PayPal',
        amount: '$450.00',
        status: 'Paid',
        date: 'Oct 24, 13:15',
        initials: 'MC',
        image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&h=100&q=80',
    },
    {
        id: 'TXN-8919-C',
        customer: 'Ava Patel',
        method: 'Mastercard',
        amount: '$725.00',
        status: 'Paid',
        date: 'Oct 24, 12:05',
        initials: 'AP',
        image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=100&h=100&q=80',
    },
    {
        id: 'TXN-8918-D',
        customer: 'Noah Miller',
        method: 'Visa',
        amount: '$980.00',
        status: 'Paid',
        date: 'Oct 24, 11:20',
        initials: 'NM',
        image: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=100&h=100&q=80',
    },
]

const methodIcon = {
    Visa: <FaCcVisa className="h-4 w-4 text-blue-400" />,
    PayPal: <FaCcPaypal className="h-4 w-4 text-sky-400" />,
    Mastercard: <FaCcMastercard className="h-4 w-4 text-orange-400" />,
}

const PaymentTable = () => {
    const [customerQuery, setCustomerQuery] = useState('')
    const [transactionQuery, setTransactionQuery] = useState('')
    const [methodFilter, setMethodFilter] = useState('All Methods')
    const navigate = useNavigate()

    const filteredTransactions = useMemo(() => {
        return transactions.filter((transaction) => {
            const matchesCustomer = transaction.customer
                .toLowerCase()
                .includes(customerQuery.toLowerCase())
            const matchesTransaction = transaction.id
                .toLowerCase()
                .includes(transactionQuery.toLowerCase())
            const matchesMethod =
                methodFilter === 'All Methods' || transaction.method === methodFilter

            return matchesCustomer && matchesTransaction && matchesMethod
        })
    }, [customerQuery, transactionQuery, methodFilter])

    return (
        <div className="space-y-4 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="rounded-2xl border border-neutral-800 bg-[#0f1117] p-3 shadow-sm shadow-black/20">
                <div className="grid gap-3 lg:grid-cols-[1.8fr_1.8fr_1.4fr_auto]">
                    <label className="group relative block rounded-xl border border-neutral-800 bg-neutral-950 px-4 py-2 text-sm text-neutral-300 focus-within:border-red-500">
                        <AiOutlineSearch className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-500" />
                        <input
                            type="text"
                            value={customerQuery}
                            onChange={(event) => setCustomerQuery(event.target.value)}
                            placeholder="Search by Customer Name"
                            className="w-full bg-transparent pl-8 text-sm text-white outline-none placeholder:text-neutral-500"
                        />
                    </label>

                    <label className="group relative block rounded-xl border border-neutral-800 bg-neutral-950 px-4 py-2 text-sm text-neutral-300 focus-within:border-red-500">
                        <AiOutlineSearch className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-500" />
                        <input
                            type="text"
                            value={transactionQuery}
                            onChange={(event) => setTransactionQuery(event.target.value)}
                            placeholder="Search by Transaction ID"
                            className="w-full bg-transparent pl-8 text-sm text-white outline-none placeholder:text-neutral-500"
                        />
                    </label>

                    <label className="relative block rounded-xl border border-neutral-800 bg-neutral-950 px-4 py-2 text-sm text-neutral-300 focus-within:border-red-500">
                        <select
                            value={methodFilter}
                            onChange={(event) => setMethodFilter(event.target.value)}
                            className="w-full bg-transparent text-sm text-white outline-none appearance-none cursor-pointer"
                        >
                            <option value="All Methods" className="bg-[#0f1117] text-neutral-400">Search by Method</option>
                            <option value="Visa" className="bg-[#0f1117] text-white">Visa</option>
                            <option value="PayPal" className="bg-[#0f1117] text-white">PayPal</option>
                            <option value="Mastercard" className="bg-[#0f1117] text-white">Mastercard</option>
                        </select>
                    </label>

                    <button className="rounded-xl bg-red-600 px-6 py-2 text-sm font-semibold text-white transition hover:bg-red-700">
                        Search
                    </button>
                </div>
            </div>

            <div className="rounded-2xl border border-neutral-800 bg-[#0f1117] overflow-hidden shadow-sm shadow-black/20">
                <div className="border-b border-neutral-800 px-5 py-3">
                    <h2 className="text-base font-semibold text-white">Transaction Log</h2>
                </div>

                <div className="overflow-x-auto">
                    <table className="min-w-190 w-full text-left text-xs">
                        <thead className="bg-[#131722] text-[10px] uppercase tracking-[0.24em] text-neutral-500">
                            <tr>
                                <th className="px-5 py-3">Transaction ID</th>
                                <th className="px-5 py-3">Customer</th>
                                <th className="px-5 py-3">Amount</th>
                                <th className="px-5 py-3">Method</th>
                                <th className="px-5 py-3">Status</th>
                                <th className="px-5 py-3">Date</th>
                                <th className="px-5 py-3">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredTransactions.map((transaction) => (
                                <tr key={transaction.id} className="border-b border-neutral-800 transition hover:bg-neutral-950">
                                    <td className="px-5 py-3 text-neutral-300">{transaction.id}</td>
                                    <td className="px-5 py-3">
                                        <div className="flex items-center gap-2">
                                            {transaction.image ? (
                                                <img
                                                    src={transaction.image}
                                                    alt={transaction.customer}
                                                    className="h-8 w-8 rounded-full object-cover"
                                                />
                                            ) : (
                                                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-red-600 text-xs font-semibold text-white">
                                                    {transaction.initials || 'U'}
                                                </div>
                                            )}
                                            <span className="text-xs text-white">{transaction.customer}</span>
                                        </div>
                                    </td>
                                    <td className="px-5 py-3 font-semibold text-white">{transaction.amount}</td>
                                    <td className="px-5 py-3 text-neutral-300">
                                        <div className="flex items-center gap-2">
                                            {methodIcon[transaction.method]}
                                            <span>{transaction.method}</span>
                                        </div>
                                    </td>
                                    <td className="px-5 py-3">
                                        <span className="inline-flex rounded-full bg-emerald-500/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.2em] text-emerald-400">
                                            {transaction.status}
                                        </span>
                                    </td>
                                    <td className="px-5 py-3 text-neutral-400">{transaction.date}</td>
                                    <td className="px-5 py-3">
                                        <div className="flex items-center gap-2 text-neutral-400">
                                            <button
                                                onClick={() => navigate(`/admin/payment/${transaction.id}`)}
                                                className="rounded-lg p-1.5 hover:bg-neutral-900/80 "
                                            >
                                                <AiOutlineEye size={16} />
                                            </button>
                                            <button className="rounded-lg p-1.5 hover:bg-neutral-900/80">
                                                <AiOutlineDelete size={16} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            <Pagination />

        </div>
    )
}

export default PaymentTable