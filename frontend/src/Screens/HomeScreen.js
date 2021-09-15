import React, { useState, useEffect } from 'react'
import Sidenav from '../Components/Sidenav'
import News from '../Components/News'
import axios from 'axios'
import MobileNav from '../Components/MobileNav'
import TweetModal from '../Components/TweetModal'
import Loader from '../Components/Loader.js'
import FullScreenLoader from '../Components/FullScreenLoader'
import { USER_LOGOUT } from '../Constants/userConstants.js'
import { TWEET_CREATE_RESET } from '../Constants/tweetConstants.js'
import { useSelector, useDispatch } from 'react-redux'
import {
	tweetCreate,
	followingTweets,
	likeTweet,
	unlikeTweet,
	retweet,
	unretweet,
} from '../Actions/tweetAction.js'
import { getLoginUserInfo } from '../Actions/userAction.js'

const HomeScreen = ({ history }) => {
	const dispatch = useDispatch()

	const userLogin = useSelector((state) => state.userLogin)
	const { userId } = userLogin

	const userLoginInfo = useSelector((state) => state.userLoginInfo)
	const { userInfo, loading: homeLoading } = userLoginInfo

	const tweetFollowing = useSelector((state) => state.tweetFollowing)
	const { loading, followingTweet } = tweetFollowing

	const tweetLike = useSelector((state) => state.tweetLike)
	const { liked } = tweetLike
	const tweetUnlike = useSelector((state) => state.tweetUnlike)
	const { unliked } = tweetUnlike

	const tweetRetweet = useSelector((state) => state.tweetRetweet)
	const { retweet: ret } = tweetRetweet
	const tweetUnretweet = useSelector((state) => state.tweetUnretweet)
	const { unretweet: unret } = tweetUnretweet

	useEffect(() => {
		if (!userId) {
			history.push('/login')
		} else {
			dispatch(getLoginUserInfo(userId._id))
			dispatch(followingTweets())
		}
	}, [userId, history, dispatch, liked, unliked, ret, unret])

	const [text, setText] = useState('')
	const [image, setImage] = useState('')
	const [imageLoading, setImageLoading] = useState(false)

	// const loadFile = (e) => {
	// 	setImage(URL.createObjectURL(e.target.files[0]))
	// }

	const uploadFileHandler = async (e) => {
		setImageLoading(true)
		const file = e.target.files[0]
		const formData = new FormData()
		formData.append('image', file)
		try {
			const config = {
				headers: {
					'Content-Type': 'multipart/form-data',
				},
			}
			const { data } = await axios.post('/api/upload', formData, config)
			setImage(data)
			setImageLoading(false)
		} catch (error) {
			console.error(error)
		}
	}

	const tweet = (e) => {
		e.preventDefault()

		// uploadFileHandler(e)

		dispatch(tweetCreate({ user: userInfo._id, text, image }))

		setImage('')
		setText('')
		dispatch({
			type: TWEET_CREATE_RESET,
		})
	}

	if (followingTweet) {
		for (let i = 0; i < followingTweet.tweets.length; i++) {
			for (let j = 0; j < followingTweet.users.length; j++) {
				if (followingTweet.tweets[i].user === followingTweet.users[j]._id) {
					followingTweet.tweets[i].userdata = followingTweet.users[j]
				}
			}
		}
	}

	return (
		<>
			{homeLoading && <FullScreenLoader />}
			<div className='container '>
				{/* modal  */}

				{userInfo && <TweetModal userInfo={userInfo} />}

				{/* modal ends */}
				{userInfo && (
					<div className='row '>
						<div className='d-none d-md-block col-md-2 col-lg-3 p-md-2 navigation '>
							<Sidenav className='roboto' userInfo={userInfo} />

							<div className='col-12'>
								<div className='collapse mt-3' id='collapseExample'>
									<button
										className='btn btn-danger d-md-none d-lg-block  w-50 d-block mx-auto'
										onClick={() => {
											localStorage.removeItem('userInfo')
											dispatch({
												type: USER_LOGOUT,
											})
										}}>
										Logout
									</button>
									<div className='text-center  d-md-block d-lg-none'>
										<i
											className='fas fa-power-off mx-auto h5 text-light'
											onClick={() => {
												localStorage.removeItem('userInfo')
												dispatch({
													type: USER_LOGOUT,
												})
											}}></i>
									</div>
								</div>
							</div>
						</div>

						<div
							className='col-12 col-md-10 col-lg-6 p-0 tweets-section '
							style={{ height: '100vh', overflowY: 'scroll' }}>
							{/* input tweet */}
							<div className='d-md-none'>
								{' '}
								<MobileNav userInfo={userInfo} />
							</div>

							<div className=' p-3 home d-none d-md-block'>
								<h5
									className='roboto font-weight-bold text-light'
									style={{ fontSize: '20px' }}>
									Home
								</h5>
							</div>
							<div className='d-flex d-none d-md-flex'>
								<div className=' col-2'>
									<img
										className='dp d-block mx-auto mt-2'
										src={userInfo.profilePhoto}
										alt='profile'
									/>
								</div>
								<div className='col-10 p-3   text-light '>
									<form onSubmit={tweet}>
										<textarea
											value={text}
											onChange={(e) => setText(e.target.value)}
											className='w-100 '
											placeholder='Whats happening?'></textarea>

										<hr className='bg-light w-100' />

										<div className='d-flex justify-content-between'>
											<div className='form-group d-flex  w-50 p-2'>
												<label htmlFor='file' className=' col-3 '>
													<i
														className='far h4  text-primary fa-file-image'
														style={{ cursor: 'pointer' }}></i>
												</label>
												<input
													type='file'
													className='form-control-file '
													hidden
													accept=' image/jpeg, image/png'
													name=''
													id='file'
													onChange={uploadFileHandler}
													aria-describedby='fileHelpId'
												/>
											</div>

											<button
												style={{ width: '25%' }}
												type='submit'
												className=' border-0  font-weight-bold  border-rounded tweet-btn  text-center'>
												Tweet
											</button>
										</div>
										<div className='d-flex justify-content-center'>
											{imageLoading && <Loader className='mt-5' />}
										</div>

										{image && (
											<>
												<div className='img-output   w-100 '>
													<i
														className='fas fa-times h4 mb-0'
														style={{ cursor: 'pointer' }}
														onClick={() => setImage('')}></i>

													<img
														id='output'
														src={image}
														alt='img'
														className='img-fluid  d-block  rounded'
													/>
												</div>
											</>
										)}
									</form>
								</div>
							</div>
							<hr className='bg-light d-none d-md-block' />
							<hr className='bg-light d-none d-md-block' />
							{/* Tweets of people */}
							{loading && (
								<div className='d-flex mt-4 justify-content-center'>
									<Loader style={{ marginLeft: '-10%' }} />
								</div>
							)}
							{followingTweet &&
								followingTweet.tweets.map((tweet) => (
									<div className='d-flex mt-1 tweets pb-2' key={tweet._id}>
										<div className='p-2 col-2'>
											<img
												className='dp d-block mx-auto '
												src={tweet.userdata.profilePhoto}
												alt='profile'
											/>
										</div>
										<div className='col-10 pt-2 text-light p-1 ps-3'>
											<h6 className='mb-0 roboto  d-inline-block pe-1'>
												{tweet.userdata.name}
											</h6>
											<span
												className='text-muted'
												style={{ fontSize: '0.8em' }}>
												{tweet.userdata.atTheRate}
											</span>
											<p
												style={{ overflowWrap: 'break-word' }}
												className='mb-0 mt-0  '>
												{tweet.text}
											</p>
											{tweet.image && (
												<div className='img-output mb-2    w-100  '>
													<img
														id='output'
														style={{ width: '90%', height: '90%' }}
														src={tweet.image}
														alt='img'
														className='img-fluid  d-block  rounded'
													/>
												</div>
											)}
											<div className='d-flex mt-1 text-muted '>
												<div className='col-3'>
													<i className='far fa-comment  '></i>
												</div>
												<div className='col-3'>
													{tweet.retweets.find((id) => {
														return id === userId._id
													}) ? (
														<i
															className='fas fa-retweet  text-success'
															onClick={(e) => {
																dispatch(unretweet(tweet._id))
															}}></i>
													) : (
														<i
															className='fas fa-retweet '
															onClick={(e) => {
																dispatch(retweet(tweet._id))
															}}></i>
													)}{' '}
													{tweet.retweets.length}
												</div>
												<div className='col-3'>
													{tweet.likes.find((id) => {
														return id === userId._id
													}) ? (
														<i
															className={`fas fa-heart  text-danger  like-btn `}
															onClick={(e) => {
																dispatch(unlikeTweet(tweet._id))
															}}></i>
													) : (
														<i
															className={`far fa-heart     like-btn `}
															onClick={(e) => {
																dispatch(likeTweet(tweet._id))
															}}></i>
													)}{' '}
													{tweet.likes.length}
												</div>
											</div>
										</div>
									</div>
								))}
						</div>

						<div className='d-none d-lg-block col-lg-3  news'>
							<News className='news' />
						</div>
					</div>
				)}
			</div>
		</>
	)
}

export default HomeScreen
