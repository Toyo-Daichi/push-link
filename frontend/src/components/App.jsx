import { useState, useEffect } from 'react' 
import { AmplifyAuthenticator, AmplifySignIn, AmplifySignOut, AmplifySignUp } from '@aws-amplify/ui-react'
import { AuthState, onAuthUIStateChange } from '@aws-amplify/ui-components' 
import { Grid } from '@material-ui/core'
//
import Content from './Content'
//
import classes from './App.module.scss'
import BorderColorIcon from '@mui/icons-material/BorderColor';

const App = () => {
  const [ authState, setAuthState ] = useState()
  const [ user, setUser ] = useState()

  useEffect(()=>{
      return onAuthUIStateChange((nextAuthState, authData)=>{
        setAuthState(nextAuthState)
        setUser(authData)
      })
    },
  [])

  return authState === AuthState.SignedIn && user ? (
    <div className='App'>
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
      </div>
      <div className={classes.footer}>
        ©2022
      </div>
      <AmplifySignOut />
    </div>
  ) : (
    <AmplifyAuthenticator>
      <AmplifySignIn 
        headerText='技術伝授APP' slot='sign-in' 
      />
      <AmplifySignUp 
        slot = 'sign-up'
        formFields = {[
          { type: 'username' },
          { type: 'password' },
          { type: 'email' }
        ]}
      />
    </AmplifyAuthenticator>
  )
}

export default App