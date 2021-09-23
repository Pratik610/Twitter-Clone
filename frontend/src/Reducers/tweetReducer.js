import {
	TWEET_CREATE_FAIL,
	TWEET_CREATE_REQUEST,
	TWEET_CREATE_SUCCESS,
	TWEET_CREATE_RESET,
	USER_TWEETS_FAIL,
	USER_TWEETS_REQUEST,
	USER_TWEETS_SUCCESS,
	FOLLOWING_TWEETS_FAIL,
	FOLLOWING_TWEETS_REQUEST,
	FOLLOWING_TWEETS_SUCCESS,
	TWEET_LIKE_FAIL,
	TWEET_LIKE_REQUEST,
	TWEET_LIKE_SUCCESS,
	TWEET_UNLIKE_REQUEST,
	TWEET_UNLIKE_FAIL,
	TWEET_UNLIKE_SUCCESS,
	TWEET_RETWEET_FAIL,
	TWEET_RETWEET_REQUEST,
	TWEET_RETWEET_SUCCESS,
	TWEET_UNRETWEET_FAIL,
	TWEET_UNRETWEET_REQUEST,
	TWEET_UNRETWEET_SUCCESS,
	LIKED_TWEETS_FAIL,
	LIKED_TWEETS_REQUEST,
	LIKED_TWEETS_SUCCESS,
	RETWEETED_TWEETS_REQUEST,
	RETWEETED_TWEETS_SUCCESS,
	RETWEETED_TWEETS_FAIL,
	GET_TWEET_BY_ID_FAIL,
	GET_TWEET_BY_ID_REQUEST,
	GET_TWEET_BY_ID_SUCCESS,
	GET_REPLIED_REQUEST,
	GET_REPLIED_SUCCESS,
	GET_REPLIED_FAIL,
	TWEET_BOOKMARK_REQUEST,
	TWEET_BOOKMARK_SUCCESS,
	TWEET_BOOKMARK_FAIL,
	TWEET_UNBOOKMARK_REQUEST,
	TWEET_UNBOOKMARK_SUCCESS,
	TWEET_UNBOOKMARK_FAIL,
	GET_BOOKMARKED_REQUEST,
	GET_BOOKMARKED_SUCCESS,
	GET_BOOKMARKED_FAIL,
} from '../Constants/tweetConstants.js'

export const tweetCreateReducer = (state = {}, action) => {
	switch (action.type) {
		case TWEET_CREATE_REQUEST:
			return { loading: true }
		case TWEET_CREATE_SUCCESS:
			return { loading: false, tweet: true }
		case TWEET_CREATE_FAIL:
			return { loading: false, error: action.payload }
		case TWEET_CREATE_RESET:
			return {}
		default:
			return state
	}
}

export const userTweetsReducer = (state = {}, action) => {
	switch (action.type) {
		case USER_TWEETS_REQUEST:
			return { loading: true }
		case USER_TWEETS_SUCCESS:
			return { loading: false, tweets: action.payload }
		case USER_TWEETS_FAIL:
			return { loading: false, error: action.payload }

		default:
			return state
	}
}

export const tweetFollowingReducer = (state = {}, action) => {
	switch (action.type) {
		case FOLLOWING_TWEETS_REQUEST:
			return { loading: true }
		case FOLLOWING_TWEETS_SUCCESS:
			return { loading: false, followingTweet: action.payload }
		case FOLLOWING_TWEETS_FAIL:
			return { loading: false, error: action.payload }
		default:
			return state
	}
}

export const tweetLikeReducer = (state = {}, action) => {
	switch (action.type) {
		case TWEET_LIKE_REQUEST:
			return { loading: true }
		case TWEET_LIKE_SUCCESS:
			return { loading: false, liked: true }
		case TWEET_LIKE_FAIL:
			return { loading: false, error: action.payload }
		default:
			return state
	}
}

