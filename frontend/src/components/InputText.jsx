import { useState } from 'react'
import { useStateMachine } from 'little-state-machine'
import { Button, Grid, TextField } from '@material-ui/core'
import { Timeline, TimelineItem } from '@mui/lab'
import { TimelineSeparator, TimelineConnector, TimelineContent, TimelineDot} from '@mui/lab'
//
import { updateContent } from '../cache'
// styles
import classes from './App.module.scss' 

const InputText = (props) => {
  const { state: { initialCache }, actions } = useStateMachine({ updateContent })
  const [comments, setComments] = useState(initialCache.comments)

  const handleSubmit = (action) => {
    if (action === 'back'){
      props.handleBack()
    } else if (action === 'next'){
      actions.updateContent({comments})
      props.handleNext()
    }
  }

  return (
    <>
      <form onSubmit={(event)=>handleSubmit(event)} action='?'>
        <p>3. どんな問題に対して参考になったかどうかを入力して下さい。過去の3投稿を参考に掲載します！</p>
        <Timeline>
          <TimelineItem>
            <TimelineSeparator>
              <TimelineDot />
              <TimelineConnector />
              <TimelineContent>
                Eat
              </TimelineContent>
            </TimelineSeparator>
          </TimelineItem>
          <TimelineItem>
            <TimelineSeparator>
              <TimelineDot />
              <TimelineConnector />
              <TimelineContent>
                Code
              </TimelineContent>
            </TimelineSeparator>
          </TimelineItem>
        </Timeline>
        <TextField 
          variant='outlined' multiline rows={4} fullWidth
          onChange={(event)=>setComments(event.target.value)}
        />
        <div className={classes.blank}></div>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Button type='submit' variant="outlined" onClick={()=>handleSubmit('back')} fullWidth>
              戻る
            </Button>
          </Grid>
          <Grid item xs={6}>
            <Button type='submit' variant="contained" color='primary' onClick={()=>handleSubmit('next')} fullWidth>
              次へ
            </Button>
          </Grid>
        </Grid>
      </form>
    </>
  )
}

export default InputText