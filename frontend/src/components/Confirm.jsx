import axios from 'axios'
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
      title: "AWS Python",
      cardTitle: "https://localhost:3000",
      cardDetailedText: "Men of the British Expeditionary Force (BEF) wade out to..",
    },
    {
      title: "AWS Python",
      cardTitle: "https://localhost:3000",
      cardDetailedText: "Men of the British Expeditionary Force (BEF) wade out to..",
    }
  ]
  //
  const dataSubmit = async(event) => {
    event.preventDefault()
    console.log('1')
    const apiPath = 'https://niw1ev59c2.execute-api.ap-northeast-1.amazonaws.com/api/resource/add'
    const postData = {site,kind,labels,comments}
    const response = await axios.post(apiPath, postData)
    console.log(response)
  }
  //
  const handleSubmit = (action) => {
    if (action === 'back'){
      props.handleBack()
    } else if (action === 'next'){
      dataSubmit()
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
        <p>同カテゴリでは下記の内容が既に登録されています。<br />⇒似たような記事がある場合は、過去投稿にまとめて情報を整理しましょう！</p>
        <p>カテゴリ/サイト名：
          <ul>
            <li>{kind}</li><li>{site}</li>
          </ul>
        </p>
        <p>技術カテゴリ：<ul>{labels.map(
            (label) => {
              return (
                <li>{label}</li>
              )
            })}</ul>
        </p>
        <p>コメント：</p>
        <div className={classes.comments}>
          {comments}
        </div>
        <div className={classes.blank}></div>
        <div className={classes.timelineCategory}>
        <Chrono items={timelines}
          mode="VERTICAL"
          hideControls
          slideItemDuration={4000}
          cardHeight={150}
          scrollable={{ scrollbar: true }} />
        </div>
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