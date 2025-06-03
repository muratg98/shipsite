'use client';

import { motion } from 'framer-motion';
import { Media } from '@/components/Media';
import { TeamBlock as TeamBlockType } from '@/payload-types';
import RichText from '@/components/RichText';

export const TeamBlock = ({ title, description, teamMembers, header, blockName }: TeamBlockType) => {
  return (
    <div className="p-4" id={blockName||undefined}>
      <div className="max-w-5xl max-lg:max-w-2xl mx-auto">
        <motion.div
          className="mx-auto max-w-4xl lg:text-center pb-24"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          viewport={{ once: true, amount: 0.2 }}
        >
          <h2 className="text-base/7 font-semibold text-indigo-600">{header}</h2>
          <p className="mt-2 text-4xl font-semibold tracking-tight text-pretty text-gray-900 sm:text-5xl lg:text-balance">
            {title}
          </p>
          <p className="mt-6 text-lg/8 text-gray-600">{description}</p>
        </motion.div>
        <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-8 max-md:justify-center max-md:max-w-xs mx-auto">
          {teamMembers.map((member, index) => (
            <motion.div
              key={index}
              className="border rounded-md overflow-hidden"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: 'easeOut', delay: index * 0.1 }}
              viewport={{ once: true, amount: 0.2 }}
            >
              <Media
                resource={member.image}
                alt={member.name}
                className="w-full object-contain aspect-square object-top bg-gray-200"
              />

              <div className="p-4">
                <h4 className="text-slate-900 text-base font-semibold">{member.name}</h4>
                <p className="text-slate-600 text-xs mt-1">{member.role}</p>

                {member.description && (
                <div className="mt-4">
                    <RichText data={member.description} enableGutter={false}/>
                </div>
                )}

                <div className="space-x-4 mt-4">
                  {member.socials?.facebook && (
                    <a
                      href={member.socials.facebook}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-7 h-7 inline-flex items-center justify-center rounded-full bg-blue-600 hover:bg-blue-700"
                    >
                      {/* Facebook Icon */}
                      <svg xmlns="http://www.w3.org/2000/svg" width="14px" fill="#fff" viewBox="0 0 155.139 155.139">
                        <path d="M89.584 155.139V84.378h23.742l3.562-27.585H89.584V39.184c0-7.984 2.208-13.425 13.67-13.425l14.595-.006V1.08C115.325.752 106.661 0 96.577 0 75.52 0 61.104 12.853 61.104 36.452v20.341H37.29v27.585h23.814v70.761h28.48z" />
                      </svg>
                    </a>
                  )}
                  {member.socials?.twitter && (
                    <a
                      href={member.socials.twitter}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-7 h-7 inline-flex items-center justify-center rounded-full bg-[#03a9f4] hover:bg-[#03a1f4]"
                    >
                      {/* Twitter Icon */}
                      <svg xmlns="http://www.w3.org/2000/svg" width="14px" fill="#fff" viewBox="0 0 512 512">
                        <path d="M512 97.248c-19.04 8.352-39.328 13.888-60.48 16.576 21.76-12.992 38.368-33.408 46.176-58.016-20.288 12.096-42.688 20.64-66.56 25.408C411.872 60.704 384.416 48 354.464 48c-58.112 0-104.896 47.168-104.896 104.992 0 8.32.704 16.32 2.432 23.936-87.264-4.256-164.48-46.08-216.352-109.792-9.056 15.712-14.368 33.696-14.368 53.056 0 36.352 18.72 68.576 46.624 87.232-16.864-.32-33.408-5.216-47.424-12.928v1.152c0 51.008 36.384 93.376 84.096 103.136-8.544 2.336-17.856 3.456-27.52 3.456-6.72 0-13.504-.384-19.872-1.792 13.6 41.568 52.192 72.128 98.08 73.12-35.712 27.936-81.056 44.768-130.144 44.768-8.608 0-16.864-.384-25.12-1.44C46.496 446.88 101.6 464 161.024 464c193.152 0 298.752-160 298.752-298.688 0-4.64-.16-9.12-.384-13.568 20.832-14.784 38.336-33.248 52.608-54.496z" />
                      </svg>
                    </a>
                  )}
                  {member.socials?.linkedin && (
                    <a
                      href={member.socials.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-7 h-7 inline-flex items-center justify-center rounded-full bg-[#0077b5] hover:bg-[#0055b5]"
                    >
                      {/* LinkedIn Icon */}
                      <svg xmlns="http://www.w3.org/2000/svg" width="14px" fill="#fff" viewBox="0 0 24 24">
                        <path d="M23.994 24v-.001H24v-8.802c0-4.306-.927-7.623-5.961-7.623-2.42 0-4.044 1.328-4.707 2.587h-.07V7.976H8.489v16.023h4.97v-7.934c0-2.089.396-4.109 2.983-4.109 2.549 0 2.587 2.384 2.587 4.243V24zM.396 7.977h4.976V24H.396zM2.882 0C1.291 0 0 1.291 0 2.882s1.291 2.909 2.882 2.909 2.882-1.318 2.882-2.909A2.884 2.884 0 0 0 2.882 0z" />
                      </svg>
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};