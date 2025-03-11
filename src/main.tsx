import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { BrowserRouter as Router } from 'react-router-dom';
import { init } from './init.ts';

const root = ReactDOM.createRoot(document.getElementById('root')!);

try {
  init();

  root.render(
    <Router>
      <App />
    </Router>
  );
} catch (e) {
  console.error(e);
}
