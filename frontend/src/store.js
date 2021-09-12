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
} from './Reducers/tweetReducer.js'

const reducer = combineReducers({
	userLoginInfo: userLoginInfoReducer,
	userRegister: userRegisterReducer,
	userLogin: userLoginReducer,
	userTweets: userTweetsReducer,
	userUpdate: userUpdateReducer,
	userSearch: userSearchReducer,
	userById: userByIdReducer,
	userFollow: userFollowReducer,
	userUnfollow: userUnfollowReducer,
	tweetCreate: tweetCreateReducer,
	tweetFollowing: tweetFollowingReducer,
	tweetLike: tweetLikeReducer,
	tweetUnlike: tweetUnlikeReducer,
	tweetRetweet: tweetRetweetReducer,
	tweetUnretweet: tweetUnretweetReducer,
	tweetLiked: tweetLikedReducer,
	tweetRetweeted: tweetRetweetedReducer,
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
