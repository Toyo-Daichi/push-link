import { useState } from 'react'
import { StateMachineProvider, createStore } from 'little-state-machine'
import { Grid, Step, StepLabel, Stepper } from '@material-ui/core'
import { initialState } from '../cache'
// conponent
import Input from './Input'
import Confirm from './Confirm'
import End from './End'
//
createStore({...initialState})

const Content = () => {
  const [activeStep, setActivStep] = useState(0)
  const getSteps = ['サイト/ラベル入力フォーム', 'コメント入力フォーム', '確認フォーム']
  //
  const handleNext = () => {
    setActivStep((prevActiveStep) => prevActiveStep+1)
  }
  const handleBack = () => {
    setActivStep((prevActiveStep) => prevActiveStep-1)
  }
  const getStepContent = (props) => {
    switch (props.activeStep){
      case 0:
        return <Input handleNext={handleNext} />
      case 1:
        return <Confirm handleBack={handleBack} handleNext={handleNext}/>
      case 2:
        return <End handleBack={handleBack} />
      default:
        return 'Unknwon stepIndex'
    }
  }

  return (
    <StateMachineProvider>
      <Grid container>
        <Grid sm={12}>
          <Stepper activeStep={activeStep} alternativeLabel>
            {getSteps.map((label) => (
              <Step key={label} >
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          {getStepContent({activeStep})}
        </Grid>
      </Grid>
    </StateMachineProvider>
  )
}

export default Content