import { useState } from 'react'
import { useStateMachine } from 'little-state-machine'
import { Chrono} from 'react-chrono'
import { Button, Grid } from '@material-ui/core'
//
import { updateContent } from '../cache'
// styles
import classes from './App.module.scss' 

const Confirm = (props) => {
  const { state: { initialCache }, actions } = useStateMachine({ updateContent })
  const [ site ] = useState(initialCache.site)
  const [ kind ] = useState(initialCache.kind)
  const [ labels ] = useState(initialCache.labels)
  const [ comments ] = useState(initialCache.comments)
  //
  const timelines = [
    {
      title: "2022.1.10",
      cardTitle: "Dunkirk",
      cardDetailedText: "Men of the British Expeditionary Force (BEF) wade out to..",
    },
    {
      title: "May 1940",
      cardTitle: "Dunkirk",
      url: "http://www.history.com",
      cardSubtitle:"Men of the British Expeditionary Force (BEF) wade out to..",
      cardDetailedText: "Men of the British Expeditionary Force (BEF) wade out to..",
    }
  ]
  //
  const handleSubmit = (action) => {
    if (action === 'back'){
      props.handleBack()
    } else if (action === 'next'){
      actions.updateContent(
        { site: '',
          kind: '',
          labels: [],
          comments: ''
        }
      )
      props.handleNext()
    }
  }

  return (
    <>
      <form onSubmit={(event)=>handleSubmit(event)} action='?'>
        <p>下記の内容でお待ちがいないですか？</p>
        <p>同カテゴリでは下記の内容が既に登録されています。似たような記事がある場合は、過去投稿にまとめて情報を整理しましょう！</p>
        <Chrono items={timelines} />
        <p>サイトカテゴリ/サイト名：{kind}{site}</p>
        <p>技術カテゴリ：{labels}</p>
        <p>コメント：</p>
        {comments}
        <div className={classes.blank}></div>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Button type='submit' variant="outlined" onClick={()=>handleSubmit('back')} fullWidth>
              戻る
            </Button>
          </Grid>
          <Grid item xs={6}>
            <Button type='submit' variant="contained" color='primary' onClick={()=>handleSubmit('next')} fullWidth>
              送信
            </Button>
          </Grid>
        </Grid>
      </form>
    </>
  )
}

export default Confirm