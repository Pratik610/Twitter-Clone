import axios from 'axios'
import {
	TWEET_CREATE_FAIL,
	TWEET_CREATE_REQUEST,
	TWEET_CREATE_SUCCESS,
	USER_TWEETS_FAIL,
	USER_TWEETS_REQUEST,
	USER_TWEETS_SUCCESS,
	FOLLOWING_TWEETS_FAIL,
	FOLLOWING_TWEETS_REQUEST,
	FOLLOWING_TWEETS_SUCCESS,
	TWEET_LIKE_REQUEST,
	TWEET_LIKE_SUCCESS,
	TWEET_LIKE_FAIL,
	TWEET_UNLIKE_FAIL,
	TWEET_UNLIKE_REQUEST,
	TWEET_UNLIKE_SUCCESS,
	TWEET_RETWEET_REQUEST,
	TWEET_RETWEET_FAIL,
	TWEET_RETWEET_SUCCESS,
	TWEET_UNRETWEET_FAIL,
	TWEET_UNRETWEET_REQUEST,
	TWEET_UNRETWEET_SUCCESS,
	LIKED_TWEETS_FAIL,
	LIKED_TWEETS_REQUEST,
	LIKED_TWEETS_SUCCESS,
	RETWEETED_TWEETS_FAIL,
	RETWEETED_TWEETS_REQUEST,
	RETWEETED_TWEETS_SUCCESS,
} from '../Constants/tweetConstants.js'

export const tweetCreate = (tweetInfo) => async (dispatch, getState) => {
	try {
		dispatch({
			type: TWEET_CREATE_REQUEST,
		})
		const {
			userLogin: { userId },
		} = getState()

		const config = {
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${userId.token}`,
			},
		}
		await axios.post('/api/tweet', tweetInfo, config)

		dispatch({
			type: TWEET_CREATE_SUCCESS,
		})
	} catch (error) {
		dispatch({
			type: TWEET_CREATE_FAIL,
			payload: error,
		})
	}
}

export const tweetsOfUser = (_id) => async (dispatch) => {
	try {
		dispatch({
			type: USER_TWEETS_REQUEST,
		})

		const { data } = await axios.get(`/api/tweet/usertweets/${_id}`)
		data &&
			dispatch({
				type: USER_TWEETS_SUCCESS,
				payload: data,
			})
	} catch (error) {
		dispatch({
			type: USER_TWEETS_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		})
	}
}

export const followingTweets = (_id) => async (dispatch, getState) => {
	try {
		dispatch({
			type: FOLLOWING_TWEETS_REQUEST,
		})
		const {
			userLogin: { userId },
		} = getState()

		const config = {
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${userId.token}`,
			},
		}

		const { data } = await axios.get(`/api/tweet`, config)
		data &&
			dispatch({
				type: FOLLOWING_TWEETS_SUCCESS,
				payload: data,
			})
	} catch (error) {
		dispatch({
			type: FOLLOWING_TWEETS_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		})
	}
}

export const likeTweet = (id) => async (dispatch, getState) => {
	try {
		dispatch({
			type: TWEET_LIKE_REQUEST,
		})
		const {
			userLogin: { userId },
		} = getState()

		const config = {
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${userId.token}`,
			},
		}

		await axios.post('/api/tweet/like', { id: id }, config)

		dispatch({
			type: TWEET_LIKE_SUCCESS,
		})
	} catch (error) {
		dispatch({
			type: TWEET_LIKE_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		})
	}
}

export const unlikeTweet = (id) => async (dispatch, getState) => {
	try {
		dispatch({
			type: TWEET_UNLIKE_REQUEST,
		})
		const {
			userLogin: { userId },
		} = getState()

		const config = {
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${userId.token}`,
			},
		}

		await axios.post('/api/tweet/unlike', { id: id }, config)

		dispatch({
			type: TWEET_UNLIKE_SUCCESS,
		})
	} catch (error) {
		dispatch({
			type: TWEET_UNLIKE_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		})
	}
}

export const retweet = (id) => async (dispatch, getState) => {
	try {
		dispatch({
			type: TWEET_RETWEET_REQUEST,
		})
		const {
			userLogin: { userId },
		} = getState()

		const config = {
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${userId.token}`,
			},
		}

		await axios.post('/api/tweet/retweet', { id: id }, config)

		dispatch({
			type: TWEET_RETWEET_SUCCESS,
		})
	} catch (error) {
		dispatch({
			type: TWEET_RETWEET_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		})
	}
}

export const unretweet = (id) => async (dispatch, getState) => {
	try {
		dispatch({
			type: TWEET_UNRETWEET_REQUEST,
		})
		const {
			userLogin: { userId },
		} = getState()

		const config = {
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${userId.token}`,
			},
		}

		await axios.post('/api/tweet/unretweet', { id: id }, config)

		dispatch({
			type: TWEET_UNRETWEET_SUCCESS,
		})
	} catch (error) {
		dispatch({
			type: TWEET_UNRETWEET_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		})
	}
}

export const getLikedTweets = () => async (dispatch, getState) => {
	try {
		dispatch({
			type: LIKED_TWEETS_REQUEST,
		})
		const {
			userLogin: { userId },
		} = getState()

		const config = {
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${userId.token}`,
			},
		}

		const { data } = await axios.get('/api/tweet/liked', config)

		dispatch({
			type: LIKED_TWEETS_SUCCESS,
			payload: data,
		})
	} catch (error) {
		dispatch({
			type: LIKED_TWEETS_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		})
	}
}

export const getRetweetedTweets = () => async (dispatch, getState) => {
	try {
		dispatch({
			type: RETWEETED_TWEETS_REQUEST,
		})
		const {
			userLogin: { userId },
		} = getState()

		const config = {
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${userId.token}`,
			},
		}

		const { data } = await axios.get('/api/tweet/retweeted', config)

		dispatch({
			type: RETWEETED_TWEETS_SUCCESS,
			payload: data,
		})
	} catch (error) {
		dispatch({
			type: RETWEETED_TWEETS_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		})
	}
}
