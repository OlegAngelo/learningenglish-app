import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from './redux/store';
import reportWebVitals from './reportWebVitals';
import './assets/tailwind.output.css';

// Add dependencies here
import { Helmet, HelmetProvider } from 'react-helmet-async'
import { BrowserRouter as Router } from 'react-router-dom';
import Routes from './routes';
import AudioRecorder from 'audio-recorder-polyfill';
window.MediaRecorder = AudioRecorder;

ReactDOM.render(
  <Provider store={store}>
    <HelmetProvider>
      <React.StrictMode>
        <Helmet>
          <title>{process.env.REACT_APP_NAME}</title>
        </Helmet>

        <Router>
          <Routes />
        </Router>
      </React.StrictMode>
    </HelmetProvider>
  </Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
