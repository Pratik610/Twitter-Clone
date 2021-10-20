import React, { useEffect } from 'react'
import News from '../Components/News'
import MobileNav from '../Components/MobileNav'
import { getLoginUserInfo } from '../Actions/userAction'
import { useSelector, useDispatch } from 'react-redux'
const SearchScreen = () => {
	const userLogin = useSelector((state) => state.userLogin)
	const { userId } = userLogin
	const userLoginInfo = useSelector((state) => state.userLoginInfo)
	const { userInfo } = userLoginInfo

	const dispatch = useDispatch()

	useEffect(() => {
		if (!userInfo) {
			dispatch(getLoginUserInfo(userId._id))
		}
	}, [userId._id, dispatch, userInfo])
	return (
		<div className=' news '>
			{userInfo && (
				<>
					<MobileNav userInfo={userInfo} />
					<div className='p-2'>
						<News />
					</div>
				</>
			)}
		</div>
	)
}

export default SearchScreen
