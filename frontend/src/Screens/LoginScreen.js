import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { loginUser } from '../Actions/userAction.js'
import FullScreenLoader from '../Components/FullScreenLoader.js'
import AlertBox from '../Components/AlertBox.js'

const LoginScreen = ({ history }) => {
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')

	const userLogin = useSelector((state) => state.userLogin)
	const { userId, loading, error } = userLogin
	const dispatch = useDispatch()

	useEffect(() => {
		if (userId) {
			history.push('/')
		}
	}, [history, userId])

	const login = (e) => {
		e.preventDefault()
		dispatch(loginUser(email, password))
	}

	return (
		<>
			{loading && <FullScreenLoader />}
			<div className=''>
				<div className='container  '>
					<div className='row'>
						<div
							className='  p-md-5 pt-md-3 col-12 offset-lg-4 text-light  mt-md-4 col-lg-4 '
							style={{ backgroundColor: '#000000', borderRadius: '15px' }}>
							<h1 className='text-center  mt-0'>
								<i className='fab fa-twitter'></i>
							</h1>
							<h2 className='roboto mt-3'>Log in to Twitter</h2>
							{error && <AlertBox error={error} />}
							<form onSubmit={login}>
								{' '}
								<div className='form-floating mb-3 mt-4 text-light'>
									<input
										type='email'
										value={email}
										onChange={(e) => setEmail(e.target.value)}
										class='form-control text-light'
										id='floatingInput1'
										placeholder='name'
									/>
									<label htmlFor='floatingInput1'>Email</label>
								</div>
								<div className='form-floating mb-3'>
									<input
										type='password'
										value={password}
										onChange={(e) => setPassword(e.target.value)}
										className='form-control text-light  '
										id='floatingInput2'
										placeholder='email'
									/>
									<label htmlFor='floatingInput2'>Password</label>
								</div>
								<div className=' mt-md-3 mt-5  '>
									<button
										type='submit'
										className='tweet-btn d-block w-md-75 signup-btn  mx-auto mt-4 pt-2 pb-2'>
										<h6 style={{ fontSize: '1.1em' }}>Next</h6>
									</button>
								</div>
							</form>

							<p className='text-center mt-3'>
								{' '}
								<Link to={'/signup'} className='text-decoration-none'>
									Sign up for Twitter
								</Link>{' '}
							</p>
						</div>
					</div>
				</div>
			</div>
		</>
	)
}

export default LoginScreen
