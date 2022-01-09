import { useState } from 'react'
import { Grid, Step, StepLabel, Stepper } from '@material-ui/core'
// conponent
import InputSite from './Input'
import InputText from './InputText'
import Confirm from './Confirm'

const Content = () => {
  const [activeStep, setActiveStep] = useState(0)
  const getSteps = ['サイト/カテゴリ入力フォーム', 'コメント入力フォーム', '確認フォーム']
  //
  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep+1)
  }
  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep-1)
  }
  //
  const getStepContent = (props) => {
    switch (props.activeStep){
      case 0:
        return <InputSite handleNext={handleNext}/>
      case 1:
        return <InputText handleBack={handleBack} handleNext={handleNext}/>
      case 2:
        return <Confirm />
      default:
        return 'Unknwon stepIndex'
    }
  }

  return (
    <>
    <p>DX案件で調べた技術調査を記録として残しましょう！</p>
      <Grid container>
        <Grid sm={12}>
          <Stepper activeStep={activeStep} alternativeLabel>
            {getSteps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          {getStepContent({activeStep})}
        </Grid>
      </Grid>
    </>
  )
}

export default Content