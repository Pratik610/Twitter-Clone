import React, { useEffect } from 'react'
import Sidenav from '../Components/Sidenav'
import News from '../Components/News'
import { Link } from 'react-router-dom'
import MobileNav from '../Components/MobileNav'
import TweetModal from '../Components/TweetModal'
import Loader from '../Components/Loader.js'
import FullScreenLoader from '../Components/FullScreenLoader'
import Header from '../Components/Header'
import { USER_LOGOUT } from '../Constants/userConstants.js'
import { useSelector, useDispatch } from 'react-redux'

import {
	getLoginUserInfo,
	getRandomUsers,
	unfollowUser,
	followUser,
} from '../Actions/userAction.js'
let skip = 0

const ExploreScreen = ({ history }) => {
	const dispatch = useDispatch()

	const userLogin = useSelector((state) => state.userLogin)
	const { userId } = userLogin

	const userLoginInfo = useSelector((state) => state.userLoginInfo)
	const { userInfo, loading: homeLoading } = userLoginInfo

	const getUsers = useSelector((state) => state.getUsers)
	const { loading, users } = getUsers

	useEffect(() => {
		if (!userId) {
			history.push('/login')
		} else {
			if (!userInfo) {
				dispatch(getLoginUserInfo(userId._id))
			}
			dispatch(getRandomUsers(0))
		}
	}, [userId, history, dispatch, userInfo])

	const loadMore = () => {
		dispatch(getRandomUsers((skip += 4)))
		console.log(skip)
	}

	return (
		<>
			{' '}
			<Header title='Explore' />
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
									Explore
								</h5>
							</div>

							{/* Tweets of people */}
							{loading && (
								<div className='d-flex mt-4 justify-content-center'>
									<Loader style={{ marginLeft: '-10%' }} />
								</div>
							)}

							{users &&
								users.map((user) => (
									<div
										className='w-100  d-flex border-bottom p-3 pe-2'
										style={{ alignItems: 'center' }}
										key={user._id}>
										<div className='  col-2 '>
											<Link
												to={`/user/${user._id}`}
												className='text-decoration-none'>
												<img
													className='dp d-block mx-auto '
													src={user.profilePhoto}
													alt='profile'
													onError={(e) =>
														(e.target.src = '/uploads/default.png')
													}
												/>
											</Link>
										</div>
										<div className=' col-5 '>
											<Link
												to={`/user/${user._id}`}
												className='text-decoration-none '>
												<p
													style={{
														overflowWrap: 'break-word',
														whiteSpace: 'pre',
														fontWeight: 'bold',
													}}
													className='mb-0 pb-0 ps-2 text-light'>
													{user.name}
												</p>
												<span
													className='  mt-0 ps-2 text-muted'
													style={{
														fontSize: '0.8em',
													}}>
													{user.atTheRate}
												</span>
											</Link>
										</div>
										<div className=' col-5 '>
											{userInfo.following.find((id) => {
												return id === user._id
											}) ? (
												<button
													className='float-end mx-auto btn p-4 pt-1 pb-1 text-light  '
													onClick={() => dispatch(unfollowUser(user._id))}
													style={{
														borderRadius: '20px',
														border: '2px solid grey',
														fontWeight: 'bold',
													}}>
													Unfollow
												</button>
											) : (
												<button
													className='float-end mx-auto btn p-4 pt-1 pb-1   '
													onClick={() => dispatch(followUser(user._id))}
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
									</div>
								))}
							<button
								disabled={users && users.length === 0}
								className='btn btn-sm btn-primary mt-3 d-block mx-auto'
								onClick={loadMore}>
								load more
							</button>
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

export default ExploreScreen
