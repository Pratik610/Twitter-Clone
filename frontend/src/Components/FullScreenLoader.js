import React from 'react'

const FullScreenLoader = () => {
	return (
		<div className='fullscreen'>
			<div className='posi'>
				<div
					className='spinner-border '
					style={{ color: '#1DA1F2' }}
					role='status'>
					<span className='visually-hidden'>Loading...</span>
				</div>
			</div>
		</div>
	)
}

export default FullScreenLoader
