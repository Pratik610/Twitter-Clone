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
} from '../controlers/tweetControlers.js'

router
	.route('/')
	.post(protect, createTweet)
	.get(protect, getFollowingUsersTweets)

router.route('/usertweets/:id').get(getUserTweets)
router.route('/replied/:id').get(repliedTweets)
router.route('/tweet/:id').get(protect, getTweetById)
router.route('/like').post(protect, likeTweet)
router.route('/unlike').post(protect, unlikeTweet)
router.route('/retweet').post(protect, retweet)
router.route('/bookmark').post(protect, bookmarkTweet)
router.route('/unbookmark').post(protect, unbookmarkTweet)
router.route('/unretweet').post(protect, unretweet)
router.route('/liked').get(protect, likedTweets)
router.route('/retweeted').get(protect, retweetedTweets)
router.route('/bookmarked').get(protect, bookmarkedTweets)
export default router
