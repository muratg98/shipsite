import { HeaderClient } from './Component.client'
import { getCachedGlobal } from '@/utilities/getGlobals'
import React from 'react'

import type { Header } from '@/payload-types'

export async function Header() {
  const headerData = (await getCachedGlobal('header', 1)()) as Header
  const cleanedData = {
    ...headerData,
    media: headerData.Styles.media ? headerData.Styles.media.toString() : null,  
    createdAt: headerData.createdAt?.toString(),  
    updatedAt: headerData.updatedAt?.toString(),
  }

  return <HeaderClient data={cleanedData} />
}
