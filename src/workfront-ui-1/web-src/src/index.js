import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import ExtensionRegistration from './components/ExtensionRegistration';

const hash = window.location.hash || '';
const isAppView = hash.includes('app');

ReactDOM.render(
  isAppView ? <App /> : <ExtensionRegistration />,
  document.getElementById('root')
);