/**
 * app.js
 *
 * This is the entry file for the application, only setup and boilerplate
 * code.
 */

// Needed for redux-saga es6 generator support
import 'babel-polyfill';

// Import all the third party stuff
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import createHistory from 'history/createBrowserHistory';
import 'sanitize.css/sanitize.css';

// Import root app
import App from 'containers/App';

// Import Language Provider
// import LanguageProvider from 'containers/LanguageProvider';

// Load the favicon, the manifest.json file and the .htaccess file
/* eslint-disable import/no-unresolved, import/extensions */
import '!file-loader?name=[name].[ext]!./images/favicon.ico';
import '!file-loader?name=[name].[ext]!./images/android-chrome-36x36.png';
import '!file-loader?name=[name].[ext]!./images/android-chrome-48x48.png';
import '!file-loader?name=[name].[ext]!./images/android-chrome-72x72.png';
import '!file-loader?name=[name].[ext]!./images/android-chrome-96x96.png';
import '!file-loader?name=[name].[ext]!./images/android-chrome-144x144.png';
import '!file-loader?name=[name].[ext]!./images/android-chrome-192x192.png';
import '!file-loader?name=[name].[ext]!./images/android-chrome-256x256.png';
import '!file-loader?name=[name].[ext]!./images/android-chrome-384x384.png';
import '!file-loader?name=[name].[ext]!./images/android-chrome-512x512.png';
import '!file-loader?name=[name].[ext]!./manifest.json';
import 'file-loader?name=[name].[ext]!./.htaccess';

import '!file-loader?name=[name].[ext]!./images/apple-touch-icon-57x57.png';
import '!file-loader?name=[name].[ext]!./images/apple-touch-icon-60x60.png';
import '!file-loader?name=[name].[ext]!./images/apple-touch-icon-72x72.png';
import '!file-loader?name=[name].[ext]!./images/apple-touch-icon-76x76.png';
import '!file-loader?name=[name].[ext]!./images/apple-touch-icon-114x114.png';
import '!file-loader?name=[name].[ext]!./images/apple-touch-icon-120x120.png';
import '!file-loader?name=[name].[ext]!./images/apple-touch-icon-144x144.png';
import '!file-loader?name=[name].[ext]!./images/apple-touch-icon-152x152.png';
import '!file-loader?name=[name].[ext]!./images/apple-touch-icon-180x180.png';
import '!file-loader?name=[name].[ext]!./images/favicon-32x32.png';
import '!file-loader?name=[name].[ext]!./images/favicon-16x16.png';
import '!file-loader?name=[name].[ext]!./images/safari-pinned-tab.svg';
import '!file-loader?name=[name].[ext]!./images/mstile-144x144.png';
/* eslint-enable import/no-unresolved, import/extensions */

import configureStore from './store';

// Will be added in the future
// Import i18n messages
// import { translationMessages } from './i18n';

// Import CSS reset and Global Styles
import './global-styles';

// Create redux store with history
const initialState = {};
const history = createHistory();
const store = configureStore(initialState, history);
const MOUNT_NODE = document.getElementById('app');

const render = (messages) => { // eslint-disable-line
  ReactDOM.render(
    <Provider store={store}>
      {/* <LanguageProvider messages={messages}> */}
      <ConnectedRouter history={history}>
        <App />
      </ConnectedRouter>
      {/* </LanguageProvider> */}
    </Provider>,
    MOUNT_NODE
  );
};

if (module.hot) {
  // Hot reloadable React components and translation json files
  // modules.hot.accept does not accept dynamic dependencies,
  // have to be constants at compile-time
  /* module.hot.accept(['./i18n', 'containers/App'], () => {
    ReactDOM.unmountComponentAtNode(MOUNT_NODE);
    render(translationMessages);
  }); */
  module.hot.accept(['containers/App'], () => {
    ReactDOM.unmountComponentAtNode(MOUNT_NODE);
    render();
  });
}

// Chunked polyfill for browsers without Intl support
/*
if (!window.Intl) {
  (new Promise((resolve) => {
    resolve(import('intl'));
  }))
    .then(() => Promise.all([
      import('intl/locale-data/jsonp/en.js'),
    ]))
    .then(() => render(translationMessages))
    .catch((err) => {
      throw err;
    });
} else {
  render(translationMessages);
} */
render();

// Install ServiceWorker and AppCache in the end since
// it's not most important operation and if main code fails,
// we do not want it installed
if (process.env.NODE_ENV === 'production') {
  require('offline-plugin/runtime').install(); // eslint-disable-line global-require
}