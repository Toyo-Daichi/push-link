import ReactDOM from 'react-dom'
import { StateMachineProvider, createStore } from 'little-state-machine'
//
import Amplify from 'aws-amplify'
import { AmplifyProvider } from '@aws-amplify/ui-react'
import config from './aws-exports'
//
import { initialState } from './cache';
import App from './components/App'
import './index.module.scss'
//
Amplify.configure(config)
createStore({...initialState})

const Index = () => {
  return (
    <StateMachineProvider>
      <AmplifyProvider>
        <App />
      </AmplifyProvider>
    </StateMachineProvider>
  )
}

ReactDOM.render(
  <Index />,
  document.getElementById('root')
);