import { useState } from 'react'
import { useStateMachine } from 'little-state-machine'
import { Button, FormControl, Grid} from '@material-ui/core'
import { InputLabel, MenuItem, Select, TextField } from '@material-ui/core'
//
import { updateContent } from '../cache'
// styles
import classes from './Input.module.scss' 

// Main
const Input = () => {
  const { state: { initialCache }, actions } = useStateMachine({ updateContent })
  const [site, setSite] = useState(initialCache.site)
  const [kind, setKind] = useState(initialCache.kind)
  const [labels, setLabels] = useState(initialCache.labels)
  //
  const Introduction = () => {
    return <p>DX案件で調べた技術調査を記録として残しましょう。</p>
  }
  const handleSubmit = (props) => {
    actions.updateContent({site,labels})
    props.handleNext()
  }

  return (
    <>
      <Introduction />
      <form onSubmit={(event)=>handleSubmit(event)}>
        <p>1. 参考になったサイトを入力して下さい。</p>
        <Grid container spacing={2}>
          <Grid item xs={4}>
            <FormControl fullWidth>
              <InputLabel id="site-kind">　サイト種類</InputLabel>
              <Select
                labelId="demo-simple-select-label" id="demo-simple-select" value={kind} label="" variant='outlined'
                onChange={(event)=>setKind(event.target.value)}
              >
                <MenuItem value={'Qiita'}>Qiita</MenuItem>
                <MenuItem value={'Zenn'}>Zenn</MenuItem>
                <MenuItem value={'Classmethod'}>Class method</MenuItem>
                <MenuItem value={'その他'}>その他</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={8}>
            <TextField
              id="outlined-textarea" label="サイトURL" placeholder="https://" variant='outlined' fullWidth
              onChange={(event)=>setSite(event.target.value)}  
            />
          </Grid>
        </Grid>
        <p>2. 参考になったサイトのカテゴリを入力して下さい。</p>
        <TextField
          id="outlined-textarea" label="技術カテゴリ" placeholder="https://localhost:3000" fullWidth
          onChange={(event)=>setLabels(event.target.value)}  
        />
        <div className={classes.button}>
          <Button>次へ</Button>
        </div>
      </form>
    </>
  )
}

export default Input