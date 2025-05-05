'use server'

import { stripeProxy } from '@payloadcms/plugin-stripe'
import { ProductSelectClient } from './ProductSelectClient'
import type { TextFieldServerComponent } from 'payload'

const ProductSelectServer: TextFieldServerComponent = async (props) => {
  const { path } = props
  let options: Array<{ label: string; value: string }> = []

  try {
    const res = await stripeProxy({
      stripeSecretKey: process.env.STRIPE_SECRET_KEY || "",
      stripeMethod: 'products.list',
      stripeArgs: [{ limit: 100 }], 
    })
    if (res && Array.isArray(res.data.data) && res.data.data.length > 0) {
      options = res.data.data.map((item: { id: string; name?: string }) => ({
        label: item.name || item.id,
        value: item.id,
      }))
      options.unshift({ label: 'Select a product', value: '' })
    } else {
      console.error('No products found in response or data is not an array:', res)
    }
  } catch (error) {
    console.error('Error fetching products:', error)
  }
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
        marginTop: '10px',
        marginBottom: '20px',
      }}
    >
      <h3>Product Selection</h3>
      <ProductSelectClient path={path} options={options} />
    </div>
  )
}

export default ProductSelectServer
