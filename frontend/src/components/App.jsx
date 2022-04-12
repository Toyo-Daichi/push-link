import { Authenticator } from '@aws-amplify/ui-react'
import '@aws-amplify/ui-react/styles.css'
import { Grid } from '@material-ui/core'
//
import Content from './Content'
//
import classes from './App.module.scss'
import BorderColorIcon from '@mui/icons-material/BorderColor';

const App = () => {

  const formFields = {
    signIn: {
      username: {
        labelHidden: true,
        placeholder: 'username',
        isRequired: true,
        label: 'Username:'
      }
    }
  }

  return (
    <div className='App'>
      <Authenticator loginMechanisms={['username', 'email']} formFields={formFields} variation='modal'>
        {({signOut}) => (
          <>
          <div className={classes.header}>
            <Grid container spacing={1}>
              <Grid item xs={1.5}>
                <BorderColorIcon sx={{fontSize:30}}/>
              </Grid>
              <Grid item xs={10.5}>
                <h2>技術伝授App</h2>
              </Grid>
            </Grid>
          </div>
              <div className={classes.container}>
                <Content />
                <button onClick={signOut}>Sign out</button>
              </div>
          <div className={classes.footer}>
            ©2022
          </div>
          </>
        )}
      </Authenticator>
    </div>
  )
}

export default App