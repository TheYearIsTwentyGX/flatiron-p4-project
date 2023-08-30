import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import Sidebar from './Components/Sidebar';

function App() {
  return (
    <div className="App">
		<Router>
			<Sidebar />

		</Router>
    </div>
  );
}

export default App;
