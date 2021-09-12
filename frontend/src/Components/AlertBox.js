import React from 'react'

const AlertBox = ({ error }) => {
	return (
		<div className='alert alert-primary text-dark' role='alert'>
			<strong>{error}</strong>
		</div>
	)
}

export default AlertBox
