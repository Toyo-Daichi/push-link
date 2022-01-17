import axios from 'axios'
import { useState, useEffect } from 'react'
import { useStateMachine } from 'little-state-machine'
import { Chrono} from 'react-chrono'
import { Button, Grid, TextField } from '@material-ui/core'
//
import { updateContent } from '../cache'
// styles
import classes from './App.module.scss' 

const InputText = (props) => {
  const { state: { initialCache }, actions } = useStateMachine({ updateContent })
  const [comments, setComments] = useState(initialCache.comments)
  const [timeLines, setTimeLine] = useState([])
  //
  const handleSubmit = (action) => {
    if (action === 'back'){
      props.handleBack()
    } else if (action === 'next'){
      actions.updateContent({comments})
      props.handleNext()
    }
  }

  useEffect(() => {
    const func = async()=> {
      const getNum = 5
      const apiPath = `https://ftcg0rr8h3.execute-api.ap-northeast-1.amazonaws.com/api/history/${getNum}`
      const { data } = await axios.get(apiPath)
      const results = data.body
      setTimeLine([...timeLines, results])
    }
    func()
  }, [])

  return (
    <>
      <form onSubmit={(event)=>handleSubmit(event)} action='?'>
        <p>3. どんな問題に対して参考になったかどうかを入力して下さい。過去の5投稿を参考に掲載します！</p>
        <div className={classes.timeline}>
          <Chrono items={timeLines}
            mode="VERTICAL"
            hideControls
            slideItemDuration={4000}
            cardHeight={150}
            scrollable={{ scrollbar: true }} 
          />
        </div>
        <div className={classes.blank}></div>
        <TextField 
          variant='outlined' multiline rows={6} fullWidth
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