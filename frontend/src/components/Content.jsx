import axios from 'axios'
import { useState, useEffect } from 'react'
import { useStateMachine } from 'little-state-machine'
import { Grid, Step, StepLabel, Stepper } from '@material-ui/core'
import { updateContent } from '../cache'
// conponent
import InputSite from './InputSite'
import InputText from './InputText'
import Confirm from './Confirm'
import End from './End'

const Content = () => {
  const { state: { initialCache }, actions } = useStateMachine({ updateContent })
  const [activeStep, setActiveStep] = useState(0)
  const [timeLines, setTimeLine] = useState(initialCache.timeLines)
  const getSteps = ['サイト/カテゴリ入力フォーム', 'コメント入力フォーム', '確認フォーム']
  //
  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep+1)
  }
  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep-1)
  }
  const handleReset = () => {
    setActiveStep(0)
  }
  //
  const getStepContent = (props) => {
    switch (props.activeStep){
      case 0:
        return <InputSite handleNext={handleNext} />
      case 1:
        return <InputText handleBack={handleBack} handleNext={handleNext} />
      case 2:
        return <Confirm handleBack={handleBack} handleNext={handleNext} />
      case 3:
        return <End handleReset={handleReset} />
      default:
        return console.log('Unknwon stepIndex')
    }
  }

  useEffect(() => {
    const wait = () =>{
      const func = async()=> {
        console.log('func start')
        const getNum = 5
        const apiPath = `https://ftcg0rr8h3.execute-api.ap-northeast-1.amazonaws.com/api/history/${getNum}`
        console.log('api start')
        const { data } = await axios.get(apiPath)
        console.log('api end')
        const results = data.body
        console.log(results)
        setTimeLine([...results])
      }
      func()
    }
    wait()
    actions.updateContent({timeLines})
    console.log(JSON.stringify(timeLines))
  }, [])

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