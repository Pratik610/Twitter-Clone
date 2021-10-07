import React from 'react'
import { Link } from 'react-router-dom'
import { USER_LOGOUT } from '../Constants/userConstants.js'

import { useDispatch } from 'react-redux'
const MobileNav = ({ userInfo, hide }) => {
	const dispatch = useDispatch()

	const close = (e) => {
		const nav = document.getElementById('nav')
		nav.classList.remove('animate__slideInLeft')
		nav.classList.add('animate__slideOutLeft')
	}
	const open = (e) => {
		const nav = document.getElementById('nav')
		nav.classList.remove('animate__slideOutLeft', 'd-none')
		nav.classList.add('animate__slideInLeft')
	}

	return (
		<>
			<div
				id='nav'
				className={
					'mobile-side-nav  text-light animate__animated animate__faster d-none'
				}>
				<div
					className='p-2 d-flex justify-content-between'
					style={{ borderBottom: '1px solid grey' }}>
					<h5 className='font-weight-bold mt-1'>Account info</h5>
					<h2 className='me-2' id='close' onClick={close}>
						&#10005;
					</h2>
				</div>

				<div className='p-3 '>
					<Link className='text-decoration-none text-light' to={'/profile'}>
						<img
							className='dp-lg'
							style={{ borderRadius: '50%' }}
							src={userInfo.profilePhoto}
							alt='profile'
						/>
						<h6 className='mt-2 mb-3 pb-0'>
							<span style={{ fontWeight: 'bold' }}> {userInfo.name}</span>

							<span
								className='text-muted d-block pt-0'
								style={{ fontSize: '13px' }}>
								{userInfo.atTheRate}
							</span>
						</h6>
					</Link>

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
				<div style={{ fontSize: '1em', fontWeight: '900' }}>
					<Link to='/profile' className='text-light  text-decoration-none'>
						<div className='p-3 pt-1 d-flex mb-1'>
							<div className='col-2 text-center'>
								{' '}
								<i className='fas fa-user ' style={{ fontSize: '1.2em' }}></i>
							</div>
							<div className='w-100 col-10 ps-2  '>Profile</div>
						</div>
					</Link>
					<Link to='/bookmarks' className='text-light text-decoration-none'>
						<div className='p-3 pt-1 d-flex mb-1'>
							<div className='col-2 text-center'>
								{' '}
								<i
									className='fas fa-bookmark '
									style={{ fontSize: '1.2em' }}></i>
							</div>
							<div className='w-100 col-10 ps-2 '>Bookmarks</div>
						</div>
					</Link>
					<div className='p-3 pt-1 d-flex'>
						<div className='col-2 text-center'>
							{' '}
							<i
								className='fas fa-newspaper '
								style={{ fontSize: '1.2em' }}></i>
						</div>
						<div className='w-100 col-10 ps-2  '>News</div>
					</div>
					<div
						className='p-3 pt-1 d-flex mt-5'
						style={{ cursor: 'pointer' }}
						onClick={() => {
							localStorage.removeItem('userId')
							dispatch({
								type: USER_LOGOUT,
							})
						}}>
						<div className='col-2 text-center'>
							<i
								className='fas   fa-sign-out-alt '
								style={{ fontSize: '1.2em' }}></i>
						</div>
						<div className='w-100 col-10 ps-2  '>Logout</div>
					</div>
				</div>
			</div>

			{/* ............................. */}

			{userInfo && (
				<div className='d-flex justify-content-between tweets  p-3 pt-2 pb-2 '>
					<div className=''>
						<img
							style={{ borderRadius: '50%' }}
							className='dp-sm  img-fluid'
							src={userInfo.profilePhoto}
							alt='profile'
							onClick={open}
						/>
					</div>
					<div className=' '>
						<Link className='text-decoration-none ' to={'/'}>
							<i
								className='fab   fa-twitter '
								style={{ fontSize: '25px', color: '#1A91DA' }}></i>
						</Link>
					</div>
					<div className=' '>
						<i
							className='fas text-light fa-download'
							style={{ fontSize: '20px' }}></i>
					</div>
				</div>
			)}

			{!hide && (
				<div className='mobile-tweet-btn'>
					<i
						className='fas fa-pencil-alt'
						data-bs-toggle='modal'
						data-bs-target='#exampleModal'
						style={{ zIndex: '3' }}></i>
				</div>
			)}

			{!hide && (
				<div
					id='bottom-nav'
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
			)}
		</>
	)
}

export default MobileNav
