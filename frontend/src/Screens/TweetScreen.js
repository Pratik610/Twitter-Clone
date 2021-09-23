import React, { useState, useEffect } from 'react'
import Sidenav from '../Components/Sidenav'
import News from '../Components/News'
import axios from 'axios'
import MobileNav from '../Components/MobileNav'
import TweetModal from '../Components/TweetModal'
import Loader from '../Components/Loader.js'
import { Link } from 'react-router-dom'
import FullScreenLoader from '../Components/FullScreenLoader'
import { USER_LOGOUT } from '../Constants/userConstants.js'
import { TWEET_CREATE_RESET } from '../Constants/tweetConstants'

import { useSelector, useDispatch } from 'react-redux'
import {
	likeTweet,
	unlikeTweet,
	retweet,
	unretweet,
	tweetCreate,
	getTweetById,
	getRepliedTweets,
} from '../Actions/tweetAction.js'
import { getLoginUserInfo } from '../Actions/userAction.js'

const TweetScreen = ({ history, match }) => {
	const dispatch = useDispatch()

	const userLogin = useSelector((state) => state.userLogin)
	const { userId } = userLogin

	const userLoginInfo = useSelector((state) => state.userLoginInfo)
	const { userInfo, loading: homeLoading } = userLoginInfo

	const tweetCreateData = useSelector((state) => state.tweetCreate)
	const { tweet: tweetCreated } = tweetCreateData

	const tweetById = useSelector((state) => state.tweetById)
	const { loading: tweetLoading, tweetData } = tweetById

	const repliedTweets = useSelector((state) => state.repliedTweets)
	const { repliedTweets: repliedTweetsData } = repliedTweets

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
			dispatch(getTweetById(match.params.id))
			dispatch(getRepliedTweets(match.params.id))
		}
	}, [
		userId,
		history,
		dispatch,
		liked,
		unliked,
		ret,
		unret,
		match.params.id,
		tweetCreated,
	])

	const [text, setText] = useState('')
	const [image, setImage] = useState('')
	const [imageLoading, setImageLoading] = useState(false)

	// const loadFile = (e) => {
	// 	setImage(URL.createObjectURL(e.target.files[0]))
	// }

	const reply = (e) => {
		e.preventDefault()
		dispatch(
			tweetCreate({
				text,
				image,
				type: 'reply',
				refTweetId: tweetData.tweet._id,
			})
		)
		setImage('')
		setText('')
		dispatch({
			type: TWEET_CREATE_RESET,
		})
	}

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

	if (repliedTweetsData) {
		for (let i = 0; i < repliedTweetsData.tweets.length; i++) {
			for (let j = 0; j < repliedTweetsData.users.length; j++) {
				if (
					repliedTweetsData.tweets[i].user === repliedTweetsData.users[j]._id
				) {
					repliedTweetsData.tweets[i].userdata = repliedTweetsData.users[j]
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
								<MobileNav userInfo={userInfo} hide={true} />
							</div>

							<div className=' p-3 home d-none d-md-block'>
								<h5
									className='roboto font-weight-bold text-light'
									style={{ fontSize: '20px' }}>
									Tweet
								</h5>
							</div>
							{tweetLoading && (
								<div className='d-flex mt-4 justify-content-center'>
									<Loader style={{ marginLeft: '-10%' }} />
								</div>
							)}
							{tweetData && (
								<>
									<div className='ps-md-3 pe-md-3  ps-1 pe-1'>
										<div className='d-flex mt-1  '>
											<div className='p-2 col-2 col-md-1'>
												<img
													className='dp d-block mx-auto '
													src={tweetData.user.profilePhoto}
													alt='profile'
												/>
											</div>
											<div className='col-10 col-md-11 pt-2 text-light p-1 ps-3'>
												<h6 className='mb-0 roboto mt-1 pe-1'>
													{tweetData.user.name}
												</h6>
												<span
													className='text-muted'
													style={{ fontSize: '0.8em' }}>
													{tweetData.user.atTheRate}
												</span>
											</div>
										</div>
										<div className='p-3 pt-1 text-light border-bottom'>
											<p
												style={{ overflowWrap: 'break-word' }}
												className='tweet-screen-text   mb-1 '>
												{tweetData.tweet.text}
											</p>
											{tweetData.tweet.image && (
												<div className='img-output mb-2    w-100  '>
													<img
														id='output'
														style={{ width: '90%', height: '90%' }}
														src={tweetData.tweet.image}
														alt='img'
														className='img-fluid  d-block  rounded'
													/>
												</div>
											)}
											<small className='text-muted'>
												{tweetData.tweet.createdAt.slice(11, 16)} ·{' '}
												{tweetData.tweet.createdAt.split('T')[0]}
											</small>
										</div>
										<div className='d-flex border-bottom p-2'>
											{' '}
											<p className='text-light pe-4 mb-1'>
												{tweetData.tweet.retweets.length}{' '}
												<span className='text-muted'>Retweets</span>{' '}
											</p>
											<p className='text-light mb-1'>
												{tweetData.tweet.likes.length}{' '}
												<span className='text-muted'>Likes</span>
											</p>
										</div>

										<div className='d-flex  mt-1 text-muted  p-2 border-bottom '>
											<div className='col-4 text-center'>
												{tweetData.tweet.retweets.find((id) => {
													return id === userInfo._id
												}) ? (
													<i
														className='fas fa-retweet  text-success'
														onClick={(e) => {
															dispatch(unretweet(tweetData.tweet._id))
														}}></i>
												) : (
													<i
														className='fas fa-retweet '
														onClick={(e) => {
															dispatch(retweet(tweetData.tweet._id))
														}}></i>
												)}{' '}
											</div>
											<div className='col-4 text-center'>
												{tweetData.tweet.likes.find((id) => {
													return id === userInfo._id
												}) ? (
													<i
														className={`fas fa-heart  text-danger  like-btn `}
														onClick={(e) => {
															dispatch(unlikeTweet(tweetData.tweet._id))
														}}></i>
												) : (
													<i
														className={`far fa-heart     like-btn `}
														onClick={(e) => {
															dispatch(likeTweet(tweetData.tweet._id))
														}}></i>
												)}
											</div>
											<div className='col-4 text-center'>
												<i className='far fa-bookmark'></i>
											</div>
										</div>
									</div>
									<div className='d-flex ps-md-3 w-100  mt-2 pe-md-3 ps-1 pe-1 pb-2'>
										<div className='col-12 ps-1 pe-1 text-light '>
											<form onSubmit={reply}>
												<textarea
													value={text}
													id='reply'
													className='w-100 pb-3 mobile-text-area'
													style={{ borderBottom: '1px solid #1DA1F2' }}
													onChange={(e) => setText(e.target.value)}
													onInput={(e) => {
														const textarea = document.querySelector('#reply')
														textarea.style.height = 'auto'
														textarea.style.height = textarea.scrollHeight + 'px'
													}}
													placeholder='Tweet your reply'
													rows={1}></textarea>

												{text && (
													<div className='d-flex justify-content-between mt-1'>
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
																onChange={uploadFileHandler}
																accept=' image/jpeg, image/png'
																name=''
																id='file'
																aria-describedby='fileHelpId'
															/>
														</div>

														<button
															style={{
																borderRadius: '20px',
																backgroundColor: '#1DA1F2',
																fontWeight: '900',
															}}
															type='submit'
															className='w-50 border-0 text-light   border-rounded p-0  text-center'>
															Reply
														</button>
													</div>
												)}
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
									<div className='ps-md-3 w-100  mt-2 pe-md-3 ps-1 pe-1 pb-2'>
										{repliedTweetsData &&
											repliedTweetsData.tweets.map((tweet) => (
												<div
													className='d-flex tweets pb-3 pt-2'
													key={tweet._id}>
													<div className='p-2 col-2'>
														<Link
															className='text-decoration-none text-light'
															to={`/${userInfo._id}`}>
															<img
																className='dp d-block mx-auto '
																src={userInfo.profilePhoto}
																alt='profile'
															/>
														</Link>
													</div>
													<div className='col-10 pt-2 text-light p-1'>
														<Link
															className='text-decoration-none text-light'
															to={`/${userInfo._id}`}>
															<h6 className='mb-0 roboto d-inline-block pe-1'>
																{userInfo.name}
																{/* <span className='text-muted'> - 19m</span> */}
															</h6>
															<span
																className='text-muted'
																style={{ fontSize: '0.8em' }}>
																{userInfo.atTheRate}
															</span>
														</Link>
														<Link
															className='text-decoration-none text-muted'
															to={`/tweet/${tweet._id}`}>
															<p
																style={{ overflowWrap: 'break-word' }}
																className='mb-0'>
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
															<div className='col-3'>
																<i className='far fa-bookmark'></i>
															</div>
														</div>
													</div>
												</div>
											))}
									</div>
								</>
							)}
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

export default TweetScreen
