import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import {
	userRegisterReducer,
	userLoginReducer,
	userUpdateReducer,
	userSearchReducer,
	userByIdReducer,
	userFollowReducer,
	userLoginInfoReducer,
	userUnfollowReducer,
	checkUsernameReducer,
	followingUsersReducer,
	followersUsersReducer,
	getUsersReducer,
} from './Reducers/userReducer.js'
import {
	tweetCreateReducer,
	userTweetsReducer,
	tweetFollowingReducer,
	tweetLikeReducer,
	tweetUnlikeReducer,
	tweetRetweetReducer,
	tweetUnretweetReducer,
	tweetLikedReducer,
	tweetRetweetedReducer,
	tweetByIdReducer,
	repliedTweetsReducer,
	bookmarkTweetReducer,
	unbookmarkTweetReducer,
	bookmarkedTweetsReducer,
} from './Reducers/tweetReducer.js'

const reducer = combineReducers({
	userLoginInfo: userLoginInfoReducer,
	userRegister: userRegisterReducer,
	userLogin: userLoginReducer,
	userTweets: userTweetsReducer,
	userUpdate: userUpdateReducer,
	userSearch: userSearchReducer,
	userById: userByIdReducer,
	getUsers: getUsersReducer,
	userFollow: userFollowReducer,
	followingUsers: followingUsersReducer,
	followersUsers: followersUsersReducer,
	checkUsername: checkUsernameReducer,
	userUnfollow: userUnfollowReducer,
	tweetCreate: tweetCreateReducer,
	tweetFollowing: tweetFollowingReducer,
	tweetLike: tweetLikeReducer,
	tweetUnlike: tweetUnlikeReducer,
	tweetRetweet: tweetRetweetReducer,
	tweetUnretweet: tweetUnretweetReducer,
	tweetLiked: tweetLikedReducer,
	tweetRetweeted: tweetRetweetedReducer,
	tweetById: tweetByIdReducer,
	repliedTweets: repliedTweetsReducer,
	bookmarkTweet: bookmarkTweetReducer,
	unbookmarkTweet: unbookmarkTweetReducer,
	bookmarkedTweets: bookmarkedTweetsReducer,
})

const userInfoFromStorage = localStorage.getItem('userId')
	? JSON.parse(localStorage.getItem('userId'))
	: null

const initialState = {
	userLogin: { userId: userInfoFromStorage },
}

const middleware = [thunk]

const store = createStore(
	reducer,
	initialState,
	composeWithDevTools(applyMiddleware(...middleware))
)
export default store
