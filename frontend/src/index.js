import ReactDOM from 'react-dom'
import { StateMachineProvider, createStore } from 'little-state-machine';
//
import { initialState } from './cache';
import App from './components/App'
import './index.module.scss'
//
createStore({...initialState})

const Index = () => {
  return (
    <StateMachineProvider>
      <App />
    </StateMachineProvider>
  )
}

ReactDOM.render(
  <Index />,
  document.getElementById('root')
);