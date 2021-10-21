import React, { useState, useEffect } from 'react'
import Sidenav from '../Components/Sidenav'
import News from '../Components/News'
import { Link } from 'react-router-dom'
import axios from 'axios'
import MobileNav from '../Components/MobileNav'
import TweetModal from '../Components/TweetModal'
import Loader from '../Components/Loader.js'
import FullScreenLoader from '../Components/FullScreenLoader'
import { USER_LOGOUT } from '../Constants/userConstants.js'
import { TWEET_CREATE_RESET } from '../Constants/tweetConstants.js'
import { useSelector, useDispatch } from 'react-redux'
import Header from '../Components/Header'
import {
	tweetCreate,
	followingTweets,
	likeTweet,
	unlikeTweet,
	retweet,
	unretweet,
	bookmark,
	unbookmark,
	tweetDelete,
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

	const tweetCreateState = useSelector((state) => state.tweetCreate)
	const { tweet: tweetCreated } = tweetCreateState

	const tweetLike = useSelector((state) => state.tweetLike)
	const { liked } = tweetLike
	const tweetUnlike = useSelector((state) => state.tweetUnlike)
	const { unliked } = tweetUnlike

	const tweetRetweet = useSelector((state) => state.tweetRetweet)
	const { retweet: ret } = tweetRetweet
	const tweetUnretweet = useSelector((state) => state.tweetUnretweet)
	const { unretweet: unret } = tweetUnretweet

	const bookmarkTweet = useSelector((state) => state.bookmarkTweet)
	const { bookmarkedTweet: bTweet } = bookmarkTweet

	const unbookmarkTweet = useSelector((state) => state.unbookmarkTweet)
	const { unbookmarkedTweet: unbTweet } = unbookmarkTweet

	const deleteTweet = useSelector((state) => state.deleteTweet)
	const { delete: del } = deleteTweet

	useEffect(() => {
		if (!userId) {
			history.push('/login')
		} else {
			if (!userInfo) {
				dispatch(getLoginUserInfo(userId._id))
			}
			dispatch(followingTweets())
		}
	}, [
		userId,
		history,
		dispatch,
		liked,
		unliked,
		userInfo,
		del,
		ret,
		unret,
		bTweet,
		unbTweet,
		tweetCreated,
	])

	const scroll = () => {
		console.log('ji')
		document.getElementById('top').style.position = 'absolute'
	}

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

		dispatch(tweetCreate({ text, image }))

		setImage('')
		setText('')
		dispatch({
			type: TWEET_CREATE_RESET,
		})
	}

	const deleteTweetByID = (id) => {
		if (window.confirm('Delete Tweet ?')) {
			dispatch(tweetDelete(id))
		}
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
			<Header title='Home' />
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
							id='tweets-section'
							onScroll={scroll}
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
										className='dp d-block mx-auto mt-3'
										src={userInfo.profilePhoto}
										alt='profile'
										onError={(e) => (e.target.src = '/uploads/default.png')}
									/>
								</div>
								<div className='col-10 p-3   text-light '>
									<form onSubmit={tweet}>
										<textarea
											value={text}
											id='main-tweet'
											onChange={(e) => setText(e.target.value)}
											className='w-100 border-bottom pb-3 mb-2 '
											placeholder='Whats happening?'
											rows={1}
											onInput={(e) => {
												const textarea = document.querySelector('#main-tweet')
												textarea.style.height = 'auto'
												textarea.style.height = textarea.scrollHeight + 'px'
											}}></textarea>

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
									<>
										<div
											className=' row ps-3 mt-1 tweets pb-2 pe-md-3 ps-md-3'
											key={tweet._id}>
											{tweet.type === 'reply' &&
												followingTweet.mainTweets.map((mainTweet, i) => (
													<>
														{mainTweet._id === tweet.refTweetId &&
															followingTweet.mainUsers.map((user) => (
																<>
																	{mainTweet.user === user._id && (
																		<>
																			<div
																				key={user._id}
																				className='col-md-11 col-12 offset-2 ps-2 ps-md-4 offset-md-1 text-muted'
																				style={{ fontSize: '0.8em' }}>
																				<span>Replying to {user.name}</span>
																			</div>

																			<div className='col-md-1 mb-3 col-2 p-2 pe-0'>
																				<Link
																					className='text-decoration-none text-light'
																					to={`/user/${user._id}`}>
																					{' '}
																					<img
																						className='dp d-block mx-auto '
																						src={user.profilePhoto}
																						alt='profile'
																						onError={(e) =>
																							(e.target.src =
																								'/uploads/default.png')
																						}
																					/>
																				</Link>
																			</div>
																			<div className='col-10 mb-3 col-md-11 pt-2 text-light p-1 ps-2 ps-md-4'>
																				<div className='d-flex justify-content-between'>
																					<Link
																						className='text-decoration-none text-light'
																						to={`/user/${user._id}`}>
																						<div>
																							<h6 className='mb-0 roboto  d-inline-block pe-1'>
																								{user.name}
																							</h6>
																							<span
																								className='text-muted'
																								style={{ fontSize: '0.8em' }}>
																								{user.atTheRate}
																							</span>
																						</div>
																					</Link>
																					<div className='pe-4 pe-md-2'>
																						{userInfo._id === user._id && (
																							<div class='btn-group'>
																								<i
																									className='text-light h3 float-right fas fa-ellipsis-h '
																									type='button'
																									data-bs-toggle='dropdown'
																									aria-expanded='false'></i>
																								<ul className='dropdown-menu  bg-dark'>
																									<div className='d-flex text-light justify-content-center align-items-centers'>
																										<i
																											style={{
																												color: 'red',
																											}}
																											onClick={() => {
																												deleteTweetByID(
																													mainTweet._id
																												)
																											}}
																											className='far  fa-trash-alt pb-0 pe-2'>
																											<span className='ps-2 roboto'>
																												Delete
																											</span>
																										</i>{' '}
																									</div>
																								</ul>
																							</div>
																						)}
																					</div>
																				</div>
																				<Link
																					className='text-decoration-none text-light'
																					to={`/tweet/${mainTweet._id}`}>
																					<p
																						style={{
																							overflowWrap: 'break-word',
																							whiteSpace: 'pre',
																						}}
																						className='mb-0'>
																						{mainTweet.text}
																					</p>
																				</Link>
																				{mainTweet.image && (
																					<div className='img-output mb-2    w-100  '>
																						<Link
																							className='text-decoration-none text-light'
																							to={`/tweet/${mainTweet._id}`}>
																							<img
																								id='output'
																								style={{
																									width: '90%',
																									height: '90%',
																								}}
																								src={mainTweet.image}
																								alt='img'
																								className='img-fluid  d-block  rounded'
																							/>
																						</Link>
																					</div>
																				)}
																				<div className='d-flex mt-2 text-muted '>
																					<div className='col-3'>
																						<Link
																							to={`/tweet/${mainTweet._id}`}
																							className='text-decoration-none text-muted'>
																							<i className='far fa-comment  '></i>
																						</Link>
																					</div>
																					<div className='col-3'>
																						{mainTweet.retweets.find((id) => {
																							return id === userId._id
																						}) ? (
																							<i
																								className='fas fa-retweet  text-success'
																								onClick={(e) => {
																									dispatch(
																										unretweet(mainTweet._id)
																									)
																								}}></i>
																						) : (
																							<i
																								className='fas fa-retweet '
																								onClick={(e) => {
																									dispatch(
																										retweet(mainTweet._id)
																									)
																								}}></i>
																						)}{' '}
																						{mainTweet.retweets.length}
																					</div>
																					<div className='col-3'>
																						{mainTweet.likes.find((id) => {
																							return id === userId._id
																						}) ? (
																							<i
																								className={`fas fa-heart  text-danger  like-btn `}
																								onClick={(e) => {
																									dispatch(
																										unlikeTweet(mainTweet._id)
																									)
																								}}></i>
																						) : (
																							<i
																								className={`far fa-heart     like-btn `}
																								onClick={(e) => {
																									dispatch(
																										likeTweet(mainTweet._id)
																									)
																								}}></i>
																						)}{' '}
																						{mainTweet.likes.length}
																					</div>
																					<div className='col-3'>
																						{mainTweet.bookmark.find((id) => {
																							return id === userId._id
																						}) ? (
																							<i
																								className={`fas fa-bookmark `}
																								onClick={(e) => {
																									dispatch(
																										unbookmark(mainTweet._id)
																									)
																								}}></i>
																						) : (
																							<i
																								className={`far fa-bookmark `}
																								onClick={(e) => {
																									dispatch(
																										bookmark(mainTweet._id)
																									)
																								}}></i>
																						)}{' '}
																					</div>
																				</div>
																			</div>
																		</>
																	)}
																</>
															))}
													</>
												))}
											<div className='p-2 col-2 col-md-1  '>
												<Link
													className='text-decoration-none text-light'
													to={`/user/${tweet.userdata._id}`}>
													{' '}
													<img
														className='dp  d-block mx-auto '
														src={tweet.userdata.profilePhoto}
														alt='profile'
														onError={(e) =>
															(e.target.src = '/uploads/default.png')
														}
													/>
												</Link>
											</div>
											<div className='col-10 col-md-11 pt-2 text-light p-1 ps-2 ps-md-4'>
												<div className='d-flex justify-content-between'>
													<Link
														className='text-decoration-none text-light'
														to={`/user/${tweet.userdata._id}`}>
														<div>
															<h6 className='mb-0 roboto  d-inline-block pe-1'>
																{tweet.userdata.name}
															</h6>
															<span
																className='text-muted'
																style={{ fontSize: '0.8em' }}>
																{tweet.userdata.atTheRate}
															</span>
														</div>
													</Link>
													<div className='pe-4 pe-md-2'>
														{userInfo._id === tweet.userdata._id && (
															<div class='btn-group'>
																<i
																	className='text-light h3 float-right fas fa-ellipsis-h '
																	type='button'
																	data-bs-toggle='dropdown'
																	aria-expanded='false'></i>
																<ul className='dropdown-menu  bg-dark'>
																	<div className='d-flex text-light justify-content-center align-items-centers'>
																		<i
																			style={{
																				color: 'red',
																			}}
																			onClick={() => {
																				deleteTweetByID(tweet._id)
																			}}
																			className='far  fa-trash-alt pb-0 pe-2'>
																			<span className='ps-2 roboto'>
																				Delete
																			</span>
																		</i>{' '}
																	</div>
																</ul>
															</div>
														)}
													</div>
												</div>

												<Link
													className='text-decoration-none text-light'
													to={`/tweet/${tweet._id}`}>
													{/* {tweet.text.length > 50 ? tweet.text.split('') : ''} */}
													<p
														style={{
															overflowWrap: 'ellipsis',
															whiteSpace: 'pre',
														}}
														className={'mb-0 mt-0'}>
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
												</Link>
												<div className='d-flex mt-2 text-muted '>
													<div className='col-3'>
														<Link
															className='text-decoration-none text-muted'
															to={`/tweet/${tweet._id}`}>
															<i className='far fa-comment  '></i>{' '}
														</Link>
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
														<small className='ps-1'>
															{tweet.retweets.length}
														</small>
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
														<small className='ps-1'>{tweet.likes.length}</small>
													</div>
													<div className='col-3'>
														{tweet.bookmark.find((id) => {
															return id === userId._id
														}) ? (
															<i
																className={`fas fa-bookmark `}
																onClick={(e) => {
																	dispatch(unbookmark(tweet._id))
																}}></i>
														) : (
															<i
																className={`far fa-bookmark `}
																onClick={(e) => {
																	dispatch(bookmark(tweet._id))
																}}></i>
														)}{' '}
													</div>
												</div>
											</div>
										</div>
									</>
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
