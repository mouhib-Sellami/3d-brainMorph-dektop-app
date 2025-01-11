import { HashRouter as Router } from "react-router-dom";
import AppRoutes from './routes'
import './sass/app.scss';

function App(): JSX.Element {

  return (
    <Router>
      <AppRoutes />
    </Router >

  )
}

export default App
