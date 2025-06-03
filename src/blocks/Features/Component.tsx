'use client';

import React from 'react';
import Standard from './Standard';
import WithImage from './WithImage';
import { ReactElement } from 'react';
import {
  Sparkles,
  Palette,
  Code,
  Feather,
  Command,
  Clock,
} from 'lucide-react';
import type { FeaturesSectionBlock } from '@/payload-types';

const iconSize = 20;

interface RawFeature {
  name: string;
  description: string;
}

interface Feature extends RawFeature {
  id: number;
  icon: ReactElement;
}

const iconList: ReactElement[] = [
  <Sparkles size={iconSize} />,
  <Palette size={iconSize} />,
  <Code size={iconSize} />,
  <Feather size={iconSize} />,
  <Command size={iconSize} />,
  <Clock size={iconSize} />,
];

const getIcon = (index: number): ReactElement => {
  return iconList[index] ?? <Sparkles size={iconSize} />;
};

export const FeaturesBlock: React.FC<FeaturesSectionBlock> = ({
  header,
  title,
  description,
  features,
  image = '',
  layout,
  blockName
}) => {
    const mappedFeatures: Feature[] = (features ?? []).map((feature, index) => ({
    ...feature,
    id: index + 1,
    icon: getIcon(index),
    }));

  return layout==='withImage' ? (
    <WithImage
      header={header ?? ''}
      title={title}
      description={description ?? ''}
      features={mappedFeatures}
      image={image}
      blockName={blockName || ''}
    />
  ) : (
    <Standard
      header={header ?? ''}
      title={title}
      description={description ?? ''}
      features={mappedFeatures}
      blockName={blockName || ''}
    />
  );
};