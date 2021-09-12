import Tweet from '../models/TweetModel.js'
import User from '../models/UserModel.js'
import asyncHandler from 'express-async-handler'

// desc - Create a Tweet
// req / route -  POST , /
// access - public
export const createTweet = asyncHandler(async (req, res) => {
	const { user, text, image } = req.body

	const tweet = await Tweet.create({
		user,
		text,
		image,
	})

	if (tweet) {
		res.status(201).json({
			message: 'Tweeted ',
		})
	} else {
		res.status(400)
		throw new Error('invalid User data')
	}
})

// desc - get all Tweets of user
// req / route -  GET , /
// access - public
export const getUserTweets = asyncHandler(async (req, res) => {
	const { id } = req.params

	const tweets = await Tweet.find({ user: id }).sort({ createdAt: -1 })

	if (tweets) {
		res.status(201).json({
			tweets,
		})
	} else {
		res.status(400)
		throw new Error('invalid User data')
	}
})

// desc - get following users tweet
// req / route -  GET
// access - private
export const getFollowingUsersTweets = asyncHandler(async (req, res) => {
	const tweets = await Tweet.find({ user: req.user.following }).sort({
		createdAt: -1,
	})
	let userList = []
	for (let index = 0; index < tweets.length; index++) {
		userList.push(tweets[index].user)
	}

	const users = await User.find({ _id: userList })

	if (tweets) {
		res.status(201).json({
			tweets,
			users,
		})
	} else {
		res.status(400)
		throw new Error('invalid User data')
	}
})

// desc - like tweet
// req / route -  POST , /api/tweet/like
// access - private
export const likeTweet = asyncHandler(async (req, res) => {
	const tweet = await Tweet.findById(req.body.id)
	const user = await User.findById(req.user._id)

	tweet.likes.push(user._id)
	const result = await tweet.save()

	if (result) {
		res.status(201).json({ message: 'Liked !!' })
	} else {
		res.status(404)
		throw new Error('User not Found')
	}
})

// desc - unlike tweet
// req / route -  POST , /api/tweet/unlike
// access - private
export const unlikeTweet = asyncHandler(async (req, res) => {
	const tweet = await Tweet.findById(req.body.id)
	const user = await User.findById(req.user._id)

	tweet.likes.splice(tweet.likes.indexOf(user._id, 1))
	const result = await tweet.save()

	if (result) {
		res.status(201).json({ message: 'Unliked !!' })
	} else {
		res.status(404)
		throw new Error('User not Found')
	}
})

// desc - retweet
// req / route -  POST , /api/tweet/retweet
// access - private
export const retweet = asyncHandler(async (req, res) => {
	const tweet = await Tweet.findById(req.body.id)
	const user = await User.findById(req.user._id)

	tweet.retweets.push(user._id)
	const result = await tweet.save()

	if (result) {
		res.status(201).json('Retweet!!')
	} else {
		res.status(404)
		throw new Error('User not Found')
	}
})

// desc - unretweet
// req / route -  POST , /api/tweet/unretweet
// access - private
export const unretweet = asyncHandler(async (req, res) => {
	const tweet = await Tweet.findById(req.body.id)
	const user = await User.findById(req.user._id)

	tweet.retweets.splice(tweet.retweets.indexOf(user._id, 1))
	const result = await tweet.save()

	if (result) {
		res.status(201).json({ message: 'Undo Retweet!!' })
	} else {
		res.status(404)
		throw new Error('User not Found')
	}
})

// desc - get liked tweets
// req / route -  POST , /api/tweet/liked
// access - private
export const likedTweets = asyncHandler(async (req, res) => {
	const tweets = await Tweet.find({ likes: req.user._id }).sort({
		createdAt: -1,
	})

	let userList = []
	for (let index = 0; index < tweets.length; index++) {
		userList.push(tweets[index].user)
	}

	const users = await User.find({ _id: userList })

	if (tweets) {
		res.status(201).json({ tweets, users })
	} else {
		res.status(404)
		throw new Error('User not Found')
	}
})

// desc - get liked tweets
// req / route -  POST , /api/tweet/retweeted
// access - private
export const retweetedTweets = asyncHandler(async (req, res) => {
	const tweets = await Tweet.find({ retweets: req.user._id }).sort({
		createdAt: -1,
	})

	let userList = []
	for (let index = 0; index < tweets.length; index++) {
		userList.push(tweets[index].user)
	}

	const users = await User.find({ _id: userList })

	if (tweets) {
		res.status(201).json({ tweets, users })
	} else {
		res.status(404)
		throw new Error('User not Found')
	}
})
