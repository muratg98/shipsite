'use client'

import type { FormFieldBlock, Form as FormType } from '@payloadcms/plugin-form-builder/types'
import { useRouter } from 'next/navigation'
import React, { useCallback, useState } from 'react'
import { useForm, FormProvider } from 'react-hook-form'
import RichText from '@/components/RichText'
import type { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical'

import { getClientSideURL } from '@/utilities/getURL'
import NewsletterForm from './Newsletter'
import ContactUsForm from './ContactUsForm'
import { Button } from '@payloadcms/ui'
import { fields } from './fields'

export type FormBlockType = {
  blockName?: string
  blockType?: 'formBlock'
  enableIntro: boolean
  form: FormType
  introContent?: SerializedEditorState
  secondaryContent?: boolean
  secondaryContentText?: SerializedEditorState

}

export const FormBlock: React.FC<{ id?: string } & FormBlockType> = (props) => {
  const {
    enableIntro,
    secondaryContent,
    secondaryContentText,
    form: formFromProps,
    form: { id: formID, confirmationMessage, confirmationType, redirect, submitButtonLabel, formStyle } = {},
    introContent,
  } = props

  const formMethods = useForm({ defaultValues: formFromProps.fields })

  const [isLoading, setIsLoading] = useState(false)
  const [hasSubmitted, setHasSubmitted] = useState(false)
  const [error, setError] = useState<{ message: string; status?: string }>()
  const router = useRouter()

  const onSubmit = useCallback(
    async (data: FormFieldBlock[]) => {
      let loadingTimerID: ReturnType<typeof setTimeout>

      const dataToSend = Object.entries(data).map(([name, value]) => ({
        field: name,
        value,
      }))

      loadingTimerID = setTimeout(() => {
        setIsLoading(true)
      }, 1000)

      try {
        const req = await fetch(`${getClientSideURL()}/api/form-submissions`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            form: formID,
            submissionData: dataToSend,
          }),
        })

        const res = await req.json()
        clearTimeout(loadingTimerID)

        if (req.status >= 400) {
          setIsLoading(false)
          setError({
            message: res.errors?.[0]?.message || 'Internal Server Error',
            status: res.status,
          })
          return
        }

        setIsLoading(false)
        setHasSubmitted(true)

        if (confirmationType === 'redirect' && redirect?.url) {
          router.push(redirect.url)
        }
      } catch (err) {
        console.warn(err)
        clearTimeout(loadingTimerID)
        setIsLoading(false)
        setError({ message: 'Something went wrong.' })
      }
    },
    [formID, redirect, confirmationType, router]
  )

  // Pass everything relevant down to form components
  const sharedProps = {
    enableIntro,
    formFromProps,
    introContent,
    secondaryContent,
    secondaryContentText,
    submitButtonLabel,
    formID,
    confirmationMessage,
    confirmationType,
    isLoading,
    hasSubmitted,
    error,
    formMethods,
    onSubmit,
  }

  if (formStyle === 'newsletter') {
    return <NewsletterForm {...sharedProps} />
  }

  if (formStyle === 'contact') {
    return <ContactUsForm {...sharedProps} />
  }

  return (
    <div className="container lg:max-w-[48rem]">
      {enableIntro && introContent && !hasSubmitted && (
        <RichText className="mb-8 lg:mb-12" data={introContent} enableGutter={false} />
      )}
  
      {secondaryContent && secondaryContentText && (
        <div className="mb-8 lg:mb-12">
          <RichText className="text-slate-900" data={secondaryContentText} enableGutter={false} />
        </div>
      )}
  
      <div className="p-4 lg:p-6 border border-border rounded-[0.8rem]">
        <FormProvider {...formMethods}>
          {!isLoading && hasSubmitted && confirmationType === 'message' && (
            <RichText data={confirmationMessage} />
          )}
          {isLoading && !hasSubmitted && <p>Loading, please wait...</p>}
          {error && <div>{`${error.status || '500'}: ${error.message || ''}`}</div>}
          {!hasSubmitted && (
            <form id={formID} onSubmit={formMethods.handleSubmit(onSubmit)}>
              <div className="mb-4 last:mb-0">
                {formFromProps?.fields?.map((field, index) => {
                  const Field: React.FC<any> = fields?.[field.blockType as keyof typeof fields]
                  if (Field) {
                    return (
                      <div className="mb-6 last:mb-0" key={index}>
                        <Field
                          form={formFromProps}
                          {...field}
                          {...formMethods}
                          control={formMethods.control}
                          errors={formMethods.formState.errors}
                          register={formMethods.register}
                        />
                      </div>
                    )
                  }
                  return null
                })}
              </div>
              <Button form={formID} type="submit" variant="default">
                {submitButtonLabel}
              </Button>
            </form>
          )}
        </FormProvider>
      </div>
    </div>
  )
  }
