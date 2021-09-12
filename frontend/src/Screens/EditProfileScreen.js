import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { updateUser } from '../Actions/userAction.js'
import AlertBox from '../Components/AlertBox'
import Sidenav from '../Components/Sidenav.js'
import { Link } from 'react-router-dom'

import News from '../Components/News.js'
const EditProfileScreen = ({ history }) => {
	const dispatch = useDispatch()
	const userLogin = useSelector((state) => state.userLogin)
	const { userId } = userLogin
	const userLoginInfo = useSelector((state) => state.userLoginInfo)
	const { userInfo } = userLoginInfo

	const [name, setName] = useState(userInfo.name)
	const [bio, setBio] = useState(userInfo.bio)
	const [website, setWebsite] = useState(userInfo.website)

	const userUpdate = useSelector((state) => state.userUpdate)
	const { error, updatedUser } = userUpdate

	const update = (e) => {
		e.preventDefault()
		dispatch(updateUser(name, bio, website))
	}

	useEffect(() => {
		if (updatedUser) {
			history.push('/profile')
		}
		if (!userId) {
			history.push('/login')
		}
	}, [history, userId, updatedUser])

	return (
		<div className='container '>
			<div className='row'>
				<div className='d-none d-md-block col-md-2 col-lg-3 p-md-2 navigation '>
					<Sidenav className='roboto' userInfo={userInfo} />
				</div>
				<div
					className='col-12 col-md-10 col-lg-6 p-0 tweets-section'
					style={{ height: '100vh' }}>
					{error && <AlertBox error={error} />}

					<div className='d-md-none d-flex ps-3  '>
						<div className='pt-1'>
							<Link to={'/profile'}>
								<i
									className='fas fa-arrow-left text-light'
									style={{ fontSize: '1.8em' }}></i>
							</Link>
						</div>
						<div className='ms-4 text-light mt-1'>
							<h3 style={{ fontWeight: 'bold' }}>Edit profile</h3>
						</div>
					</div>

					<form onSubmit={update}>
						<div className='cover pt-1 edit-cover  text-light'>
							<img
								className='w-100  '
								src={`./photos/${userInfo.coverPhoto}`}
								alt='profile'
								style={{ height: '100%' }}
							/>

							<div className='edit-option d-flex justify-content-around'>
								<i class='fas fa-camera h3'></i>
								<i class='fas fa-times h3'></i>
							</div>
						</div>

						<div
							className=' editprofile  p-3 pb-0 pt-2  '
							style={{ position: 'relative' }}>
							<img
								className='img-fluid rounded-circle '
								src={`./photos/${userInfo.profilePhoto}`}
								alt='profile'
								style={{ zIndex: '3' }}
							/>
						</div>

						<div className='p-md-2 p-1'>
							<div className='form-floating mt-2 mb-3 text-light'>
								<input
									type='text'
									required
									autoComplete='none'
									value={name}
									onChange={(e) => setName(e.target.value)}
									className='form-control'
									id='floatingInput1'
									placeholder='name'
								/>
								<label htmlFor='floatingInput1'>Name</label>
							</div>

							<div className='form-floating mb-3 text-light'>
								<textarea
									autoComplete='none'
									value={bio}
									onChange={(e) => setBio(e.target.value)}
									className='form-control text-light border'
									id='floatingInput1'
									placeholder='name'
									style={{ height: '100px', background: 'black' }}></textarea>
								<label htmlFor='floatingInput1'>Bio</label>
							</div>

							<div className='form-floating mt-4 mb-3 text-light'>
								<input
									type='url'
									autoComplete='none'
									value={website}
									onChange={(e) => setWebsite(e.target.value)}
									className='form-control'
									id='floatingInput1'
									placeholder='name'
								/>
								<label htmlFor='floatingInput1'>Website</label>
							</div>

							<button
								style={{
									width: '50%',
									backgroundColor: ' #1da1f2',
									borderRadius: '20px',
								}}
								type='submit'
								className=' border-0 mt-4 mx-auto d-block p-3 pt-2 pb-2 text-light  font-weight-bold  btn  text-center'>
								Save
							</button>
						</div>
					</form>
				</div>
				<div className='d-none d-lg-block col-lg-3  news'>
					<News className='news' />
				</div>
			</div>
		</div>
	)
}

export default EditProfileScreen
