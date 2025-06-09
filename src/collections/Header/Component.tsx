import { HeaderClient } from './Component.client'
import { getCachedGlobalFromCollection } from '@/utilities/getGlobals'
import React from 'react'

import type { Header } from '@/payload-types'

type HeaderProps = {
  tenantID: string
}

export async function Header({ tenantID }: HeaderProps) {
  const headerData = (await getCachedGlobalFromCollection('header', 'header', tenantID, 1)()) as Header
  const cleanedData = {
    ...headerData,
    media: headerData.Styles.media ? headerData.Styles.media.toString() : null,  
    createdAt: headerData.createdAt?.toString(),  
    updatedAt: headerData.updatedAt?.toString(),
  }

  return <HeaderClient data={cleanedData} />
}
