import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import StepContainer from '../../../../src/components/common/StepContainer'
import StepsProgress from '../../../../src/components/onboarding/StepsProgress'
import { IConfiguration } from '../../../../src/interfaces/configurations'
import {
  getCustomerProgress,
  loadConfigurationsFromFile,
  saveCustomerProgress,
} from '../../../../src/utils/onboardingUtils'

interface IStepPageProps {
  configurations: IConfiguration
  currentStep: number
  customerId: string
}

interface IFormData {
  key: string
  value: string
}

const StepPage = (props: IStepPageProps) => {
  const router = useRouter()

  const { configurations, currentStep, customerId } = props
  const currentStepConfiguration = configurations.steps.find((step) => step.order === currentStep - 1)
  const isNextStepAvailable = configurations?.steps?.length + 1 > currentStep

  const [isStepCompleted, setIsStepCompleted] = useState<boolean>(false)
  const [errorMessage, setErrorMessage] = useState<string>('')

  useEffect(() => {
    if (isStepCompleted) {
      setErrorMessage('')
      setIsStepCompleted(false)
      saveCustomerProgress(customerId, currentStep - 1, getFormData())
      if (isNextStepAvailable) {
        router.push(`/onboarding/${customerId}/steps/${currentStep + 1}`)
      }
    }
  }, [isStepCompleted])

  useEffect(() => {
    // Generic solution to load form data from storage
    const customerStoredProgress = getCustomerProgress(customerId)
    if (customerStoredProgress?.progress?.steps) {
      const currentStepStoredData = customerStoredProgress.progress.steps.find(
        (step) => step.number === currentStep - 1,
      )
      if (currentStepStoredData?.additionalData) {
        const data = currentStepStoredData?.additionalData
        for (const item in data) {
          if (document.getElementsByName(data[item].key)) {
            const targetField = document.getElementsByName(data[item].key)[0] as any
            targetField.value = data[item].value
          }
        }
      }
    }
  }, [currentStep])

  // Navigation

  const gotoPreviousStep = () => {
    if (currentStep === 2) {
      router.push(`/onboarding/${customerId}`)
    } else {
      router.push(`/onboarding/${customerId}/steps/${currentStep - 1}`)
    }
  }

  const gotoNextStep = () => {
    validateFormElements()
  }

  // Render

  const renderBody = () => {
    return <div dangerouslySetInnerHTML={{ __html: currentStepConfiguration?.layout || '' }}></div>
  }

  const renderButtons = () => {
    return (
      <div className="stepsButtonContainer">
        <button onClick={gotoPreviousStep}>Back</button>
        {isNextStepAvailable && <button onClick={gotoNextStep}>Next</button>}
      </div>
    )
  }

  // Generic solution to save form data in local storage
  const getFormData = () => {
    const inputFields = document.getElementsByTagName('input')
    const selectFields = document.getElementsByTagName('select')
    const textareaFields = document.getElementsByTagName('textarea')
    const savedValues: IFormData[] = []
    if (inputFields) {
      for (let inputField of inputFields) {
        savedValues.push({ key: inputField.name, value: inputField.value })
      }
    }
    if (selectFields) {
      for (let selectField of selectFields) {
        savedValues.push({ key: selectField.name, value: selectField.value })
      }
    }
    if (textareaFields) {
      for (let textareaField of textareaFields) {
        savedValues.push({ key: textareaField.name, value: textareaField.value })
      }
    }
    return savedValues
  }

  // Validations
  const validateFormElements = () => {
    const inputFields = document.getElementsByTagName('input')
    const selectFields = document.getElementsByTagName('select')
    const textareaFields = document.getElementsByTagName('textarea')
    let hasErrors = false
    if (inputFields) {
      for (let inputField of inputFields) {
        if (!inputField.value) {
          hasErrors = true
          break
        }
      }
    }
    if (selectFields) {
      for (let selectField of selectFields) {
        if (!selectField.value) {
          hasErrors = true
          break
        }
      }
    }
    if (textareaFields) {
      for (let textareaField of textareaFields) {
        if (!textareaField.value) {
          hasErrors = true
          break
        }
      }
    }
    if (hasErrors) {
      setErrorMessage('Please check your information.')
      return
    }
    setIsStepCompleted(true)
  }

  return (
    <>
      <StepsProgress
        steps={configurations?.steps?.length ? configurations.steps.length + 1 : 1}
        currentStep={currentStep}
      />
      <StepContainer
        customerId={customerId}
        title={currentStepConfiguration?.title || ''}
        subTitle={currentStepConfiguration?.subtitle || ''}
        body={renderBody()}
        buttons={renderButtons()}
        styles={currentStepConfiguration?.styles || ''}
        errorMessage={errorMessage}
      />
    </>
  )
}

export const getServerSideProps = async (context) => {
  const { customerId, step } = context.params

  const configurations = await loadConfigurationsFromFile(customerId)

  return {
    props: {
      currentStep: Number(step),
      configurations,
      customerId,
    },
  }
}

export default StepPage
