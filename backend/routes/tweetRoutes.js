import express from 'express'
import { protect } from '../middleware/authMiddleware.js'
const router = express.Router()
import {
	createTweet,
	getUserTweets,
	getFollowingUsersTweets,
	likeTweet,
	unlikeTweet,
	retweet,
	unretweet,
	likedTweets,
	retweetedTweets,
	getTweetById,
	repliedTweets,
	bookmarkTweet,
	unbookmarkTweet,
	bookmarkedTweets,
	deleteTweet,
} from '../controlers/tweetControlers.js'

router
	.route('/')
	.post(protect, createTweet)
	.get(protect, getFollowingUsersTweets)

router.route('/usertweets/:id').get(getUserTweets)
router.route('/replied/:id').get(repliedTweets)
router.route('/tweet/:id').get(protect, getTweetById)
router.route('/like').post(protect, likeTweet)
router.route('/delete/:id').delete(protect, deleteTweet)
router.route('/unlike').post(protect, unlikeTweet)
router.route('/retweet').post(protect, retweet)
router.route('/bookmark').post(protect, bookmarkTweet)
router.route('/unbookmark').post(protect, unbookmarkTweet)
router.route('/unretweet').post(protect, unretweet)
router.route('/liked').post(protect, likedTweets)
router.route('/retweeted').post(protect, retweetedTweets)
router.route('/bookmarked').get(protect, bookmarkedTweets)
export default router
