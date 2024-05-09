import React from 'react';
import { HashRouter as Router, Switch, Link } from 'react-router-dom';
import { renderRoutes } from 'react-router-config';
import routes from '@/router';
import Loading from '@/components/Loading';
import styles from './App.module.scss';
import Home from './views/Home';
function App() {
  return (
    <Router>
      <div className={styles.container}>
        {/* <Home></Home> */}
        <Switch>
          <React.Suspense fallback={<Loading></Loading>}>
            {renderRoutes(routes)}
          </React.Suspense>
        </Switch>
      </div>
    </Router>
  );
}
export default App;
