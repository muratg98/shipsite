'use client';

import React from 'react';
import { CMSLink } from '@/components/Link';

interface HeaderNavProps {
  navItems: Array<{ link: any }>; // Define navItems type properly
  fontColor: string;
  fontSize: string;
}

export const HeaderNav: React.FC<HeaderNavProps> = ({ navItems }) => {
  return (
    <ul className="my-2 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6 ">
      {navItems.map(({ link }, index) => (
        <li key={index}>
          <CMSLink
            {...link}
            className={`flex items-center hover:text-gray-300 transition-colors p-1 font-medium`}
          />
        </li>
      ))}
    </ul>
  );
};
