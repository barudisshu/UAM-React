/** @format */

import React from 'react';
import ReactDOM from 'react-dom';
import Routes from './components/Routers';
import {hot} from 'react-hot-loader/root';
import './index.scss';

const Root: React.FC = () => {
  return <Routes />;
};

export default hot(Root);

ReactDOM.render(<Root />, document.getElementById('root'));
