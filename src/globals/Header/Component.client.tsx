'use client'

import {
  Navbar,
  NavBody,
  NavItems,
  MobileNav,
  NavbarLogo,
  NavbarButton,
  MobileNavHeader,
  MobileNavToggle,
  MobileNavMenu,
} from "@/components/ui/resizable-navbar";
import { useState } from "react";
import type { Header } from '@/payload-types'
import { CMSLink } from '@/components/Link'

interface HeaderClientProps {
  data: Header
}

export const HeaderClient: React.FC<HeaderClientProps> = ({ data }) => {
  const { navItems = [], Styles, showCTA, CallToAction } = data
  const { media } = Styles || {}
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  return (
    <div className="relative w-full z-50">
      <Navbar>
        {/* Desktop Navigation */}
        <NavBody>
          <NavbarLogo media={media}/>
          <NavItems
            items={
              navItems?.map(({ link }) => {
                let href: string | undefined = "#";
            
                if (
                  link.type === "reference" &&
                  typeof link.reference?.value === "object" &&
                  link.reference.value.slug
                ) {
                  href = `${link.reference.relationTo !== "pages" ? `/${link.reference.relationTo}` : ""}/${link.reference.value.slug}`;
                } else if (link.type === "custom" && link.url) {
                  href = link.url;
                }
            
                return {
                  name: link.label,
                  link: href || "#",
                  newTab: !!link.newTab,
                };
              }) ?? []
            }
          />
          <div className="flex items-center gap-4">
            {showCTA && CallToAction?.link && (
              <NavbarButton className= "rounded-xl" variant="primary" href={CallToAction.link.url || '/'}>{CallToAction.link.label || "Get Started"}</NavbarButton>
            )}
          </div>
        </NavBody>

        {/* Mobile Navigation */}
        <MobileNav>
          <MobileNavHeader>
            <NavbarLogo />
      
            <MobileNavToggle
              isOpen={isMobileMenuOpen}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            />
          </MobileNavHeader>

          <MobileNavMenu
            isOpen={isMobileMenuOpen}
            onClose={() => setIsMobileMenuOpen(false)}
          >
            {navItems?.map(({ link }, idx) => (
              <CMSLink
                key={`mobile-nav-${idx}`}
                {...link}
                className="relative text-neutral-600 dark:text-neutral-300 block py-2"
              />
            ))}
            {showCTA && CallToAction?.link && (
              <NavbarButton className= "rounded-xl w-full" variant="primary" href={CallToAction.link.url || '/'}>{CallToAction.link.label || "Get Started"}</NavbarButton>
            )}
          </MobileNavMenu>
        </MobileNav>
      </Navbar>
    </div>
  )
}
