import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import Sidebar from './Components/Sidebar';
import Login from './Components/AccountManagement/Login';
import { UserProvider } from './Components/Context/UserContext';

function App() {
	return (
		<div className="App">
			<Router>
				<UserProvider>
					<div className="general-flex">

						<Sidebar />
						<div className='main-content'>
							<Switch>

								<Route path="/login">
									<Login />
								</Route>
							</Switch>
						</div>
					</div>
				</UserProvider>
			</Router>
		</div>
	);
}

export default App;
