'use client'

import React from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import RichText from '@/components/RichText'

type Props = {
  formID?: string
  isLoading: boolean
  hasSubmitted: boolean
  error?: { message: string; status?: string }
  onSubmit: (data: any) => void
  submitButtonLabel?: string
  confirmationMessage?: any
  confirmationType?: string
  enableIntro?: boolean
  introContent?: any
  secondaryContent?: boolean
  secondaryContentText?: any
}

const ContactUsForm: React.FC<Props> = ({
  formID,
  isLoading,
  hasSubmitted,
  error,
  onSubmit,
  submitButtonLabel,
  confirmationMessage,
  confirmationType,
  enableIntro,
  introContent,
  secondaryContent,
  secondaryContentText
}) => {
  const formMethods = useForm()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = formMethods

  return (
    <div className="mt-6">
      <div className="grid sm:grid-cols-2 items-start gap-12 p-8 mx-auto max-w-6xl bg-white shadow-[0_2px_10px_-3px_rgba(6,81,237,0.3)] rounded-md">
        <div>
            {secondaryContent && (
            <div className="text-slate-900">
                <RichText data={secondaryContentText} enableGutter={false}/>
            </div>
            )}

          <div className="mt-12">
            <h2 className="text-slate-900 text-base font-semibold">Email</h2>
            <ul className="mt-4">
              <li className="flex items-center">
                <div className="bg-[#e6e6e6cf] h-10 w-10 rounded-full flex items-center justify-center shrink-0">
                  {/* Email Icon */}
                  <svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" fill="#007bff" viewBox="0 0 479.058 479.058">
                    <path d="M434.146 59.882H44.912C20.146 59.882 0 80.028 0 104.794v269.47c0 24.766 20.146 44.912 44.912 44.912h389.234c24.766 0 44.912-20.146 44.912-44.912v-269.47c0-24.766-20.146-44.912-44.912-44.912zm0 29.941c2.034 0 3.969.422 5.738 1.159L239.529 264.631 39.173 90.982a14.902 14.902 0 0 1 5.738-1.159zm0 299.411H44.912c-8.26 0-14.971-6.71-14.971-14.971V122.615l199.778 173.141c2.822 2.441 6.316 3.655 9.81 3.655s6.988-1.213 9.81-3.655l199.778-173.141v251.649c-.001 8.26-6.711 14.97-14.971 14.97z" />
                  </svg>
                </div>
                <a href={`mailto:${process.env.NEXT_PUBLIC_EMAIL}`} className="text-sm ml-4">
                  <small className="block text-slate-900">Mail</small>
                  <span className="text-blue-600 font-medium">{process.env.NEXT_PUBLIC_EMAIL}</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div>
          {hasSubmitted && confirmationType === 'message' ? (
            confirmationMessage ? (
              <RichText data={confirmationMessage} />
            ) : (
              <p className="text-slate-700 text-lg">Thanks for reaching out! We’ll be in touch soon.</p>
            )
          ) : (
            <>
              {enableIntro && introContent && !hasSubmitted && (
                <RichText className="mb-6 text-slate-700" data={introContent} enableGutter={false} />
              )}

              {error && (
                <div className="mb-4 text-red-500 font-medium">
                  {error.status || 500}: {error.message}
                </div>
              )}

              {isLoading ? (
                <p className="text-slate-700">Submitting, please wait...</p>
              ) : (
                <FormProvider {...formMethods}>
                  <form id={formID} onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <input
                      type="text"
                      {...register('name', { required: true })}
                      placeholder="Your Name"
                      className="w-full border border-slate-300 rounded-md px-4 py-2 text-sm"
                    />
                    {errors.name && <p className="text-red-500 text-sm">Name is required.</p>}

                    <input
                      type="email"
                      {...register('email', { required: true })}
                      placeholder="Your Email"
                      className="w-full border border-slate-300 rounded-md px-4 py-2 text-sm"
                    />
                    {errors.email && <p className="text-red-500 text-sm">Valid email is required.</p>}

                    <textarea
                      {...register('message', { required: true })}
                      placeholder="Your Message"
                      className="w-full border border-slate-300 rounded-md px-4 py-2 text-sm min-h-[120px]"
                    />
                    {errors.message && <p className="text-red-500 text-sm">Message is required.</p>}

                    <button
                      type="submit"
                      className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded-md transition-all"
                    >
                      {submitButtonLabel || 'Send Message'}
                    </button>
                  </form>
                </FormProvider>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default ContactUsForm
