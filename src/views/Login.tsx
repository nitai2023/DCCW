import React from 'react';
import { Button } from '@mui/material';
import { HashRouter as Router, Link } from 'react-router-dom';

function Login() {
  return (
    <Router>
      <div>
        <Link to="/">
          <Button variant="contained">主页</Button>
        </Link>
      </div>
    </Router>
  );
}

export default Login;
