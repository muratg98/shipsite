'use client'

import { useEffect, useState } from 'react'
import { Select, useField } from '@payloadcms/ui'
import { Option } from '@payloadcms/ui/elements/ReactSelect/'
interface ProductSelectProps {
  options: { label: string; value: string }[]
  path: string
}

export const ProductSelectClient = ({ options, path }: ProductSelectProps) => {
  const { setValue, value } = useField<string>({ path })
  const [selectedProduct, setSelectedProduct] = useState<Option<string> | null>(null)
  const [productOptions, setProductOptions] = useState<Option<string>[]>([])

  useEffect(() => {
    setProductOptions(options)
    if (value) {
      const selected = options.find((opt) => opt.value === value) || null
      setSelectedProduct(selected)
    }
  }, [options, value])

  const handleChange = (option: Option<unknown> | Option<unknown>[] | null) => {
    if (Array.isArray(option)) return
    const selectedOption = option as Option<string> | null
    setSelectedProduct(selectedOption)
    setValue(selectedOption?.value || '')
  }
  
  return (
    <div>
      <p style={{ marginBottom: '0' }}>Select a Stripe Product</p>
      <p style={{ marginBottom: '0.75rem', color: 'var(--theme-elevation-400)' }}>
        {`Select the related Stripe product or `}
        <a
          href={`https://dashboard.stripe.com/${
            process.env.PAYLOAD_PUBLIC_STRIPE_IS_TEST_KEY ? 'test/' : ''
          }products/create`}
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: 'var(--theme-text)' }}
        >
          create a new one
        </a>
        {'.'}
      </p>
      <Select
        options={productOptions} 
        onChange={handleChange}
        value={selectedProduct || undefined}
        isClearable 
        />
    </div>
  )
}