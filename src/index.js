import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import BlockExplorer from './BlockExplorer'
import BlockExplorer3 from './BlockExplorer3';
import LatestBlocks from './LatestBlocks';
import './BlockExplorer.css';
import reportWebVitals from './reportWebVitals';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
    <BlockExplorer/>
    <BlockExplorer3/>
    <LatestBlocks/>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
