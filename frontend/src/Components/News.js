import React from 'react'
import Searchbox from '../Components/SearchBox.js'

const News = () => {
	return (
		<>
			<Searchbox />
			<section className=' text-light mt-3  '>
				<div className='p-3 pb-0 roboto'>
					<h5>Whats happning</h5>
				</div>
				<hr className='bg-light mb-0' />
				<div className='d-flex'>
					<div className='col-9 p-2 '>
						<small className='text-muted'>Science</small>
						<h6>Happy Birthday , Pratik Supekar </h6>
					</div>
					<div className='col-3 p-2'>
						<img
							className='img-fluid rounded'
							alt='img'
							src='https://pbs.twimg.com/profile_images/1374722210141777922/aFv5H2qS_400x400.jpg'
						/>
					</div>
				</div>
				<hr className='bg-light mt-0 mb-0' />
			</section>
		</>
	)
}

export default News
