
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  //Commenting Strict Mode for proper working of drag and drop functionality
  //<React.StrictMode>
    <App />
  //</React.StrictMode>,
)
