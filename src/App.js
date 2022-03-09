import './App.css';
import { Provider } from 'react-redux';
import { store } from './rewards/store';
import { RewardsContainer } from './rewards/RewardsContainer';


function App() {
  return (
    <Provider store={store}>
      <RewardsContainer />
    </Provider>
  );
}

export default App;
