import { Button } from '@material-ui/core'
// styles
import classes from './App.module.scss' 

const End = (props) => {
  const handleSubmit = () => {
    props.handleReset()
  }

  return (
    <>
      <form onSubmit={(event)=>handleSubmit(event)}>
        <p>技術提供、ありがとうございました！</p>
        <div className={classes.blank}></div>
        <Button type='submit' variant="outlined" onClick={()=>handleSubmit()} fullWidth>
        ホームに戻る
        </Button>
      </form>
    </>
  )
}

export default End