import React, { useEffect } from 'react'
import Image from 'next/image'
import { IOnboardingConfigurationProps } from '../../interfaces/configurations'
import { saveInitialProgress } from '../../utils/onboardingUtils'
import { useRouter } from 'next/router'
import StepContainer from '../common/StepContainer'
import Link from 'next/link'

const OnboardingLanding = (props: IOnboardingConfigurationProps) => {
  const router = useRouter()

  const { configurations, customerId } = props
  const stepsAmount = configurations?.steps?.length > 1 ? configurations?.steps?.length + 1 : 1

  const availableSteps = stepsAmount > 1

  useEffect(() => {
    saveInitialProgress(configurations.steps, customerId)
  }, [])

  const navigateToNextStep = () => {
    if (availableSteps) {
      router.push(`/onboarding/${customerId}/steps/2`)
    }
  }

  const renderBody = () => {
    return (
      <>
        <div className="iconContainer">
          <Image src="/onboarding-icons/organization.svg" width={50} height={50} />
          <span className="iconText">Tell us about your organization</span>
        </div>
        <div className="iconContainer">
          <Image src="/onboarding-icons/vehicle.svg" width={50} height={50} />
          <span className="iconText">Tell us about your vehicles</span>
        </div>
        <div className="iconContainer">
          <Image src="/onboarding-icons/chart.svg" width={50} height={50} />
          <span className="iconText">See how much you can save</span>
        </div>
      </>
    )
  }

  const renderButtons = () => {
    return (
      <button className={!availableSteps ? 'disabled' : ''} onClick={navigateToNextStep}>
        Create your first vehicle set
      </button>
    )
  }

  return (
    <>
      <StepContainer
        customerId={customerId}
        title="Going electric starts with understanding your needs"
        subTitle="We need to understand your requirements so we can recommend the appropriate electric vehicle, charger and
          identify incentives."
        body={renderBody()}
        buttons={renderButtons()}
      />
      <div className="backButtonContainer">
        <Link href="/">Choose a different customer</Link>
      </div>
    </>
  )
}

export default OnboardingLanding
