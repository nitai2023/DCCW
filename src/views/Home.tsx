import React from 'react';
import { Button } from '@mui/material';
import { HashRouter as Router, Link } from 'react-router-dom';
function Home() {
  return (
    <Router>
      <div>
        <Link to="/Login">
          <Button variant="contained">登录</Button>
        </Link>
      </div>
    </Router>
  );
}

export default Home;
