import React, { useEffect } from 'react'
import News from '../Components/News'
import Sidenav from '../Components/Sidenav'
import { useSelector, useDispatch } from 'react-redux'
import FullScreenLoader from '../Components/FullScreenLoader.js'
import Loader from '../Components/Loader.js'
import AlertBox from '../Components/AlertBox.js'
import TweetModal from '../Components/TweetModal'
import {
	tweetsOfUser,
	getLikedTweets,
	unretweet,
	retweet,
	likeTweet,
	unlikeTweet,
	getRetweetedTweets,
} from '../Actions/tweetAction.js'
import MobileNav from '../Components/MobileNav'
import { getLoginUserInfo } from '../Actions/userAction.js'
import { Link } from 'react-router-dom'

const ProfileScreen = ({ history }) => {
	const userLogin = useSelector((state) => state.userLogin)
	const { userId } = userLogin

	const userLoginInfo = useSelector((state) => state.userLoginInfo)
	const { userInfo, loading, error } = userLoginInfo

	const userTweets = useSelector((state) => state.userTweets)
	const { tweets, loading: tweetsLoading, error: tweetsError } = userTweets

	const tweetLiked = useSelector((state) => state.tweetLiked)
	const { likedTweets, loading: loadingLiked, error: errorLiked } = tweetLiked

	const tweetRetweeted = useSelector((state) => state.tweetRetweeted)
	const { retweetedTweets } = tweetRetweeted

	const tweetLike = useSelector((state) => state.tweetLike)
	const { liked } = tweetLike
	const tweetUnlike = useSelector((state) => state.tweetUnlike)
	const { unliked } = tweetUnlike

	const tweetRetweet = useSelector((state) => state.tweetRetweet)
	const { retweet: ret } = tweetRetweet
	const tweetUnretweet = useSelector((state) => state.tweetUnretweet)
	const { unretweet: unret } = tweetUnretweet

	const dispatch = useDispatch()

	useEffect(() => {
		if (!userId) {
			history.push('/login')
		}
		dispatch(getLoginUserInfo(userId._id))

		dispatch(tweetsOfUser(userId._id))

		dispatch(getLikedTweets())
		dispatch(getRetweetedTweets())
	}, [history, dispatch, userId, unliked, liked, ret, unret])

	if (retweetedTweets) {
		for (let i = 0; i < retweetedTweets.tweets.length; i++) {
			for (let j = 0; j < retweetedTweets.users.length; j++) {
				if (retweetedTweets.tweets[i].user === retweetedTweets.users[j]._id) {
					retweetedTweets.tweets[i].userdata = retweetedTweets.users[j]
				}
			}
		}
	}

	if (likedTweets) {
		for (let i = 0; i < likedTweets.tweets.length; i++) {
			for (let j = 0; j < likedTweets.users.length; j++) {
				if (likedTweets.tweets[i].user === likedTweets.users[j]._id) {
					likedTweets.tweets[i].userdata = likedTweets.users[j]
				}
			}
		}
	}

	return (
		<>
			{loading && <FullScreenLoader />}
			<div className='container'>
				{userInfo && <TweetModal userInfo={userInfo} updatetweet={tweets} />}

				{userInfo && (
					<div className='row'>
						{loading && <FullScreenLoader />}
						<div className='d-none d-md-block col-md-2 col-lg-3 p-md-2 navigation '>
							<Sidenav className='roboto' userInfo={userInfo} />
						</div>
						{/* ......................... */}
						<div
							className='col-12 col-md-10 col-lg-6 p-0 tweets-section '
							style={{ height: '100vh', overflowY: 'scroll' }}>
							{/*Profile */}
							{error && <AlertBox error={error} />}

							<div className=' pt-0 profile'>
								<div className='d-md-none'>
									{' '}
									<MobileNav userInfo={userInfo} />
								</div>
								<div className='d-none d-md-block'>
									<h5 className='roboto ms-2 text-capitalize font-weight-bold text-light mb-0'>
										{userInfo.name}
									</h5>
									<small className='text-muted  ms-2 mt-0'>
										{tweets && tweets.tweets.length} Tweets
									</small>
								</div>

								<div
									className='cover pt-1  text-light'
									style={{
										backgroundImage: `url(uploads/${
											userInfo.coverPhoto.split('uploads')[1]
										})`,
										backgroundRepeat: 'no-repeat',
										backgroundPosition: 'center-top',
										backgroundSize: 'cover',
									}}>
									{/* <img
										className='w-100  '
										src={userInfo.coverPhoto}
										alt='profile'
										style={{ height: '100%' }}
									/> */}
								</div>
								<div className=' editprofile p-3 pb-0 pt-2'>
									<img
										className='img-fluid rounded-circle '
										src={userInfo.profilePhoto}
										alt='profile'
									/>

									<Link to='/editprofile'>
										<button
											className='float-end btn p-2 pt-1 pb-1 text-light  '
											style={{
												borderRadius: '20px',
												border: '2px solid grey',
											}}>
											Edit Profile
										</button>
									</Link>
								</div>
								<div className='p-3 pt-1 '>
									<h5 className=' text-light mb-0 pb-0'>
										<span style={{ fontWeight: 'bold' }}> {userInfo.name}</span>

										<span
											className='text-muted d-block pt-0'
											style={{ fontSize: '13px' }}>
											{userInfo.atTheRate}
										</span>
									</h5>
									<p className='text-light w-50  mb-1'>{userInfo.bio}</p>
									<a
										className='text-decoration-none'
										style={{ color: '#759fff' }}
										href={userInfo.website}>
										{userInfo.website}
									</a>
									<p className='text-muted mt-2 mb-1'>
										<i className='fas fa-birthday-cake'></i> {userInfo.DOB}
										<i className='far fa-calendar-alt ms-2'></i>
										{' Joined '}
										{userInfo.createdAt.substring(0, 10)}
									</p>
									<span className='text-light'>
										{userInfo.following.length}{' '}
										<span className='text-muted'> Following </span>
									</span>
									<span className='p-3 text-light'>
										{userInfo.followers.length}
										<span className='text-muted'> Followers</span>{' '}
									</span>
								</div>

								{/* nav */}
								<ul
									className='nav   text-center text-light pb-0 nav-tabs d-flex '
									id='myTab'
									role='tablist'>
									<li className='nav-item  p-2 pb-0 col-4' role='presentation'>
										<div
											className='active  pb-0'
											id='home-tab'
											data-bs-toggle='tab'
											data-bs-target='#home'
											role='tab'
											aria-controls='home'
											aria-selected='true'>
											<p
												style={{
													fontSize: '0.8em ',
													fontWeight: '900',
												}}
												className='pb-3 tabs mb-0'>
												Tweets
											</p>
										</div>
									</li>
									<li className='nav-item p-2  pb-0 col-4' role='presentation'>
										<div
											id='profile-tab'
											data-bs-toggle='tab'
											data-bs-target='#profile'
											role='tab'
											aria-controls='profile'
											aria-selected='false'>
											<p
												style={{ fontSize: '0.8em ', fontWeight: '900' }}
												className='pb-3 tabs mb-0'>
												Tweets & replies
											</p>
										</div>
									</li>
									<li className='nav-item p-2 pb-0 col-4' role='presentation'>
										<div
											id='contact-tab'
											data-bs-toggle='tab'
											data-bs-target='#contact'
											role='tab'
											aria-controls='contact'
											aria-selected='false'>
											<p
												style={{ fontSize: '0.8em ', fontWeight: '900' }}
												className='pb-3 tabs mb-0'>
												Likes
											</p>
										</div>
									</li>
								</ul>
								<div className='tab-content  text-light' id='myTabContent'>
									<div
										className='tab-pane fade show active'
										id='home'
										role='tabpanel'
										aria-labelledby='home-tab'>
										{/* Tweets of USer */}
										{tweetsLoading && (
											<div className='d-flex mt-4 justify-content-center'>
												<Loader style={{ marginLeft: '-10%' }} />
											</div>
										)}
										{tweetsError && (
											<button onClick={dispatch(tweetsOfUser(userId._id))}>
												reload
											</button>
										)}
										{tweets &&
											tweets.tweets.map((tweet) => (
												<div
													className='d-flex tweets pb-3 pt-2'
													key={tweet._id}>
													<div className='p-2 col-2'>
														<img
															className='dp d-block mx-auto '
															src={userInfo.profilePhoto}
															alt='profile'
														/>
													</div>
													<div className='col-10 pt-2 text-light p-1'>
														<h6 className='mb-0 roboto d-inline-block pe-1'>
															{userInfo.name}
															{/* <span className='text-muted'> - 19m</span> */}
														</h6>
														<span
															className='text-muted'
															style={{ fontSize: '0.8em' }}>
															{userInfo.atTheRate}
														</span>
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
									<div
										className='tab-pane fade'
										id='profile'
										role='tabpanel'
										aria-labelledby='profile-tab'>
										{retweetedTweets &&
											retweetedTweets.tweets.map((tweet) => (
												<div
													className='d-flex mt-1 tweets pb-2'
													key={tweet._id}>
													<div className='p-2 col-2'>
														<img
															className='dp d-block mx-auto '
															src={tweet.userdata.profilePhoto}
															alt='profile'
														/>
													</div>
													<div className='col-10 pt-2 text-light p-1'>
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
									<div
										className='tab-pane fade'
										id='contact'
										role='tabpanel'
										aria-labelledby='contact-tab'>
										{loadingLiked && (
											<div className='d-flex mt-4 justify-content-center'>
												<Loader style={{ marginLeft: '-10%' }} />
											</div>
										)}
										{errorLiked && <AlertBox error={errorLiked} />}
										{likedTweets &&
											likedTweets.tweets.map((tweet) => (
												<div
													className='d-flex mt-1 tweets pb-2'
													key={tweet._id}>
													<div className='p-2 col-2'>
														<img
															className='dp d-block mx-auto '
															src={tweet.userdata.profilePhoto}
															alt='profile'
														/>
													</div>
													<div className='col-10 pt-2 text-light p-1'>
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
								</div>

								{/* /nav */}
							</div>
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

export default ProfileScreen
