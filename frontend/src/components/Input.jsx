import { useState } from 'react'
import { useStateMachine } from 'little-state-machine'
import { Button, FormControl, Grid} from '@material-ui/core'
import { InputLabel, MenuItem, Select, TextField } from '@material-ui/core'
//
import { updateContent } from '../cache'
// styles
import classes from './App.module.scss' 

// Main
const Input = (props) => {
  const { state: { initialCache }, actions } = useStateMachine({ updateContent })
  const [site, setSite] = useState(initialCache.site)
  const [kind, setKind] = useState(initialCache.kind)
  const [labels, setLabels] = useState(initialCache.labels)
  //
  const handleSubmit = () => {
    actions.updateContent({site,kind,labels})
    props.handleNext()
  }
  
  return (
    <>
      <form onSubmit={(event)=>handleSubmit(event)} action='?'>
        <p>1. 参考になったサイトを入力して下さい。</p>
        <Grid container spacing={2}>
          <Grid item xs={4}>
            <FormControl fullWidth>
              <InputLabel id="site-kind"> サイト種類</InputLabel>
              <Select
                labelId="site-kind" id="site-kind-id" value={kind} label="" variant='standard'
                MenuProps={{
                  anchorOrigin: {
                    vertical: "bottom",
                    horizontal: "left"
                  },
                  transformOrigin: {
                    vertical: "top",
                    horizontal: "left"
                  },
                  getContentAnchorEl: null,
                }}
                onChange={(event)=>setKind(event.value)}
              >
                <MenuItem value={'Qiita'}>Qiita</MenuItem>
                <MenuItem value={'Zenn'}>Zenn</MenuItem>
                <MenuItem value={'Classmethod'}>Class method</MenuItem>
                <MenuItem value={'公式Reference'}>AWS 公式Reference</MenuItem>
                <MenuItem value={'その他'}>その他</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={8}>
            <TextField
              id="outlined-textarea" label="サイトURL" placeholder="https://" variant='standard' fullWidth
              onChange={(event)=>setSite(event.target.value)}  
            />
          </Grid>
        </Grid>
        <p>2. 参考になったサイトのカテゴリを入力して下さい。</p>
        <TextField
          id="outlined-textarea" label="技術カテゴリ" placeholder="https://localhost:3000" fullWidth
          onChange={(event)=>setLabels(event.target.value)}  
        />
        <div className={classes.blank}></div>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Button variant="outlined" disabled fullWidth>戻る</Button>
          </Grid>
          <Grid item xs={6}>
            <Button type='submit' variant="contained" color='primary' fullWidth>次へ</Button>
          </Grid>
        </Grid>
      </form>
    </>
  )
}

export default Input