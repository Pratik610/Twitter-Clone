import React from 'react'

const Loader = () => {
	return (
		<div className='spinner-border ' style={{ color: '#1DA1F2' }} role='status'>
			<span className='visually-hidden'>Loading...</span>
		</div>
	)
}

export default Loader
