import {
	USER_CREATE_FAIL,
	USER_CREATE_REQUEST,
	USER_CREATE_SUCCESS,
	USER_LOGIN_REQUEST,
	USER_LOGIN_SUCCESS,
	USER_LOGIN_FAIL,
	USER_LOGOUT,
	USER_UPDATE_FAIL,
	USER_UPDATE_REQUEST,
	USER_UPDATE_SUCCESS,
	SEARCH_USER_FAIL,
	SEARCH_USER_REQUEST,
	SEARCH_USER_SUCCESS,
	SEARCH_USER_RESET,
	USER_BY_ID_FAIL,
	USER_BY_ID_REQUEST,
	USER_BY_ID_SUCCESS,
	USER_FOLLOW_REQUEST,
	USER_FOLLOW_SUCCESS,
	USER_FOLLOW_FAIL,
	USER_INFO_FAIL,
	USER_INFO_REQUEST,
	USER_UNFOLLOW_FAIL,
	USER_UNFOLLOW_REQUEST,
	USER_UNFOLLOW_SUCCESS,
	USER_INFO_SUCCESS,
	USER_UPDATE_RESET,
	CHECK_USERNAME_REQUEST,
	CHECK_USERNAME_SUCCESS,
	CHECK_USERNAME_FAIL,
	GET_FOLLOWING_REQUEST,
	GET_FOLLOWING_SUCCESS,
	GET_FOLLOWING_FAIL,
	GET_FOLLOWERS_REQUEST,
	GET_FOLLOWERS_SUCCESS,
	GET_FOLLOWERS_FAIL,
} from '../Constants/userConstants.js'

export const userRegisterReducer = (state = {}, action) => {
	switch (action.type) {
		case USER_CREATE_REQUEST:
			return { loading: true }
		case USER_CREATE_SUCCESS:
			return { loading: false, register: true }
		case USER_CREATE_FAIL:
			return { loading: false, error: action.payload }
		default:
			return state
	}
}

export const userLoginReducer = (state = {}, action) => {
	switch (action.type) {
		case USER_LOGIN_REQUEST:
			return { loading: true }
		case USER_LOGIN_SUCCESS:
			return { loading: false, userId: action.payload }
		case USER_LOGIN_FAIL:
			return { loading: false, error: action.payload }
		case USER_LOGOUT:
			return {}
		default:
			return state
	}
}

export const userLoginInfoReducer = (state = {}, action) => {
	switch (action.type) {
		case USER_INFO_REQUEST:
			return { loading: true }
		case USER_INFO_SUCCESS:
			return { loading: false, userInfo: action.payload }
		case USER_INFO_FAIL:
			return { loading: false, error: action.payload }
		case USER_LOGOUT:
			return {}
		default:
			return state
	}
}

export const checkUsernameReducer = (state = {}, action) => {
	switch (action.type) {
		case CHECK_USERNAME_REQUEST:
			return { loading: true, username: null }
		case CHECK_USERNAME_SUCCESS:
			return { loading: false, username: action.payload }
		case CHECK_USERNAME_FAIL:
			return { loading: false, error: action.payload }
		default:
			return state
	}
}

export const userUpdateReducer = (state = {}, action) => {
	switch (action.type) {
		case USER_UPDATE_REQUEST:
			return { loading: true }
		case USER_UPDATE_SUCCESS:
			return { loading: false, updatedUser: action.payload }
		case USER_UPDATE_FAIL:
			return { loading: false, error: action.payload }
		case USER_UPDATE_RESET:
			return {}
		default:
			return state
	}
}

export const userSearchReducer = (state = {}, action) => {
	switch (action.type) {
		case SEARCH_USER_REQUEST:
			return { loading: true }
		case SEARCH_USER_SUCCESS:
			return { loading: false, searchResult: action.payload }
		case SEARCH_USER_FAIL:
			return { loading: false, error: action.payload }
		case SEARCH_USER_RESET:
			return {}
		default:
			return state
	}
}

export const userFollowReducer = (state = {}, action) => {
	switch (action.type) {
		case USER_FOLLOW_REQUEST:
			return { loading: true }
		case USER_FOLLOW_SUCCESS:
			return { loading: false, follow: true }
		case USER_FOLLOW_FAIL:
			return { loading: false, error: action.payload }

		default:
			return state
	}
}

export const userUnfollowReducer = (state = {}, action) => {
	switch (action.type) {
		case USER_UNFOLLOW_REQUEST:
			return { loading: true }
		case USER_UNFOLLOW_SUCCESS:
			return { loading: false, unfollow: true }
		case USER_UNFOLLOW_FAIL:
			return { loading: false, error: action.payload }
		default:
			return state
	}
}

export const userByIdReducer = (state = {}, action) => {
	switch (action.type) {
		case USER_BY_ID_REQUEST:
			return { loading: true }
		case USER_BY_ID_SUCCESS:
			return { loading: false, userData: action.payload }
		case USER_BY_ID_FAIL:
			return { loading: false, error: action.payload }
		default:
			return state
	}
}

export const followingUsersReducer = (state = {}, action) => {
	switch (action.type) {
		case GET_FOLLOWING_REQUEST:
			return { loading: true }
		case GET_FOLLOWING_SUCCESS:
			return { loading: false, followingUsers: action.payload }
		case GET_FOLLOWING_FAIL:
			return { loading: false, error: action.payload }
		default:
			return state
	}
}

export const followersUsersReducer = (state = {}, action) => {
	switch (action.type) {
		case GET_FOLLOWERS_REQUEST:
			return { loading: true }
		case GET_FOLLOWERS_SUCCESS:
			return { loading: false, followers: action.payload }
		case GET_FOLLOWERS_FAIL:
			return { loading: false, error: action.payload }
		default:
			return state
	}
}
