import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import Sidebar from './Components/Sidebar';
import Login from './Components/AccountManagement/Login';
import Signup from './Components/AccountManagement/Signup';
import { UserProvider } from './Components/Context/UserContext';
import Albums from './Components/AlbumsPage/Albums';
import { ItemProvider } from './Components/Context/ItemContext';
import AlbumReviews from './Components/Reviews/AlbumReviews';
import Logout from './Components/AccountManagement/Logout';

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
								<Route path="/signup" component={Signup} />
								<Route path="/logout" component={Logout} />

								<ItemProvider>
									<Route exact path="/albums/:id" component={AlbumReviews} />
									<Route exact path="/albums" component={Albums} />
								</ItemProvider>
							</Switch>
						</div>
					</div>
				</UserProvider>
			</Router>
		</div>
	);
}

export default App;
