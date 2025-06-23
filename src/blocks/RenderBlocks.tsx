import React, { Fragment } from 'react'

import type { Page } from '@/payload-types'

import { CallToActionBlock } from '@/blocks/CallToAction/Component'
import { ContentBlock } from '@/blocks/Content/Component'
import { MediaBlock } from '@/blocks/MediaBlock/Component'
import { CloudLogosBlock } from './CloudLogo/Component'
import { FeaturesBlock } from './Features/Component'
import { AccordionBlock } from './Accordion/Component'
import { ZigZagBlock } from './ZigZag/Component'
import { PricingBlock } from './Pricing/Component'
import { TestimonialBlock } from './Testimonial/Component'
import { TeamBlock } from './Team/Component'
import { BannerBlock } from './Banner/Component'

const blockComponents = {
  content: ContentBlock,
  cta: CallToActionBlock,
  mediaBlock: MediaBlock,
  cloudLogos: CloudLogosBlock,
  features: FeaturesBlock,
  accordion: AccordionBlock,
  zigzag: ZigZagBlock,
  pricing: PricingBlock,
  testimonial: TestimonialBlock,
  team: TeamBlock,
  banner: BannerBlock
}

export const RenderBlocks: React.FC<{
  blocks: Page['layout'][0][]
}> = (props) => {
  const { blocks } = props

  const hasBlocks = blocks && Array.isArray(blocks) && blocks.length > 0

  if (hasBlocks) {
    return (
      <Fragment>
        {blocks.map((block, index) => {
          const { blockType } = block

          if (blockType && blockType in blockComponents) {
            const Block = blockComponents[blockType]

            if (Block) {
              return (
                <div className="my-16" key={index}>
                  <Block {...block} disableInnerContainer />
                </div>
              )
            }
          }
          return null
        })}
      </Fragment>
    )
  }

  return null
}
