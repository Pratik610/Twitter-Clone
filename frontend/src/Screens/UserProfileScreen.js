import React, { useEffect } from 'react'
import News from '../Components/News'
import Sidenav from '../Components/Sidenav'
import { useSelector, useDispatch } from 'react-redux'
import FullScreenLoader from '../Components/FullScreenLoader.js'
import Loader from '../Components/Loader.js'

import AlertBox from '../Components/AlertBox.js'
import TweetModal from '../Components/TweetModal'
import MobileNav from '../Components/MobileNav'
import { getUserById, followUser, unfollowUser } from '../Actions/userAction.js'
import { tweetsOfUser } from '../Actions/tweetAction.js'

const UserProfileScreen = ({ history, match }) => {
	const userById = useSelector((state) => state.userById)
	const { userData, loading, error } = userById

	const userLogin = useSelector((state) => state.userLogin)
	const { userId, loading: homeLoading } = userLogin

	const userTweets = useSelector((state) => state.userTweets)
	const { tweets, loading: tweetsLoading, error: tweetsError } = userTweets

	const userFollow = useSelector((state) => state.userFollow)
	const { follow } = userFollow

	const userUnfollow = useSelector((state) => state.userUnfollow)
	const { unfollow } = userUnfollow

	const dispatch = useDispatch()

	if (userId) {
		if (match.params.id === userId._id) {
			history.push('/profile')
		}
	}

	useEffect(() => {
		dispatch(tweetsOfUser(match.params.id))
		dispatch(getUserById(match.params.id))
	}, [dispatch, match.params.id, follow, unfollow])

	return (
		<>
			{homeLoading && <FullScreenLoader />}
			<div className='container'>
				{userData && <TweetModal userInfo={userData} updatetweet={tweets} />}

				{userData && (
					<div className='row'>
						{loading && <FullScreenLoader />}
						<div className='d-none d-md-block col-md-2 col-lg-3 p-md-2 navigation '>
							<Sidenav className='roboto' userInfo={userData} />
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
									<MobileNav />
								</div>
								<div className='d-none d-md-block'>
									<h5 className='roboto ms-2 text-capitalize font-weight-bold text-light mb-0'>
										{userData.name}
									</h5>
									<small className='text-muted  ms-2 mt-0'>
										{tweets && tweets.tweets.length} Tweets
									</small>
								</div>

								<div className='cover pt-1 '>
									<img
										className='w-100  '
										src={`/photos/${userData.coverPhoto}`}
										alt='profile'
										style={{ height: '100%' }}
									/>
								</div>
								<div className=' editprofile p-3 pb-0 pt-2'>
									<img
										className='img-fluid rounded-circle '
										src={`./photos/${userData.profilePhoto}`}
										alt='profile'
									/>

									{userData.followers.find((id) => {
										return id === userId._id
									}) ? (
										<button
											className='float-end btn p-4 pt-1 pb-1 text-light  '
											onClick={() => dispatch(unfollowUser(userData._id))}
											style={{
												borderRadius: '20px',
												border: '2px solid grey',
												fontWeight: 'bold',
											}}>
											Unfollow
										</button>
									) : (
										<button
											className='float-end btn p-4 pt-1 pb-1   '
											onClick={() => dispatch(followUser(userData._id))}
											style={{
												borderRadius: '20px',
												border: '2px solid grey',
												background: 'white',
												color: 'black',
												fontWeight: 'bold',
											}}>
											Follow
										</button>
									)}
								</div>
								<div className='p-3 pt-1 '>
									<h5 className=' text-light mb-0 pb-0'>
										<span style={{ fontWeight: 'bold' }}> {userData.name}</span>

										<span
											className='text-muted d-block pt-0'
											style={{ fontSize: '13px' }}>
											{userData.atTheRate}
										</span>
									</h5>
									<p className='text-muted mt-2 mb-1'>
										<i className='fas fa-birthday-cake'></i> {userData.DOB}
										<i className='far fa-calendar-alt ms-2'></i>
										{' Joined '}
										{userData.createdAt.substring(0, 10)}
									</p>
									<span className='text-light'>
										{userData.following.length}{' '}
										<span className='text-muted'> Following </span>
									</span>
									<span className='p-3 text-light'>
										{userData.followers.length}
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
											<div className='d-flex justify-content-center mt-5'>
												<Loader />
											</div>
										)}
										{tweetsError && <AlertBox error={tweetsError} />}
										{tweets &&
											tweets.tweets.map((t) => (
												<div className='d-flex tweets pb-3 pt-2' key={t._id}>
													<div className='p-2 col-2'>
														<img
															className='dp d-block mx-auto '
															src={`./photos/${userData.profilePhoto}`}
															alt='profile'
														/>
													</div>
													<div className='col-10 pt-2 text-light p-1'>
														<h6 className='mb-0 roboto d-inline-block'>
															{userData.name}
															{/* <span className='text-muted'> - 19m</span> */}
														</h6>
														<span
															className='text-muted p-1'
															style={{ fontSize: '12px' }}>
															{userData.atTheRate}
														</span>
														<p>{t.text}</p>
														<div className='d-flex text-muted '>
															<i className='far fa-comment col-3 '></i>
															<i className='fas fa-retweet col-3'></i>
															<i className='far fa-heart col-3'></i>
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
										p
									</div>
									<div
										className='tab-pane fade'
										id='contact'
										role='tabpanel'
										aria-labelledby='contact-tab'>
										l
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

export default UserProfileScreen
