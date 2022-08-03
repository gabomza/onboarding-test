// Interfaces from data store

interface IStep {
  order: number
  title: string
  subtitle: string
  layout: string
  styles: string
}

interface IConfiguration {
  steps: IStep[]
}

// Shared interface for components

interface IOnboardingConfigurationProps {
  customerId: string
  configurations: IConfiguration
}

// Local storage interfaces

interface IOnboardingProgressStep {
  number: number
  completed: boolean
  additionalData?: object
}

interface IOnboardingProgress {
  steps: IOnboardingProgressStep[]
  currentStep: number
}

interface IOnboardingCustomerProgress {
  customerId: string
  progress: IOnboardingProgress
}

interface IOnboardingProgressStructure {
  items: IOnboardingCustomerProgress[]
}

export type {
  IConfiguration,
  IOnboardingProgress,
  IOnboardingProgressStep,
  IOnboardingCustomerProgress,
  IOnboardingProgressStructure,
  IOnboardingConfigurationProps,
  IStep,
}
