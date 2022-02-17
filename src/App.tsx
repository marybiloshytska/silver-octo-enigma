import './App.css';
import 'antd/dist/antd.css';

import { AppStore } from './utils/store';
import { MyRoutes } from './Routes';
import { Provider } from 'react-redux';

function App() {
  return (
    <div className="App">
      <Provider store={AppStore}>
        <MyRoutes />
      </Provider>
    </div>
  );
}

export default App;
