import { useState } from 'react'
import { Grid, Step, StepLabel, Stepper } from '@material-ui/core'
// conponent
import Input from './Input'
import Confirm from './Confirm'
import End from './End'

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
        return <Input handleNext={handleNext}/>
      case 1:
        return <Confirm handleBack={handleBack} handleNext={handleNext}/>
      case 2:
        return <End />
      default:
        return 'Unknwon stepIndex'
    }
  }

  return (
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
  )
}

export default Content