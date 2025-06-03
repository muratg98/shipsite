'use client'

import { cn } from '@/utilities/ui'
import { AnimatePresence, motion } from 'framer-motion'
import { Check } from 'lucide-react'
import { useState } from 'react'
import { Product, PricingBlock as PricingBlockProp } from '@/payload-types'
import { authClient } from '@/lib/auth-client'
import { useRouter } from 'next/navigation'

export const PricingBlock = ({ plans, header, title, description, blockName }: PricingBlockProp) => {
  const [billingCycle, setBillingCycle] = useState<'M' | 'A'>('M')
  const router = useRouter();

  return (
    <section className="relative w-full p-4 overflow-hidden text-black text-center lg:px-2 -mt-24" id={blockName || undefined}>
      <motion.div
        className="relative z-10 my-12 flex flex-col items-center justify-center gap-4"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        viewport={{ once: true, amount: 0.2 }}
      >
        <h2 className="text-base/7 font-semibold text-indigo-600">{header}</h2>
          <p className="mt-2 text-4xl font-semibold tracking-tight text-pretty text-gray-900 sm:text-5xl lg:text-balance">
            {title}
          </p>
          <p className="mt-6 text-lg/8 text-gray-600">{description}</p>
        <div className="flex items-center justify-center gap-3">
          {['M', 'A'].map((cycle) => (
            <button
              key={cycle}
              onClick={() => setBillingCycle(cycle as 'M' | 'A')}
              className={cn(
                `rounded-lg px-4 py-2 text-sm font-medium`,
                billingCycle === cycle
                  ? 'relative bg-indigo-600 text-white'
                  : 'text-gray-700 hover:bg-indigo-100 dark:text-gray-300 dark:hover:text-black'
              )}
            >
              {cycle === 'M' ? 'Monthly' : 'Annual'}
              {billingCycle === cycle && <BackgroundShift shiftKey={cycle} />}
            </button>
          ))}
        </div>
      </motion.div>

      <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-row justify-center gap-x-3 gap-y-8 flex-wrap lg:flex-nowrap p-2">
        {plans.map((plan, index) => {
          const product = plan.product as Product
          const priceObj = product.prices?.find((p) => p.recurringInterval === (billingCycle === 'M' ? 'month' : 'year'))
          const price = priceObj?.amount ? (priceObj.amount).toFixed(2) : '—'

          return (
            <motion.div
              key={plan.id || index}
              className="w-full sm:w-1/2 lg:w-1/3 shrink-0 rounded-xl border-[1px] border-gray-300 p-6 text-left dark:border-gray-600"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true, amount: 0.2 }}
            >
              <p className="mb-1 mt-0 text-sm font-medium uppercase text-indigo-600">
                {product.name}
              </p>
              <p className="mb-6 text-sm text-gray-600">{product.description}</p>
              <AnimatePresence mode="wait">
                <motion.p
                  key={billingCycle}
                  initial={{ y: -50, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ type: 'spring', stiffness: 100 }}
                  className="text-3xl font-semibold text-gray-900 dark:text-gray-100"
                >
                  ${price}
                  <span className="text-sm font-medium">/{billingCycle === 'M' ? 'month' : 'year'}</span>
                </motion.p>
              </AnimatePresence>
              <motion.button
                whileTap={{ scale: 0.985 }}
                onClick={async () => {
                  const {error} = await authClient.subscription.upgrade({
                    plan: product.name || '',
                    successUrl: "/dashboard",
                    cancelUrl: "/",
                    annual: billingCycle==="A",
                  });
                  if (error?.status === 401 || error?.message?.toLowerCase().includes("unauthorized")) {
                    router.push('/sign-in')
                  } else {
                    console.error("Stripe error:", error);
                  }
                }}
                className="mt-8 w-full rounded-lg bg-indigo-600 py-2 text-sm font-medium text-white hover:bg-indigo-600/90"
              >
                Subscribe
              </motion.button>
              <div className="mt-6 space-y-2">
                {product.features?.map((f) => (
                  <div key={f.id} className="flex items-center gap-2">
                    <Check className="text-indigo-600" size={18} />
                    <span className="text-sm text-gray-600">{f.name}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          )
        })}
      </div>
    </section>
  )
}

const BackgroundShift = ({ shiftKey }: { shiftKey: string }) => (
  <motion.span
    key={shiftKey}
    layoutId="bg-shift"
    className="absolute inset-0 -z-10 rounded-lg bg-indigo-600"
    initial={{ opacity: 0, scale: 0.8 }}
    animate={{ opacity: 1, scale: 1 }}
    exit={{ opacity: 0, scale: 0.8 }}
    transition={{ type: 'spring', stiffness: 200, damping: 20 }}
  />
)