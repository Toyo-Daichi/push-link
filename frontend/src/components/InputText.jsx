import { useState } from 'react'
import { useStateMachine } from 'little-state-machine'
import { Button, Grid, TextField } from '@material-ui/core'
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
        <p>3. どんな問題に対して参考になったかどうかを入力して下さい。</p>
        <TextField
          id="outlined-textarea" label="サイトURL" placeholder="https://" variant='standard' fullWidth
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