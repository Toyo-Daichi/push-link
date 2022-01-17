import axios from 'axios'
import { useState } from 'react'
import { useStateMachine } from 'little-state-machine'
import { Box, Button, Chip, FormControl, Grid} from '@material-ui/core'
import { InputLabel, MenuItem, Select, TextField } from '@material-ui/core'
import { useTheme } from '@mui/material/styles'
//
import { updateContent } from '../cache'
// styles
import classes from './App.module.scss' 

// Main
const InputSite = (props) => {
  const { state: { initialCache }, actions } = useStateMachine({ updateContent })
  const [site, setSite] = useState(initialCache.site)
  const [kind, setKind] = useState(initialCache.kind)
  const [labels, setLabels] = useState(initialCache.labels)
  const [timeLines, setTimeLines] = useState(initialCache.timeLines)
  //
  const labelList = [
    'AWS', 'Azure', 'Linux', 'Git', 'Docker', 'Python', 'Javascript', 'TypeScript', 'React', 'Other', 'Column'
  ]
  const theme = useTheme()
  function getStyles(name, personName, theme) {
    return {
      fontWeight:
        personName.indexOf(name) === -1
          ? theme.typography.fontWeightRegular
          : theme.typography.fontWeightMedium,
    };
  }
  const handleChange = (event) => {
    const { target: {value} } = event
    setLabels(value)
    actions.updateContent({labels})
  }
  const chipDelete = (event) => {
    setLabels(labels.filter(value => value !== event))
    actions.updateContent({labels})
  }
  //
  const handleSubmit = async(event) => {
    event.preventDefault()
    const getNum = 5
    const apiPath = `https://ftcg0rr8h3.execute-api.ap-northeast-1.amazonaws.com/api/history/${getNum}`
    const { data } = await axios.get(apiPath)
    const results = data.body
    for (let i = 0; i < results.length; i++){
     const iobj = {
        title: results[i].date,
        cardTitle: results[i].site,
        cardSubtitle: results[i].labels,
        cartDetailedTitle: results[i].comments
      }
      setTimeLines([...timeLines, iobj])
      console.log(iobj)
    }
    actions.updateContent({site,kind,timeLines})
    props.handleNext()
  }
  return (
    <>
      <form onSubmit={(event)=>handleSubmit(event)} action='?'>
        <p>1. 参考になったサイトを入力して下さい。</p>
        <Grid container spacing={2}>
          <Grid item xs={4}>
            <FormControl fullWidth>
              <InputLabel id="site-kind">サイト種類</InputLabel>
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
                onChange={(event)=>setKind(event.target.value)}
              >
                <MenuItem value={'Qiita'}>Qiita</MenuItem>
                <MenuItem value={'Zenn'}>Zenn</MenuItem>
                <MenuItem value={'Classmethod'}>Class method</MenuItem>
                <MenuItem value={'公式Reference'}>公式Reference</MenuItem>
                <MenuItem value={'その他'}>その他</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={8}>
            <TextField
              id="outlined-textarea" label="サイトURL" placeholder="https://" variant='standard' fullWidth
              onChange={(event)=>setSite(event.target.value)} value={site}
            />
          </Grid>
        </Grid>
        <p>2. 参考になったサイトのカテゴリを入力して下さい。（※ダブルクリック推奨）</p>
        <FormControl fullWidth>
        <InputLabel id="multiple-chip-label">技術カテゴリ</InputLabel>
        <Select
          labelId="multiple-chip-label" id="multiple-chip"
          multiple variant='standard' value={initialCache.labels}
          onChange={handleChange}
          renderValue={(selected) => (
            <Box>
              {selected.map((value) => (
                <Chip 
                  key={value} label={value} 
                  onDelete={() => { chipDelete(value) }}
                  onMouseDown={(event) => {event.stopPropagation()}}
                />
              ))}
            </Box>
          )}
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
        >
          {labelList.map((name) => (
            <MenuItem
              key={name}
              value={name}
              style={getStyles(name, labelList, theme)}
            >
              {name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
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

export default InputSite