import { promises as fs } from 'fs'
import {
  IOnboardingProgressStep,
  IOnboardingProgressStructure,
  IOnboardingCustomerProgress,
  IStep,
} from '../interfaces/configurations'
import { getStorageValue, saveStorageValue } from './localStorage'

// Progress state

const saveInitialProgress = (newSteps: IStep[], customerId: string) => {
  let dataFromStorage = getAllProgressesFromLocalStorage()

  const initialProgressState = {
    customerId,
    progress: {
      steps: newSteps.map((newStep) => {
        return {
          number: newStep.order,
          completed: false,
        }
      }),
      currentStep: 0,
    },
  }

  // No local storage data at all
  if (!dataFromStorage) {
    dataFromStorage = {
      items: [initialProgressState],
    }
  } else if (dataFromStorage?.items) {
    const storedProgressForCustomer = getCustomerProgress(customerId)
    if (!storedProgressForCustomer || !storedProgressForCustomer.progress) {
      dataFromStorage.items.push(initialProgressState)
    }
  }

  saveStorageValue('onboarding', dataFromStorage)
}

const saveCustomerProgress = (customerId: string, currentStep: number, additionalData?: object) => {
  const dataFromStorage = getAllProgressesFromLocalStorage()
  let customerProgressInStorage = dataFromStorage.items.find((item) => item.customerId === customerId)
  if (customerProgressInStorage) {
    const stepToUpdate = customerProgressInStorage.progress.steps.find((step) => step.number === currentStep)
    if (stepToUpdate) {
      stepToUpdate.completed = true
      stepToUpdate.additionalData = additionalData
    }
  }
  saveStorageValue('onboarding', dataFromStorage)
}

const getAllProgressesFromLocalStorage = () => {
  return getStorageValue('onboarding') as IOnboardingProgressStructure
}

const getCustomerProgress = (customerId: string) => {
  return getAllProgressesFromLocalStorage().items?.find((item) => item.customerId === customerId)
}

// Helpers
const loadConfigurationsFromFile = async (customerId: string) => {
  const fileContents = await fs.readFile(`${process.cwd()}/src/configs/${customerId}.json`, 'utf8')
  return JSON.parse(fileContents)
}

export { loadConfigurationsFromFile, saveInitialProgress, saveCustomerProgress, getCustomerProgress }
