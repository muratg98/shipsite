import React from 'react'

import type { Page } from '@/payload-types'

import { SimpleImpactHero } from './SimpleImpact'
import { SimpleWithImage } from './SimpleWithImage'
import { SliderHero } from './SliderHero'

const heroes = {
  simpleImpact: SimpleImpactHero,
  simpleWithImage: SimpleWithImage,
  sliderHero: SliderHero
}

export const RenderHero: React.FC<Page['hero']> = (props) => {
  const { type } = props || {}

  if (!type || type === 'none') return null

  const HeroToRender = heroes[type]

  if (!HeroToRender) return null

  return <HeroToRender {...props} />
}
