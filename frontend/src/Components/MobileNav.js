import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { USER_LOGOUT } from '../Constants/userConstants.js'
import { useDispatch, useSelector } from 'react-redux'
const MobileNav = () => {
	const [nav, setNav] = useState(false)

	const userLoginInfo = useSelector((state) => state.userLoginInfo)
	const { userInfo } = userLoginInfo

	const dispatch = useDispatch()
	return (
		<>
			{userInfo && (
				<div
					className={
						nav
							? 'mobile-side-nav text-light'
							: 'mobile-side-nav d-none text-light'
					}>
					<div
						className='p-2 d-flex justify-content-between'
						style={{ borderBottom: '1px solid grey' }}>
						<h5 className='font-weight-bold'>Account info</h5>
						<button
							type='button'
							className='btn-close  btn-close-white '
							aria-label='Close'
							onClick={() => setNav(false)}></button>
					</div>

					<div className='p-3'>
						<img
							width='50'
							style={{ borderRadius: '50%' }}
							className='border'
							src={`./photos/${userInfo.profilePhoto}`}
							alt='profile'
						/>
						<h6 className='mt-2 mb-0 pb-0'>
							<span style={{ fontWeight: 'bold' }}> {userInfo.name}</span>

							<span
								className='text-muted d-block pt-0'
								style={{ fontSize: '13px' }}>
								{userInfo.atTheRate}
							</span>
						</h6>

						<br />
						<span>
							{userInfo.following.length}{' '}
							<span className='text-muted'> Following </span>
						</span>
						<span className='p-3'>
							{userInfo.followers.length}
							<span className='text-muted'> Followers</span>{' '}
						</span>
					</div>
					{/* links */}
					<div style={{ fontSize: '1em' }}>
						<Link to='/profile' className='text-light text-decoration-none'>
							<div className='p-3 pt-1 d-flex'>
								<div>
									{' '}
									<i className='fas fa-user h6'></i>
								</div>
								<div className='w-100 p-2  pt-0'>Profile</div>
							</div>
						</Link>
						<div className='p-3 pt-1 d-flex'>
							<div>
								{' '}
								<i className='fas fa-bookmark h6'></i>
							</div>
							<div className='w-100 p-2  pt-0'>Bookmarks</div>
						</div>
						<div className='p-3 pt-1 d-flex'>
							<div>
								{' '}
								<i className='fas fa-newspaper h6'></i>
							</div>
							<div className='w-100 p-2 pt-0'>News</div>
						</div>
						<div
							className='p-3 pt-1 d-flex mt-5'
							onClick={() => {
								localStorage.removeItem('userId')
								dispatch({
									type: USER_LOGOUT,
								})
							}}>
							<div>
								{' '}
								<i className='fas fa-sign-out-alt h6'></i>
							</div>
							<div className='w-100 p-2  pt-0'>Logout</div>
						</div>
					</div>
				</div>
			)}

			{/* ............................. */}

			{userInfo && (
				<div
					className='d-flex justify-content-between p-3 pt-2 pb-2 '
					style={{ borderBottom: '1px solid grey' }}>
					<div className=''>
						<img
							width='25'
							style={{ borderRadius: '50%' }}
							className='border'
							src={`./photos/${userInfo.profilePhoto}`}
							alt='profile'
							onClick={() => setNav(true)}
						/>
					</div>
					<div className=' '>
						<i
							className='fab   fa-twitter '
							style={{ fontSize: '25px', color: '#1A91DA' }}></i>
					</div>
					<div className=' '>
						<i
							className='fas text-light fa-download'
							style={{ fontSize: '20px' }}></i>
					</div>
				</div>
			)}

			<div className='mobile-tweet-btn'>
				<i
					className='fas fa-pencil-alt'
					data-bs-toggle='modal'
					data-bs-target='#exampleModal'
					style={{ zIndex: '3' }}></i>
			</div>

			<div
				className='d-flex bottom-nav  fixed-bottom justify-content-between text-light p-3 pt-1 pb-1 '
				style={{ borderBottom: '1px solid grey' }}>
				<div className=''>
					<Link to='/' className='text-light text-decoration-none'>
						<i className='fas fa-home p-2 h3    text-center '></i>
					</Link>
				</div>
				<div className=''>
					<Link to='/search' className='text-light text-decoration-none'>
						{' '}
						<i className='fas fa-search p-2 h3    text-center'></i>
					</Link>
				</div>
				<div className=''>
					<i className='fas fa-envelope p-2 h3    text-center '></i>
				</div>
			</div>
		</>
	)
}

export default MobileNav
