import { useState } from 'react'
import { Button } from '@material-ui/core'
import { Grid } from '@material-ui/core'
import { Step } from '@material-ui/core'
import { StepLabel } from '@material-ui/core'
import { Stepper } from '@material-ui/core'

const getSteps = ['入力フォーム', '確認フォーム', '登録完了メール送信']

const getStepContent = (props) => {
  switch (props.activeStep){
    case 0:
      return <div>Hello World</div>
      // return <Input />
      case 1:
      return <div>Hello World</div>
      // return <Confirm />
      case 2:
        return <div>Hello World</div>
        // return <End />
    default:
      return 'Unknwon stepIndex'
  }
}

const Content = () => {

  const [activeStep, setActivStep] = useState(0)
  const handleNext = () => {
    setActivStep((prevActiveStep) => prevActiveStep+1)
  }
  const handleBack = () => {
    setActivStep((prevActiveStep) => prevActiveStep-1)
  }
  const handleReset = () => {
    setActivStep(0)
  }

  return (
    <Grid container>
      <Grid sm={12}>
        <Stepper activeStep={0} alternativeLabel>
          {getSteps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        {activeStep === getSteps.length ?(
          <div>
            <Button onClick={handleReset}>リセット</Button>
          </div>
          ) : (
          <div>
            {getStepContent({activeStep})}
            <Button disabled={activeStep === 0} onClick={handleBack}>
              戻る
            </Button>
            <Button variant='contained' color='primary' onClick={handleNext}>
              {activeStep === getSteps.length - 1 ? '送信' : '次へ'}
            </Button>
          </div>
          )
        }
      </Grid>
    </Grid>
  )
}

export default Content