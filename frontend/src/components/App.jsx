import { Grid } from '@material-ui/core'
//
import Content from './Content'
//
import classes from './App.module.scss'
import BorderColorIcon from '@mui/icons-material/BorderColor';

const App = () => {

  return (
    <div className='App'>
      <header>
        <Grid container spacing={1}>
          <Grid item xs={1.5}>
            <BorderColorIcon sx={{fontSize:30}}/>
          </Grid>
          <Grid item xs={10.5}>
            <h2>技術伝授App</h2>
          </Grid>
        </Grid>
      </header>
      <div className={classes.container}>
        <Content />
      </div>
      <footer>
        ©2022
      </footer>
    </div>
  );
}

export default App