import React from 'react';
import ReactDOM from 'react-dom';

import './index.css';
import Root from './components/root/root.component';

import registerServiceWorker from './registerServiceWorker';


ReactDOM.render(
    <Root />,
    document.getElementById('root')
);
registerServiceWorker();
