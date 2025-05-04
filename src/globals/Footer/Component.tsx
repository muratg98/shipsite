import { getCachedGlobal } from '@/utilities/getGlobals'
import React from 'react'
import type { Footer } from '@/payload-types'
import { CMSLink } from '@/components/Link'
import { Media } from '@/components/Media'

export async function Footer() {
  const footerData: Footer = await getCachedGlobal('footer', 1)()

  return (
    <footer className="bg-gray-900 pt-12 pb-6 px-10 tracking-wide">
      <div className="max-w-screen-xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo Section */}
          <div className="lg:flex lg:items-center">
            <a href="#">
              {footerData.logo && (
                <Media
                  resource={footerData.logo}
                  alt="logo"
                  className="w-48 mb-6"
                />
              )}
            </a>
          </div>

          {footerData.navSections?.map((section) => (
            <div key={section.id}>
              <h4 className="text-am mb-6 text-white">{section.name}</h4>
              <ul className="space-y-4 pl-2">
                {section.navItems?.map((item, index) => (
                  <li key={index}>
                    <CMSLink
                      {...item.link}
                      className="text-gray-400 hover:text-white text-sm"
                    >
                    </CMSLink>
                  </li>
                ))}
              </ul>
            </div>
          ))}

        </div>

        {footerData.useBottomText && footerData.bottomText && (
          <p className="text-gray-400 text-sm mt-10 text-center">
            {footerData.bottomText}
          </p>
        )}
      </div>
    </footer>
  )
}
