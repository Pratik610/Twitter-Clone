import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { updateUser } from '../Actions/userAction.js'
import AlertBox from '../Components/AlertBox'
const EditProfile = ({ userInfo }) => {
	const dispatch = useDispatch()

	const [name, setName] = useState(userInfo.name)
	const [bio, setBio] = useState(userInfo.bio)
	const [website, setWebsite] = useState(userInfo.website)

	const userUpdate = useSelector((state) => state.userUpdate)
	const { error } = userUpdate

	const update = (e) => {
		e.preventDefault()
		dispatch(updateUser(name, bio, website))
	}

	return (
		<div
			className='modal  fade'
			id='editModal'
			style={{ backgroundColor: 'rgba(36,45,54,0.5)' }}
			tabIndex='-1'
			aria-labelledby='exampleModalLabel'
			aria-hidden='true'>
			<div className='modal-dialog  '>
				<div className='modal-content ' style={{ backgroundColor: 'black' }}>
					<div className='modal-header'>
						<button
							type='button'
							className='btn-close  btn-close-white '
							data-bs-dismiss='modal'
							aria-label='Close'></button>
					</div>
					<div className='modal-body'>
						{error && <AlertBox error={error} />}

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

							<div className='p-1'>
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
										className='form-control border'
										id='floatingInput1'
										placeholder='name'
										style={{ height: '100px' }}></textarea>
									<label htmlFor='floatingInput1'>Bio</label>
								</div>

								<div className='form-floating mt-4 mb-3 text-light'>
									<input
										type='text'
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
				</div>
			</div>
		</div>
	)
}

export default EditProfile
