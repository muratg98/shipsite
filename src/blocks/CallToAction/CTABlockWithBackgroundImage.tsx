import React from 'react'
import { Media } from '@/components/Media'
import RichText from '@/components/RichText'
import { CMSLink } from '@/components/Link'
import type { CallToActionBlock } from '@/payload-types'

export const CTABlockWithBackgroundImage: React.FC<CallToActionBlock> = ({ bgImage, richText, links }) => {
  return (
    <div className="relative before:absolute before:w-full before:h-full before:inset-0 before:bg-black before:opacity-50 before:z-10">
      {bgImage && (
        <Media
          resource={bgImage}
          alt="CTA Background"
          className="absolute inset-0 w-full h-full object-cover"
        />
      )}

      <div className="min-h-[350px] relative z-50 h-full max-w-6xl mx-auto flex flex-col justify-center items-center text-center text-white p-6">
        {richText && <RichText data={richText} className="mb-6 text-white" enableGutter={false} />}
        <div className="mt-12 flex flex-wrap justify-center gap-4">
          {(links || []).map(({ link }, i) => (
            <CMSLink
              key={i}
              className="bg-transparent text-white border border-white rounded-lg py-3 px-6 hover:bg-white hover:text-black transition duration-300"
              size="lg"
              {...link}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
