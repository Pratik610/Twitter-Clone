import mongoose from 'mongoose'

const userSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			require: true,
		},
		email: {
			type: String,
			require: true,
		},
		atTheRate: {
			type: String,
			require: true,
		},
		DOB: {
			type: String,
			require: true,
		},
		password: {
			type: String,
			require: true,
		},
		isAdmin: {
			type: Boolean,
			default: false,
		},
		bio: {
			type: String,
		},
		website: {
			type: String,
		},
		profilePhoto: {
			type: String,
			default: 'uploads/default.png',
		},
		coverPhoto: {
			type: String,
			default: 'uploads/defaultBackground.png',
		},
		posi: {
			type: String,
			default: 'center',
		},
		followers: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: 'User',
			},
		],
		following: [
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

const User = mongoose.model('User', userSchema)

export default User
