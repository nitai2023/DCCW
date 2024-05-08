import React from 'react';

import HelloReact from '@/components/HelloReact';

class Home extends React.Component {
  constructor(props) {
    super(props);
  }

  render(): JSX.Element {
    return <HelloReact></HelloReact>;
  }
}

export default Home;
