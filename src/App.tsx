import './App.css';
import 'antd/dist/antd.css';

import { useEffect, useState } from 'react';

import { AppStore } from './utils/store';
import { Container } from './components/Container';
import { MyRoutes } from './Routes';
import { Provider } from 'react-redux';
import { ROUTES } from './constants/routes';
import { useLocation } from 'react-router-dom';

function App() {
  const [title, setTitle] = useState<string>();
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === ROUTES.table) {
      setTitle('All users');
    } else {
      setTitle('User Page');
    }
  }, [location]);
  
  return (
    <>
      <header className='appHeader'>
        <Container>
          <h1>{title}</h1>
        </Container>
      </header>
      <Container>
        <Provider store={AppStore}>
          <MyRoutes />
        </Provider>
      </Container>
    </>
  );
}

export default App;
