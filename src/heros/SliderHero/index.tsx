"use client";

import React from "react";
import { motion } from "framer-motion";
import HeroSlider, { Slide, Nav, Overlay } from "hero-slider";
import type { Page } from "@/payload-types";
import { CMSLink } from "@/components/Link";
import RichText from "@/components/RichText";
import { Media } from "@/components/Media";
import 'hero-slider/dist/index.css';

export const SliderHero: React.FC<Page["hero"]> = ({
  richText,
  topText,
  showTopText,
  links,
  slider,
  sliderImages,
  backgroundImage,
}) => {
  const shouldUseSlider = slider && sliderImages && sliderImages.length > 0;

  const renderSlides = () =>
    sliderImages?.map(({ image }, index) => (
      <Slide
        key={index}
        background={{
            backgroundImageSrc: typeof image === "object" && image?.url ? image.url : undefined,
        }}
      />
    ));

  return (
    <div className="relative w-full h-screen overflow-hidden">
      {shouldUseSlider ? (
        <HeroSlider
        
          height="100vh"
          autoplay
          controller={{
            initialSlide: 1,
            slidingDuration: 500,
            slidingDelay: 100,
            onSliding: (nextSlide) => console.log("Sliding to", nextSlide),
            onBeforeSliding: (prev, next) => console.log("Before slide", prev, next),
            onAfterSliding: (next) => console.log("After slide", next),
          }}
        >
          {renderSlides()}
          <Nav 
            color="white"
            />
            <Overlay>
            <div className="relative z-10 flex h-full items-center justify-center flex-col px-4 text-center text-white bg-black/40">
            {showTopText && topText && (
            <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="mb-4 inline-block rounded-full border border-white/40 px-4 py-1 text-sm font-medium"
            >
                {topText}
            </motion.div>
            )}

            {richText && (
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.2 }}
                className="relative z-10 mx-auto max-w-4xl text-white"
            >
                <RichText data={richText} enableGutter={false} />
            </motion.div>
            )}

            {links && links.length > 0 && (
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3, delay: 0.4 }}
                className="relative z-10 mt-8 flex flex-wrap items-center justify-center gap-4"
            >
                {links.map(({ link }, i) => (
                <CMSLink
                    key={i}
                    {...link}
                    className="transform rounded-lg border border-white bg-white/90 px-6 py-2 font-medium text-black transition-all duration-300 hover:-translate-y-0.5 hover:bg-white"
                />
                ))}
            </motion.div>
            )}
        </div>
        </Overlay>
        </HeroSlider>
      ) : backgroundImage && typeof backgroundImage === "object" ? (
        <div
          className="absolute inset-0 bg-cover bg-center z-0"
          style={{ backgroundImage: `url(${backgroundImage.url})` }}
        />
        
      ) : null}
<div className="relative z-10 flex h-full items-center justify-center flex-col px-4 text-center text-white bg-black/40">
            {showTopText && topText && (
            <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="mb-4 inline-block rounded-full border border-white/40 px-4 py-1 text-sm font-medium"
            >
                {topText}
            </motion.div>
            )}

            {richText && (
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.2 }}
                className="relative z-10 mx-auto max-w-4xl text-white"
            >
                <RichText data={richText} enableGutter={false} />
            </motion.div>
            )}

            {links && links.length > 0 && (
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3, delay: 0.4 }}
                className="relative z-10 mt-8 flex flex-wrap items-center justify-center gap-4"
            >
                {links.map(({ link }, i) => (
                <CMSLink
                    key={i}
                    {...link}
                    className="transform rounded-lg border border-white bg-white/90 px-6 py-2 font-medium text-black transition-all duration-300 hover:-translate-y-0.5 hover:bg-white"
                />
                ))}
            </motion.div>
            )}
        </div>
      {/* Overlay content */}
      
    </div>
  );
};
