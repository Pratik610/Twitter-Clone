import mongoose from 'mongoose'

const tweetSchema = new mongoose.Schema(
	{
		user: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
		},
		text: {
			type: String,
			require: true,
		},
		image: {
			type: String,
		},
		messages: [
			{
				_id: {
					type: mongoose.Schema.Types.ObjectId,
					ref: 'User',
				},
				message: {
					type: String,
				},
			},
		],
		likes: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: 'User',
			},
		],
		retweets: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: 'User',
			},
		],
	},
	{
		timestamps: true,
	}
)

const Tweet = mongoose.model('Tweet', tweetSchema)

export default Tweet
