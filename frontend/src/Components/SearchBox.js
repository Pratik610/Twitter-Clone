import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { searchUser } from '../Actions/userAction.js'
import Loader from '../Components/Loader.js'
import { SEARCH_USER_RESET } from '../Constants/userConstants.js'
const SearchBox = () => {
	const [query, setQuery] = useState('')
	const dispatch = useDispatch()

	const userSearch = useSelector((state) => state.userSearch)
	const { loading, searchResult } = userSearch
	useEffect(() => {
		if (query) {
			dispatch(searchUser(query))
		} else {
			dispatch({
				type: SEARCH_USER_RESET,
			})
		}
	}, [dispatch, query])

	return (
		<div className='searchbox '>
			<input
				type='text'
				value={query}
				onChange={(e) => {
					setQuery(e.target.value)
				}}
				className='search p-2 mt-3'
				placeholder='Search Twitter'
			/>
			{loading && (
				<div className='d-flex mt-4 justify-content-center'>
					<Loader style={{ marginLeft: '-10%' }} />
				</div>
			)}

			{searchResult && (
				<div className='results '>
					{searchResult.map((user) => (
						<Link to={`/${user._id}`}>
							<div className='d-flex tweets pb-3 pt-2'>
								<div className='p-2 col-2'>
									<img
										className='dp d-block mx-auto '
										src={`./photos/${user.profilePhoto}`}
										alt='profile'
									/>
								</div>
								<div className='col-10 pt-2 text-light ps-3'>
									<h6 className='mb-0 roboto '>{user.name}</h6>
									<span className='text-muted p-1' style={{ fontSize: '12px' }}>
										{user.atTheRate}
									</span>
								</div>
							</div>
						</Link>
					))}
				</div>
			)}
		</div>
	)
}

export default SearchBox
