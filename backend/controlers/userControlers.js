import User from '../models/UserModel.js'
import asyncHandler from 'express-async-handler'
import generateToken from '../utils/generateToken.js'

const createUser = asyncHandler(async (req, res) => {
	const { name, email, password, atTheRate, DOB } = req.body
	const userExist = await User.findOne({ email })
	if (userExist) {
		res.status(404)
		throw new Error('User Allready exist')
	}

	const user = await User.create({
		name,
		email,
		atTheRate,
		password,
		DOB,
	})

	if (user) {
		res.status(201).json({
			message: 'User Registered',
		})
	} else {
		res.status(400)
		throw new Error('invalid User data')
	}
})

const loginUser = asyncHandler(async (req, res) => {
	const { email, password } = req.body
	const user = await User.findOne({ email, password }).select('-password')

	if (user) {
		res.status(201).json({
			_id: user._id,
			token: generateToken(user._id),
		})
	} else {
		res.status(400)
		throw new Error('invalid Email or Password')
	}
})

const editUserProfile = asyncHandler(async (req, res) => {
	const user = await User.findById(req.user._id)
	if (user) {
		user.name = req.body.name || user.name
		user.bio = req.body.bio || user.bio
		user.website = req.body.website || user.bio

		const updatedUser = await user.save()
		res.json({
			_id: user._id,
			name: user.name,
			email: user.email,
			atTheRate: user.atTheRate,
			bio: user.bio,
			website: user.website,
			DOB: user.DOB,
			isAdmin: user.isAdmin,
			profilePhoto: user.profilePhoto,
			coverPhoto: user.coverPhoto,
			followers: user.followers,
			following: user.following,
			createdAt: user.createdAt,
			token: generateToken(user._id),
		})
	} else {
		res.status(404)
		throw new Error('User not Found')
	}
})

const followUser = asyncHandler(async (req, res) => {
	const me = await User.findById(req.user._id)
	const user = await User.findById(req.body.id)

	me.following.push(req.body.id)
	const con1 = await me.save()
	user.followers.push(req.user._id)
	const con2 = await user.save()

	if (con1 && con2) {
		res.status(201).json('Done')
	} else {
		res.status(404)
		throw new Error('User not Found')
	}
})

const unfollowUser = asyncHandler(async (req, res) => {
	const me = await User.findById(req.user._id)
	const user = await User.findById(req.body.id)

	me.following.splice(me.following.indexOf(req.body.id), 1)
	user.followers.splice(user.followers.indexOf(req.user._id), 1)
	const con1 = await me.save()
	const con2 = await user.save()

	if (con1 && con2) {
		res.status(201).json('Done')
	} else {
		res.status(404)
		throw new Error('User not Found')
	}
})

const searchUser = asyncHandler(async (req, res) => {
	const user = await User.find({
		name: { $regex: req.body.query, $options: 'i' },
	}).select('-password')
	if (user) {
		res.status(201).json(user)
	} else {
		res.status(404)
		throw new Error('User not Found')
	}
})

const getUserById = asyncHandler(async (req, res) => {
	const id = req.params.id
	const user = await User.findById(id).select('-password')
	if (user) {
		res.status(201).json(user)
	} else {
		res.status(404)
		throw new Error('User Not Found')
	}
})

const getLoginUser = asyncHandler(async (req, res) => {
	const id = req.body.id
	const user = await User.findById(id).select('-password')
	if (user) {
		res.status(201).json(user)
	} else {
		res.status(404)
		throw new Error('User Not Found')
	}
})

export {
	createUser,
	loginUser,
	editUserProfile,
	searchUser,
	getUserById,
	followUser,
	unfollowUser,
	getLoginUser,
}
