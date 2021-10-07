import React from 'react'
import { Link } from 'react-router-dom'
import { USER_LOGOUT } from '../Constants/userConstants.js'
import { useDispatch } from 'react-redux'

const Sidenav = ({ userInfo }) => {
	const dispatch = useDispatch()
	return (
		<div className='sidenav text-light'>
			<div className='row p-1 '>
				<Link to='/' className='text-light text-decoration-none'>
					<div className='col-12 d-flex  hotlinks'>
						<i className='fab fa-twitter p-2 h2  col-md-12 col-lg-3  text-center '></i>
						<h5 className='p-2 mt-1 col-lg-9 d-none d-lg-block  '>{null}</h5>
					</div>
				</Link>
				<Link to='/' className='text-light text-decoration-none'>
					<div className='col-12 d-flex mt-3  hotlinks'>
						<i className='fas fa-home p-2 h3  col-md-12 col-lg-3  text-center '></i>
						<h5 className='p-2 mt-1 col-lg-9 d-none d-lg-block  '>Home</h5>
					</div>
				</Link>

				<Link to='/explore' className='text-light text-decoration-none'>
					<div className='col-12 d-flex mt-3  hotlinks'>
						<i className='fas fa-hashtag p-2 h3 col-md-12 col-lg-3  text-center'></i>
						<h5 className='p-2 mt-1 col-lg-9 d-none d-lg-block'>Explore</h5>
					</div>
				</Link>

				<Link to='/notifications' className='text-light text-decoration-none'>
					<div className='col-12 d-flex mt-3  hotlinks'>
						<i className='fas fa-bell p-2 h3 col-md-12 col-lg-3  text-center'></i>
						<h5 className='p-2 mt-1 col-lg-9 d-none d-lg-block '>
							Notification
						</h5>
					</div>
				</Link>

				<Link to='/bookmarks' className='text-light text-decoration-none'>
					<div className='col-12 d-flex mt-3  hotlinks'>
						<i className='fas fa-bookmark  p-2 h3 col-md-12 col-lg-3  text-center'></i>
						<h5 className='p-2 mt-1  col-lg-9 d-none d-lg-block '>Bookmarks</h5>
					</div>
				</Link>
				<Link to='/profile' className='text-light text-decoration-none'>
					<div className='col-12 d-flex mt-3  hotlinks'>
						<i className='fas fa-user   p-2 h3 col-md-12 col-lg-3  text-center'></i>
						<h5 className='p-2 mt-1 col-lg-9 d-none d-lg-block'>Profile</h5>
					</div>
				</Link>
				<div className='col-12 d-flex  mt-4 tweet-lg'>
					<button
						className='p-2  w-75 border-rounded d-md-none d-lg-block  btn  text-center'
						data-bs-toggle='modal'
						data-bs-target='#exampleModal'>
						Tweet
					</button>
					<button
						className='p-2  w-50 border-rounded d-md-block d-lg-none mx-auto btn  text-center'
						data-bs-toggle='modal'
						style={{ borderRadius: '50%' }}
						data-bs-target='#exampleModal'>
						<i
							className='fas fa-pencil-alt'
							data-bs-toggle='modal'
							data-bs-target='#exampleModal'></i>
					</button>
				</div>

				<div
					className='col-12 d-flex mt-5 hotlinks'
					style={{ cursor: 'pointer' }}
					onClick={() => {
						localStorage.removeItem('userId')
						dispatch({
							type: USER_LOGOUT,
						})
					}}>
					<i className='fas fa-sign-out-alt  p-2 h3 col-md-12 col-lg-3  text-center'></i>
					<h5 className='p-2 mt-0 col-lg-9 d-none d-lg-block'>Logout</h5>
				</div>
			</div>
		</div>
	)
}

export default Sidenav
