import React, { useState } from 'react'
import { CreditCard, CircleHelp } from 'lucide-react'
import { FaCcVisa, FaCcMastercard, FaCcAmex, FaPaypal, FaApple } from 'react-icons/fa'

const PaymentMethod = () => {
  const [selectedMethod, setSelectedMethod] = useState('credit_card')

  return (
    <section className='bg-[#131313] rounded-[12px] p-6 lg:p-8 border border-white/5'>
      <header className='flex items-center gap-4 mb-6'>
        <span className='bg-[#1a0505] text-primary border border-primary/20 font-black text-xs px-2.5 py-1 rounded-[4px]'>
          04
        </span>
        <h2 className='text-lg font-bold text-white'>Payment Method</h2>
      </header>

      <div className='grid gap-4'>
        {/* Credit Card Option */}
        <div 
          className={`rounded-[8px] border transition-colors ${
            selectedMethod === 'credit_card' 
              ? 'border-[#e60103] bg-[#0a0a0a]' 
              : 'border-white/10 bg-[#0a0a0a] hover:border-white/20'
          }`}
        >
          {/* Header */}
          <div 
            className={`flex items-center justify-between p-5 cursor-pointer ${
              selectedMethod === 'credit_card' ? 'border-b border-white/10' : ''
            }`}
            onClick={() => setSelectedMethod('credit_card')}
          >
            <div className='flex items-center gap-4'>
              <div className={`size-[18px] rounded-full flex items-center justify-center border-2 transition-colors ${
                selectedMethod === 'credit_card' ? 'bg-[#0070f3] border-[#0070f3]' : 'border-white/30 bg-transparent'
              }`}>
                {selectedMethod === 'credit_card' && (
                  <div className='size-2 rounded-full bg-white' />
                )}
              </div>
              <span className='font-semibold text-white'>Credit Card</span>
            </div>
            <div className='flex items-center gap-2 text-white/60'>
              <FaCcVisa size={24} />
              <FaCcMastercard size={24} />
              <FaCcAmex size={24} />
            </div>
          </div>

          {/* Form Details */}
          {selectedMethod === 'credit_card' && (
            <div className='p-5 pt-6 grid gap-5'>
              <div className='flex flex-col gap-2'>
                <label className='text-[11px] font-semibold text-white/50'>Card Number</label>
                <div className='relative'>
                  <CreditCard 
                    size={18} 
                    className='absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none text-white/40' 
                  />
                  <input
                    type='text'
                    placeholder='0000 0000 0000 0000'
                    className='h-[50px] w-full rounded-[6px] border border-white/10 bg-[#111] pl-12 pr-4 text-sm text-white outline-none transition placeholder:text-white/30 focus:border-primary'
                  />
                </div>
              </div>

              <div className='grid grid-cols-2 gap-5'>
                <div className='flex flex-col gap-2'>
                  <label className='text-[11px] font-semibold text-white/50'>Expiry Date</label>
                  <input
                    type='text'
                    placeholder='MM/YY'
                    className='h-[50px] w-full rounded-[6px] border border-white/10 bg-[#111] px-4 text-sm text-white outline-none transition placeholder:text-white/30 focus:border-primary'
                  />
                </div>
                <div className='flex flex-col gap-2'>
                  <label className='text-[11px] font-semibold text-white/50'>CVC</label>
                  <div className='relative'>
                    <input
                      type='text'
                      placeholder='123'
                      className='h-[50px] w-full rounded-[6px] border border-white/10 bg-[#111] pl-4 pr-11 text-sm text-white outline-none transition placeholder:text-white/30 focus:border-primary'
                    />
                    <CircleHelp 
                      size={16} 
                      className='absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer text-white/40 hover:text-white' 
                    />
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* PayPal Option */}
        <div 
          className={`rounded-[8px] border transition-colors ${
            selectedMethod === 'paypal' 
              ? 'border-[#e60103] bg-[#0a0a0a]' 
              : 'border-white/10 bg-[#0a0a0a] hover:border-white/20'
          }`}
        >
          <div 
            className={`flex items-center justify-between p-5 cursor-pointer ${
              selectedMethod === 'paypal' ? 'border-b border-white/10' : ''
            }`}
            onClick={() => setSelectedMethod('paypal')}
          >
            <div className='flex items-center gap-4'>
              <div className={`size-[18px] rounded-full flex items-center justify-center border-2 transition-colors ${
                selectedMethod === 'paypal' ? 'bg-[#0070f3] border-[#0070f3]' : 'border-white/30 bg-transparent'
              }`}>
                {selectedMethod === 'paypal' && (
                  <div className='size-2 rounded-full bg-white' />
                )}
              </div>
              <span className='font-semibold text-white'>PayPal</span>
            </div>
            <FaPaypal size={22} className='text-[#0070ba]' />
          </div>

          {selectedMethod === 'paypal' && (
            <div className='p-5 pt-6 border-t border-white/5 text-sm text-white/60 text-center'>
              After clicking "Pay Now", you will be redirected to PayPal to complete your purchase securely.
            </div>
          )}
        </div>

        {/* Apple Pay Option */}
        <div 
          className={`rounded-[8px] border transition-colors ${
            selectedMethod === 'apple_pay' 
              ? 'border-[#e60103] bg-[#0a0a0a]' 
              : 'border-white/10 bg-[#0a0a0a] hover:border-white/20'
          }`}
        >
          <div 
            className={`flex items-center justify-between p-5 cursor-pointer ${
              selectedMethod === 'apple_pay' ? 'border-b border-white/10' : ''
            }`}
            onClick={() => setSelectedMethod('apple_pay')}
          >
            <div className='flex items-center gap-4'>
              <div className={`size-[18px] rounded-full flex items-center justify-center border-2 transition-colors ${
                selectedMethod === 'apple_pay' ? 'bg-[#0070f3] border-[#0070f3]' : 'border-white/30 bg-transparent'
              }`}>
                {selectedMethod === 'apple_pay' && (
                  <div className='size-2 rounded-full bg-white' />
                )}
              </div>
              <span className='font-semibold text-white'>Apple Pay</span>
            </div>
            <FaApple size={24} className='text-white' />
          </div>

          {selectedMethod === 'apple_pay' && (
            <div className='p-5 pt-6 border-t border-white/5 text-sm text-white/60 text-center'>
              Use Apple Pay for a fast and secure checkout. Ensure you are using a supported Apple device.
            </div>
          )}
        </div>

      </div>
    </section>
  )
}

export default PaymentMethod