import React from 'react'
import css from './StepsProgress.module.css'

interface IStepsProgressProps {
  steps: number
  currentStep: number
}

const StepsProgress = (props: IStepsProgressProps) => {
  const { currentStep, steps } = props

  var stepsCells = []
  for (var i = 1; i <= steps; i++) {
    let conditionalClass = css.pending
    if (i <= currentStep) {
      conditionalClass = css.completed
    }
    stepsCells.push(<div key={i} className={`${css.step} ${conditionalClass}`} />)
  }

  return (
    <div className={css.stepsProgressContainer}>
      <div className={css.stepsProgressTitle}>
        Step {currentStep} of {steps}
      </div>
      <div className={css.stepsCells}>{stepsCells}</div>
    </div>
  )
}

export default StepsProgress
