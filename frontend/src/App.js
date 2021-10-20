import { BrowserRouter as Router, Route } from 'react-router-dom'
import HomeScreen from './Screens/HomeScreen'
import ProfileScreen from './Screens/ProfileScreen'
import UserProfileScreen from './Screens/UserProfileScreen'
import EditProfileScreen from './Screens/EditProfileScreen'
import SignupScreen from './Screens/SignupScreen'
import LoginScreen from './Screens/LoginScreen'
import SearchScreen from './Screens/SearchScreen'
import TweetScreen from './Screens/TweetScreen'
import BookmarkScreen from './Screens/BookmarkScreen'
import FollowingScreen from './Screens/FollowingScreen'
import FollowersScreen from './Screens/FollowersScreen'
import ExploreScreen from './Screens/ExploreScreen'
function App() {
	return (
		<Router>
			<Route path='/' exact component={HomeScreen} />
			<Route path='/profile' component={ProfileScreen} />
			<Route path='/user/:id' component={UserProfileScreen} />
			<Route path='/tweet/:id' component={TweetScreen} />
			<Route path='/explore' component={ExploreScreen} />
			<Route path='/following' component={FollowingScreen} />
			<Route path='/followers' component={FollowersScreen} />
			<Route path='/editprofile' component={EditProfileScreen} />
			<Route path='/signup' exact component={SignupScreen} />
			<Route path='/login' exact component={LoginScreen} />
			<Route path='/search' exact component={SearchScreen} />
			<Route path='/bookmarks' exact component={BookmarkScreen} />
		</Router>
	)
}

export default App
