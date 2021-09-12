import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import FullScreenLoader from '../Components/FullScreenLoader.js'
import AlertBox from '../Components/AlertBox.js'
import { registerUser } from '../Actions/userAction.js'

const SignupScreen = ({ history }) => {
	const [name, setName] = useState('')
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [day, setDay] = useState('')
	const [month, setMonth] = useState('')
	const [year, setYear] = useState('')

	const dispatch = useDispatch()

	const userRegister = useSelector((state) => state.userRegister)
	const { register, loading, error } = userRegister

	useEffect(() => {
		if (register) {
			history.push('/login')
		}
	}, [history, register])

	// submit handler
	const create = (e) => {
		e.preventDefault()
		const DOB = day + ' ' + month + ' ' + year

		dispatch(registerUser(name, email, password, DOB))
	}

	// date format code
	const months = [
		'January',
		'February',
		'March',
		'April',
		'May',
		'June',
		'July',
		'August',
		'September',
		'October',
		'November',
		'December',
	]
	var currentYear = new Date().getFullYear(),
		years = []
	let startYear = 1970
	while (startYear <= currentYear) {
		years.push(startYear++)
	}

	return (
		<div className='parent'>
			{loading && <FullScreenLoader />}

			<div className='container  '>
				<div className='row'>
					<div
						className='  p-md-5 pt-md-3 col-12 offset-md-3 text-light  mt-md-4 col-md-6 '
						style={{ backgroundColor: '#000000', borderRadius: '15px' }}>
						<h1 className='text-center  mt-0'>
							<i className='fab fa-twitter'></i>
						</h1>
						{error && <AlertBox error={error} />}

						<h4 className='roboto mt-3'>Create your account</h4>
						<form onSubmit={create}>
							<div className='form-floating mb-3 text-light'>
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
							<div className='form-floating mb-3'>
								<input
									type='email'
									required
									autoComplete='none'
									value={email}
									onChange={(e) => setEmail(e.target.value)}
									className='form-control  '
									id='floatingInput2'
									placeholder='email'
								/>
								<input type='text' hidden autoComplete='on' />
								<label htmlFor='floatingInput2'>Email</label>
							</div>
							<div className='form-floating mb-3'>
								<input
									type='password'
									required
									autoComplete='current-password'
									value={password}
									onChange={(e) => setPassword(e.target.value)}
									className='form-control  '
									id='floatingInput3'
									placeholder='email'
								/>
								<label htmlFor='floatingInput3'>Password</label>
							</div>

							<h6 className='mb-0'>Date of birth</h6>
							<small className='text-muted mt-0'>
								{' '}
								This will not be shown publicly. Confirm your own age, even if
								this account is for a business, a pet, or something else.
							</small>

							<div className='d-flex text-light mt-3'>
								<div className='col-6'>
									<div className='form-floating'>
										<select
											required
											value={month}
											onChange={(e) => setMonth(e.target.value)}
											className='form-select'
											id='floatingSelect1'
											aria-label='Floating label select example'>
											<option selected disabled></option>
											{months.map((m, i) => (
												<option key={i} value={m}>
													{m}
												</option>
											))}
										</select>
										<label htmlFor='floatingSelect1'>Month</label>
									</div>
								</div>
								<div className='col-3'>
									<div className='form-floating'>
										<select
											className='form-select'
											required
											value={day}
											onChange={(e) => setDay(e.target.value)}
											id='floatingSelect2'
											aria-label='Floating label select example'>
											<option selected disabled></option>
											{[...Array(31)].map((x, i) => (
												<option key={i} value={i + 1}>
													{i + 1}
												</option>
											))}
										</select>
										<label htmlFor='floatingSelect2'>Day</label>
									</div>
								</div>
								<div className='col-3'>
									<div className='form-floating'>
										<select
											className='form-select'
											required
											id='floatingSelect3'
											value={year}
											onChange={(e) => setYear(e.target.value)}
											aria-label='Floating label select example'>
											<option selected disabled></option>
											{years.map((x, i) => (
												<option key={i} value={x}>
													{x}
												</option>
											))}
										</select>
										<label htmlFor='floatingSelect3'>Year</label>
									</div>
								</div>
							</div>

							<div className=' mt-md-3 mt-5  '>
								<button
									type='submit'
									className='tweet-btn d-block w-md-75 signup-btn  mx-auto mt-4 pt-2 pb-2'>
									<h6 style={{ fontSize: '1.1em' }}>Next</h6>
								</button>
							</div>
						</form>
					</div>
				</div>
			</div>
		</div>
	)
}

export default SignupScreen
