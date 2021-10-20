import express from 'express'
import { protect } from '../middleware/authMiddleware.js'
import {
	createUser,
	loginUser,
	editUserProfile,
	searchUser,
	getUserById,
	followUser,
	getLoginUser,
	unfollowUser,
	checkUsername,
	getUserFollowing,
	getUserFollowers,
	getRandomUsers,
} from '../controlers/userControlers.js'
const router = express.Router()

router.route('/').post(searchUser)
router.route('/following').post(getUserFollowing)
router.route('/followers').post(getUserFollowers)
router.route('/:id').get(getUserById)
router.route('/signup').post(createUser)
router.route('/username').post(checkUsername)
router.route('/login').post(loginUser)
router.route('/info').post(getLoginUser)
router.route('/explore').post(protect, getRandomUsers)
router.route('/edit').put(protect, editUserProfile)
router.route('/follow').post(protect, followUser)
router.route('/unfollow').post(protect, unfollowUser)

export default router
