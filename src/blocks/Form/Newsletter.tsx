'use client'

import React from 'react'
import { useForm, FormProvider } from 'react-hook-form'
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
}

const NewsletterForm: React.FC<Props> = ({
  formID,
  isLoading,
  hasSubmitted,
  error,
  onSubmit,
  submitButtonLabel,
  confirmationMessage,
  confirmationType,
  enableIntro,
  introContent
}) => {
  const formMethods = useForm()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = formMethods

  return (
    <div className="bg-indigo-900 py-16 px-6">
      <div className="max-w-5xl mx-auto text-center">
        {hasSubmitted && confirmationType === 'message' ? (
            confirmationMessage ? (
                <RichText data={confirmationMessage} className="text-white text-lg" enableGutter={false} />
              ) : (
                <p className="text-white text-lg">Thank you for subscribing!</p>
              )
            ) : (
          <>
             {enableIntro && introContent && !hasSubmitted && (
          <RichText className="mb-8 text-white" data={introContent} enableGutter={false} />
        )}

            {error && (
              <div className="mt-4 text-red-300 font-medium">
                {error.status || 500}: {error.message}
              </div>
            )}

            {isLoading ? (
              <p className="mt-6 text-white">Loading, please wait...</p>
            ) : (
              <FormProvider {...formMethods}>
                <form id={formID} onSubmit={handleSubmit(onSubmit)} className="mt-12">
                  <div className="flex items-center overflow-hidden bg-gray-50 rounded-md max-w-xl mx-auto">
                    <input
                      type="email"
                      placeholder="Enter your email"
                      {...register('email', { required: true })}
                      className="w-full bg-transparent py-3.5 px-4 text-slate-900 text-base focus:outline-none"
                    />
                    <button
                      type="submit"
                      className="bg-indigo-600 hover:bg-indigo-600/90 text-white text-base tracking-wide py-3.5 px-6 hover:shadow-md transition-transform hover:scale-105 focus:outline-none"
                    >
                      {submitButtonLabel || 'Subscribe'}
                    </button>
                  </div>
                  {errors.email && (
                    <p className="text-red-400 text-sm mt-2">Please enter a valid email address.</p>
                  )}
                </form>
              </FormProvider>
            )}
          </>
        )}
      </div>
    </div>
  )
}

export default NewsletterForm
