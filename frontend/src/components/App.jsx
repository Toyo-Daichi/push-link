// components
import Input from './Input'
// style
import classes from './App.module.scss'
// icons
import BorderColorIcon from '@mui/icons-material/BorderColor';
import GitHubIcon from '@mui/icons-material/GitHub';

export default () => {

  return (
    <div className='App'>
      <header>
        <BorderColorIcon />
        <h2>技術伝授App</h2>
      </header>
      <hr />
      <div className={classes.container}>
        <Input />
      </div>
      <hr />
      <footer>
        ©2022
        <GitHubIcon />
      </footer>
    </div>
  );
}