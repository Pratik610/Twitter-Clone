import axios from 'axios'
import {
	USER_CREATE_FAIL,
	USER_CREATE_REQUEST,
	USER_CREATE_SUCCESS,
	USER_LOGIN_FAIL,
	USER_LOGIN_REQUEST,
	USER_LOGIN_SUCCESS,
	USER_LOGOUT,
	USER_UPDATE_FAIL,
	USER_UPDATE_REQUEST,
	USER_UPDATE_SUCCESS,
	SEARCH_USER_FAIL,
	SEARCH_USER_REQUEST,
	SEARCH_USER_SUCCESS,
	USER_BY_ID_FAIL,
	USER_BY_ID_REQUEST,
	USER_BY_ID_SUCCESS,
	USER_FOLLOW_REQUEST,
	USER_FOLLOW_SUCCESS,
	USER_FOLLOW_FAIL,
	USER_INFO_FAIL,
	USER_INFO_REQUEST,
	USER_INFO_SUCCESS,
	USER_UNFOLLOW_FAIL,
	USER_UNFOLLOW_REQUEST,
	USER_UNFOLLOW_SUCCESS,
} from '../Constants/userConstants.js'

export const registerUser =
	(name, email, password, DOB) => async (dispatch) => {
		try {
			dispatch({
				type: USER_CREATE_REQUEST,
			})
			const config = {
				headers: {
					'Content-Type': 'application/json',
				},
			}

			const { data } = await axios.post(
				'/api/users/signup',
				{ name, email, password, DOB, atTheRate: `@${name}` },
				config
			)
			data &&
				dispatch({
					type: USER_CREATE_SUCCESS,
					payload: data,
				})
		} catch (error) {
			dispatch({
				type: USER_CREATE_FAIL,
				payload:
					error.response && error.response.data.message
						? error.response.data.message
						: error.message,
			})
		}
	}

export const loginUser = (email, password) => async (dispatch) => {
	try {
		dispatch({
			type: USER_LOGIN_REQUEST,
		})
		const config = {
			headers: {
				'Content-Type': 'application/json',
			},
		}
		const { data } = await axios.post(
			'/api/users/login',
			{ email, password },
			config
		)

		data &&
			dispatch({
				type: USER_LOGIN_SUCCESS,
				payload: data,
			})

		localStorage.setItem('userId', JSON.stringify(data))
	} catch (error) {
		dispatch({
			type: USER_LOGIN_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		})
	}
}

export const getLoginUserInfo = (id) => async (dispatch) => {
	try {
		dispatch({
			type: USER_INFO_REQUEST,
		})
		const config = {
			headers: {
				'Content-Type': 'application/json',
			},
		}
		const { data } = await axios.post('/api/users/info', { id }, config)

		data &&
			dispatch({
				type: USER_INFO_SUCCESS,
				payload: data,
			})
	} catch (error) {
		dispatch({
			type: USER_INFO_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		})
	}
}

export const logoutUser = () => async (dispatch) => {
	localStorage.removeItem('userInfo')
	dispatch({
		type: USER_LOGOUT,
	})
}

export const updateUser =
	(name, bio, website) => async (dispatch, getState) => {
		try {
			dispatch({
				type: USER_UPDATE_REQUEST,
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
			const { data } = await axios.put(
				'/api/users/edit',
				{ name, bio, website },
				config
			)

			data &&
				dispatch({
					type: USER_UPDATE_SUCCESS,
					payload: data,
				})
			dispatch({
				type: USER_LOGIN_SUCCESS,
				payload: data,
			})

			localStorage.setItem('userInfo', JSON.stringify(data))
		} catch (error) {
			dispatch({
				type: USER_UPDATE_FAIL,
				payload:
					error.response && error.response.data.message
						? error.response.data.message
						: error.message,
			})
		}
	}

export const searchUser = (query) => async (dispatch) => {
	try {
		dispatch({
			type: SEARCH_USER_REQUEST,
		})
		const config = {
			headers: {
				'Content-Type': 'application/json',
			},
		}

		const { data } = await axios.post('/api/users/', { query }, config)

		dispatch({
			type: SEARCH_USER_SUCCESS,
			payload: data,
		})
	} catch (error) {
		dispatch({
			type: SEARCH_USER_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		})
	}
}

export const getUserById = (id) => async (dispatch) => {
	try {
		dispatch({
			type: USER_BY_ID_REQUEST,
		})

		const { data } = await axios.get(`/api/users/${id}`)

		dispatch({
			type: USER_BY_ID_SUCCESS,
			payload: data,
		})
	} catch (error) {
		dispatch({
			type: USER_BY_ID_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		})
	}
}

export const followUser = (id) => async (dispatch, getState) => {
	try {
		dispatch({
			type: USER_FOLLOW_REQUEST,
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

		await axios.post('/api/users/follow', { id }, config)

		dispatch({
			type: USER_FOLLOW_SUCCESS,
		})
	} catch (error) {
		dispatch({
			type: USER_FOLLOW_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		})
	}
}

export const unfollowUser = (id) => async (dispatch, getState) => {
	try {
		dispatch({
			type: USER_UNFOLLOW_REQUEST,
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

		await axios.post('/api/users/unfollow', { id }, config)

		dispatch({
			type: USER_UNFOLLOW_SUCCESS,
		})
	} catch (error) {
		dispatch({
			type: USER_UNFOLLOW_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		})
	}
}
