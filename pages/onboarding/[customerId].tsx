import React from 'react'
import OnboardingLanding from '../../src/components/onboarding/OnboardingLanding'
import StepsProgress from '../../src/components/onboarding/StepsProgress'
import { IOnboardingConfigurationProps } from '../../src/interfaces/configurations'
import { loadConfigurationsFromFile } from '../../src/utils/onboardingUtils'

const OnboardingPage = (props: IOnboardingConfigurationProps) => {
  const { configurations } = props

  return (
    <>
      <StepsProgress steps={configurations?.steps?.length ? configurations.steps.length + 1 : 1} currentStep={1} />
      <OnboardingLanding {...props} />
    </>
  )
}

export const getServerSideProps = async (context) => {
  try {
    const { customerId } = context.params
    const configurations = await loadConfigurationsFromFile(customerId)

    return {
      props: {
        customerId,
        configurations,
      },
    }
  } catch (e) {
    console.log('Error loading customer configurations', e)
    return {
      props: {
        customerId: '',
        configurations: {},
      },
    }
  }
}

export default OnboardingPage
