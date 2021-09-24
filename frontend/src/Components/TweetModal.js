import React, { useState } from 'react'
import { TWEET_CREATE_RESET } from '../Constants/tweetConstants'
import { useDispatch } from 'react-redux'
import { tweetCreate } from '../Actions/tweetAction.js'
import axios from 'axios'
import Loader from './Loader'

const TweetModal = ({ userInfo }) => {
	const [text, setText] = useState('')
	const [image, setImage] = useState('')
	const [imageLoading, setImageLoading] = useState(false)

	const dispatch = useDispatch()

	const uploadFileHandler = async (e) => {
		setImageLoading(true)
		const file = e.target.files[0]
		const formData = new FormData()
		formData.append('image', file)
		try {
			const config = {
				headers: {
					'Content-Type': 'multipart/form-data',
				},
			}
			const { data } = await axios.post('/api/upload', formData, config)
			setImage(data)
			setImageLoading(false)
		} catch (error) {
			console.error(error)
		}
	}

	const tweet = (e) => {
		e.preventDefault()
		dispatch(tweetCreate({ user: userInfo._id, text, image }))
		setImage('')
		setText('')
		dispatch({
			type: TWEET_CREATE_RESET,
		})
	}
	return (
		<div
			className='modal  fade'
			id='exampleModal'
			style={{ backgroundColor: 'rgba(36,45,54,0.5)' }}
			tabIndex='-1'
			aria-labelledby='exampleModalLabel'
			aria-hidden='true'>
			<div className='modal-dialog '>
				<div className='modal-content ' style={{ backgroundColor: 'black' }}>
					<div className='modal-header'>
						<button
							type='button'
							className='btn-close  btn-close-white '
							data-bs-dismiss='modal'
							onClick={() => setText('')}
							aria-label='Close'></button>
					</div>
					<div className='modal-body'>
						<form onSubmit={tweet}>
							{' '}
							<div className='d-flex'>
								<div className='col-2'>
									{' '}
									<img
										className='dp d-block mx-auto '
										src={userInfo.profilePhoto}
										alt='profile'
									/>
								</div>
								<div className='col-10 ps-3 '>
									<textarea
										value={text}
										id='tweet-modal'
										onChange={(e) => setText(e.target.value)}
										className='w-100 mt-2 mobile-text-area'
										rows={1}
										placeholder='Whats happening?'
										onInput={(e) => {
											const textarea = document.querySelector('#tweet-modal')
											textarea.style.height = 'auto'
											textarea.style.height = textarea.scrollHeight + 'px'
										}}></textarea>
								</div>
							</div>
							<hr className='bg-light w-100' />
							<div className='d-flex justify-content-between'>
								<div className='form-group d-flex  w-50 p-2'>
									<label htmlFor='file1' className=' '>
										<i
											className='far h4  text-primary fa-file-image'
											style={{ cursor: 'pointer' }}></i>
									</label>
									<input
										type='file'
										className='form-control-file '
										hidden
										accept=' image/jpeg, image/png'
										name=''
										id='file1'
										onChange={uploadFileHandler}
										aria-describedby='fileHelpId'
									/>
								</div>

								<button
									type='submit'
									style={{ width: '40%' }}
									data-bs-dismiss='modal'
									className=' font-weight-bold border-0  border-rounded tweet-btn  text-center'>
									Tweet
								</button>
							</div>
						</form>
					</div>
					<div className='d-flex justify-content-center'>
						{imageLoading && <Loader className='mt-5' />}
					</div>

					{image && (
						<>
							<div className='img-output border  w-100 '>
								<i
									className='fas text-light fa-times h4 mb-0'
									style={{ cursor: 'pointer' }}
									onClick={() => setImage('')}></i>

								<img
									id='output'
									src={image}
									alt='img'
									className='img-fluid mx-auto d-block  rounded'
								/>
							</div>
						</>
					)}
				</div>
			</div>
		</div>
	)
}

export default TweetModal
