import React, { useState } from 'react'

interface IStepContainerProps {
  customerId: string
  title: string
  subTitle: string
  body: JSX.Element
  buttons: JSX.Element
  styles?: string
  errorMessage?: string
}

const StepContainer = (props: IStepContainerProps) => {
  const { title, subTitle, body, buttons, styles, errorMessage } = props

  return (
    <>
      {styles && <style dangerouslySetInnerHTML={{ __html: styles }}></style>}
      <div className="stepContainer">
        <div className="stepContainerTitle stepContainerText">{title}</div>
        <div className="stepContainerSubTitle stepContainerText">{subTitle}</div>
        <div className="iconsContainer stepContainerText">{body}</div>
        <div className="buttonContainer">
          {buttons}
          {errorMessage && <div className="stepError">{errorMessage}</div>}
        </div>
      </div>
    </>
  )
}

export default StepContainer
