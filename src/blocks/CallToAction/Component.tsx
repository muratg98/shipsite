import React from 'react'
import type { CallToActionBlock as CTABlockProps } from '@/payload-types'

import { Media } from '@/components/Media'
import RichText from '@/components/RichText'
import { CMSLink } from '@/components/Link'

export const CallToActionBlock: React.FC<CTABlockProps> = ({
  richText,
  links,
  useBackgroundImage,
  bgImage,
  blockName
}) => {
  return (
    // add container to class below
    <div className="relative bg-indigo-800 text-white overflow-hidden" id={blockName||undefined}>
      {useBackgroundImage && bgImage && (
        <Media
          resource={bgImage}
          alt="CTA Background"
          className="absolute inset-0 w-full h-full object-cover"
        />
      )}
      {/* Overlay */}
      <div className="absolute inset-0 bg-black opacity-50 z-10" />

      {/* Content */}
      <div className="relative z-20 px-6 py-12 min-h-[350px] flex flex-col justify-center items-center text-center">
        {richText && (
          <RichText
            data={richText}
            className="text-white mb-6"
            enableGutter={false}
          />
        )}

        <div className="mt-6 flex flex-wrap justify-center gap-4">
          {(links || []).map(({ link }, i) => (
            <CMSLink
              key={i}
              className="bg-white text-indigo-700 font-semibold py-3 px-6 rounded-lg hover:bg-slate-100 transition duration-300"
              size="lg"
              {...link}
            />
          ))}
        </div>
      </div>
    </div>
  )
}