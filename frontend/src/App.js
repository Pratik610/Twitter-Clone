import { BrowserRouter as Router, Route } from 'react-router-dom'
import HomeScreen from './Screens/HomeScreen'
import ProfileScreen from './Screens/ProfileScreen'
import UserProfileScreen from './Screens/UserProfileScreen'
import EditProfileScreen from './Screens/EditProfileScreen'
import SignupScreen from './Screens/SignupScreen'
import LoginScreen from './Screens/LoginScreen'
import SearchScreen from './Screens/SearchScreen'
function App() {
	return (
		<Router>
			<Route path='/' exact component={HomeScreen} />
			<Route path='/profile' component={ProfileScreen} />
			<Route path='/:id' component={UserProfileScreen} />
			<Route path='/editprofile' component={EditProfileScreen} />
			<Route path='/signup' exact component={SignupScreen} />
			<Route path='/login' exact component={LoginScreen} />
			<Route path='/search' exact component={SearchScreen} />
		</Router>
	)
}

export default App