export const tweetUnlikeReducer = (state = {}, action) => {
	switch (action.type) {
		case TWEET_UNLIKE_REQUEST:
			return { loading: true }
		case TWEET_UNLIKE_SUCCESS:
			return { loading: false, unliked: true }
		case TWEET_UNLIKE_FAIL:
			return { loading: false, error: action.payload }
		default:
			return state
	}
}

export const tweetRetweetReducer = (state = {}, action) => {
	switch (action.type) {
		case TWEET_RETWEET_REQUEST:
			return { loading: true }
		case TWEET_RETWEET_SUCCESS:
			return { loading: false, retweet: true }
		case TWEET_RETWEET_FAIL:
			return { loading: false, error: action.payload }
		default:
			return state
	}
}

export const tweetUnretweetReducer = (state = {}, action) => {
	switch (action.type) {
		case TWEET_UNRETWEET_REQUEST:
			return { loading: true }
		case TWEET_UNRETWEET_SUCCESS:
			return { loading: false, unretweet: true }
		case TWEET_UNRETWEET_FAIL:
			return { loading: false, error: action.payload }
		default:
			return state
	}
}

export const tweetLikedReducer = (state = {}, action) => {
	switch (action.type) {
		case LIKED_TWEETS_REQUEST:
			return { loading: true }
		case LIKED_TWEETS_SUCCESS:
			return { loading: false, likedTweets: action.payload }
		case LIKED_TWEETS_FAIL:
			return { loading: false, error: action.payload }
		default:
			return state
	}
}

export const tweetRetweetedReducer = (state = {}, action) => {
	switch (action.type) {
		case RETWEETED_TWEETS_REQUEST:
			return { loading: true }
		case RETWEETED_TWEETS_SUCCESS:
			return { loading: false, retweetedTweets: action.payload }
		case RETWEETED_TWEETS_FAIL:
			return { loading: false, error: action.payload }
		default:
			return state
	}
}

export const tweetByIdReducer = (state = {}, action) => {
	switch (action.type) {
		case GET_TWEET_BY_ID_REQUEST:
			return { loading: true }
		case GET_TWEET_BY_ID_SUCCESS:
			return { loading: false, tweetData: action.payload }
		case GET_TWEET_BY_ID_FAIL:
			return { loading: false, error: action.payload }
		default:
			return state
	}
}

export const repliedTweetsReducer = (state = {}, action) => {
	switch (action.type) {
		case GET_REPLIED_REQUEST:
			return { loading: true }
		case GET_REPLIED_SUCCESS:
			return { loading: false, repliedTweets: action.payload }
		case GET_REPLIED_FAIL:
			return { loading: false, error: action.payload }
		default:
			return state
	}
}

export const bookmarkTweetReducer = (state = {}, action) => {
	switch (action.type) {
		case TWEET_BOOKMARK_REQUEST:
			return { loading: true }
		case TWEET_BOOKMARK_SUCCESS:
			return { loading: false, bookmarkedTweet: true }
		case TWEET_BOOKMARK_FAIL:
			return { loading: false, error: action.payload }
		default:
			return state
	}
}

export const unbookmarkTweetReducer = (state = {}, action) => {
	switch (action.type) {
		case TWEET_UNBOOKMARK_REQUEST:
			return { loading: true }
		case TWEET_UNBOOKMARK_SUCCESS:
			return { loading: false, unbookmarkedTweet: true }
		case TWEET_UNBOOKMARK_FAIL:
			return { loading: false, error: action.payload }
		default:
			return state
	}
}

export const bookmarkedTweetsReducer = (state = {}, action) => {
	switch (action.type) {
		case GET_BOOKMARKED_REQUEST:
			return { loading: true }
		case GET_BOOKMARKED_SUCCESS:
			return { loading: false, bookmarkedTweets: action.payload }
		case GET_BOOKMARKED_FAIL:
			return { loading: false, error: action.payload }
		default:
			return state
	}
}
